-- Create table for e-book purchases
CREATE TABLE public.ebook_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ebook_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view all ebook purchases" 
ON public.ebook_purchases 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Allow public inserts for ebook purchases" 
ON public.ebook_purchases 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ebook_purchases_updated_at
BEFORE UPDATE ON public.ebook_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();