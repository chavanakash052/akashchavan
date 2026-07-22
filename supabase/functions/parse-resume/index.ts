import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { extractText, getDocumentProxy } from 'npm:unpdf@0.12.1';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;

const EXTRACTION_PROMPT = `Extract the following structured JSON from this resume text. Return ONLY valid JSON with this exact shape (fill from resume, use empty arrays/strings if missing):

{
  "name": string,
  "title": string,           // job title / professional headline
  "location": string,
  "email": string,
  "phone": string,
  "objective": string,       // short summary / career objective
  "education": [{ "degree": string, "institution": string, "score": string }],
  "technicalSkills": string[],
  "software": [{ "name": string, "level": number }],  // level 0-100 (estimate if unknown)
  "experience": [{ "title": string, "company": string, "period": string, "tasks": string[] }],
  "projects": [{ "title": string, "desc": string }],
  "equipment": string[],
  "languages": string[]
}

Do NOT wrap in markdown code fences. Output raw JSON only.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Verify user is authenticated admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: 'Unauthorized' }, 401);

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleData } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    if (!roleData) return json({ error: 'Admin access required' }, 403);

    const { path } = await req.json();
    if (!path) return json({ error: 'Missing resume file path' }, 400);

    // Download file from storage
    const { data: fileData, error: dlErr } = await admin.storage.from('resumes').download(path);
    if (dlErr || !fileData) return json({ error: 'Failed to download resume: ' + dlErr?.message }, 500);

    // Extract text from PDF
    const buffer = new Uint8Array(await fileData.arrayBuffer());
    const pdf = await getDocumentProxy(buffer);
    const { text } = await extractText(pdf, { mergePages: true });
    const resumeText = Array.isArray(text) ? text.join('\n') : text;

    if (!resumeText || resumeText.trim().length < 50) {
      return json({ error: 'Could not extract text from PDF (scanned/image PDFs not supported).' }, 400);
    }

    // Call Lovable AI Gateway to extract structured content
    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-3.6-flash',
        messages: [
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: resumeText.slice(0, 30000) },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiRes.ok) {
      const errBody = await aiRes.text();
      console.error('AI gateway error', aiRes.status, errBody);
      if (aiRes.status === 429) return json({ error: 'Rate limit exceeded. Try again shortly.' }, 429);
      if (aiRes.status === 402) return json({ error: 'AI credits exhausted. Please add credits.' }, 402);
      return json({ error: `AI request failed: ${errBody}` }, aiRes.status);
    }

    const aiJson = await aiRes.json();
    const content = aiJson.choices?.[0]?.message?.content ?? '';
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      // Try stripping markdown fences
      const cleaned = content.replace(/```json\s*|\s*```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    // Save resume URL (public path within bucket)
    const { data: signed } = await admin.storage.from('resumes').createSignedUrl(path, 60 * 60 * 24 * 365);

    // Upsert portfolio_content
    const { error: upErr } = await admin
      .from('portfolio_content')
      .upsert({ id: 1, data: parsed, resume_url: signed?.signedUrl ?? null, updated_at: new Date().toISOString() });
    if (upErr) return json({ error: 'Failed to save content: ' + upErr.message }, 500);

    return json({ success: true, data: parsed });
  } catch (e) {
    console.error('parse-resume error', e);
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
