
CREATE POLICY "Anyone can read resumes"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Admins can upload resumes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resumes"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resumes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin'));
