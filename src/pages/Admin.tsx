import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Upload, LogOut, FileText, CheckCircle, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePortfolio } from "@/hooks/usePortfolio";

const Admin = () => {
  const navigate = useNavigate();
  const { data, resumeUrl, refresh } = usePortfolio();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/auth");
        return;
      }
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!role);
      setChecking(false);
    })();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleUpload = async () => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }

    setUploading(true);
    try {
      const path = `resume-${Date.now()}.pdf`;
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, file, {
        contentType: "application/pdf",
        upsert: false,
      });
      if (upErr) throw upErr;

      toast.info("Parsing resume with AI...");
      const { data: fnData, error: fnErr } = await supabase.functions.invoke("parse-resume", {
        body: { path },
      });
      if (fnErr) throw fnErr;
      if ((fnData as { error?: string })?.error) throw new Error((fnData as { error: string }).error);

      toast.success("Portfolio updated from resume!");
      await refresh();
      setFile(null);
    } catch (err) {
      toast.error("Upload failed: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Your account does not have admin privileges.</p>
          <button onClick={signOut} className="rounded-lg bg-primary px-6 py-2.5 text-sm text-primary-foreground">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grid-topo">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-primary">
            <MapPin className="h-5 w-5" /> Portfolio Admin
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-2 text-gradient">Update Resume</h1>
        <p className="text-muted-foreground mb-8">
          Upload a new PDF resume. AI will read it and update all portfolio sections automatically.
        </p>

        <div className="rounded-xl bg-card p-8 shadow-card mb-8">
          <label className="block">
            <div className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium text-card-foreground mb-1">
                {file ? file.name : "Click to select a resume PDF"}
              </p>
              <p className="text-sm text-muted-foreground">PDF up to 10MB</p>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-hero-gradient px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Processing..." : "Upload & Update Portfolio"}
          </button>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-card">
          <h2 className="font-display font-semibold mb-4 text-card-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Current Portfolio
          </h2>
          <div className="space-y-2 text-sm">
            <Row label="Name" value={data.name} />
            <Row label="Title" value={data.title} />
            <Row label="Email" value={data.email} />
            <Row label="Experience entries" value={String(data.experience.length)} />
            <Row label="Projects" value={String(data.projects.length)} />
            <Row label="Skills" value={String(data.technicalSkills.length)} />
            {resumeUrl && (
              <div className="pt-3 flex items-center gap-2 text-secondary">
                <CheckCircle className="h-4 w-4" />
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Current resume (download)
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-border py-1.5">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-card-foreground font-medium">{value}</span>
  </div>
);

export default Admin;
