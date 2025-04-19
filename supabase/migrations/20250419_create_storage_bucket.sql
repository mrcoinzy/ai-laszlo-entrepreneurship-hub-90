
-- Create a storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policy to allow public read access to the images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- Set up RLS policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'images' AND
    auth.role() = 'authenticated'
  );

-- Set up RLS policy to allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update own images" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'images' AND
    auth.uid() = owner
  );

-- Set up RLS policy to allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete own images" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'images' AND
    auth.uid() = owner
  );
