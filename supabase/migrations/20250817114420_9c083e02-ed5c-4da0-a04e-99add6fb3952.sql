-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create policy for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user role"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update existing policies to use the new role system
DROP POLICY IF EXISTS "Only admins can update homepage content" ON public.homepage_content;
DROP POLICY IF EXISTS "Only admins can manage features" ON public.features;
DROP POLICY IF EXISTS "Only admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Only admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Only admins can manage pages" ON public.pages;
DROP POLICY IF EXISTS "Admin can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update files" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete files" ON storage.objects;

-- Recreate policies using the new role system
CREATE POLICY "Only admins can update homepage content" 
ON public.homepage_content 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage features" 
ON public.features 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage pages" 
ON public.pages 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update storage policies
CREATE POLICY "Admin can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'admin-uploads' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can update files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'admin-uploads' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can delete files" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'admin-uploads' AND 
  public.has_role(auth.uid(), 'admin')
);

-- Update the user registration function to assign default user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove role column from profiles table (keeping the table for other profile data)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;