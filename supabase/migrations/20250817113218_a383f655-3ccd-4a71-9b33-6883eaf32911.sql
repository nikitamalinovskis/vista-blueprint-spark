-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create homepage content table
CREATE TABLE public.homepage_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT 'Transform Your Business with Cutting-Edge Digital Solutions',
  hero_subtitle TEXT NOT NULL DEFAULT 'Empowering businesses through innovative web development, mobile applications, and cloud infrastructure solutions.',
  hero_description TEXT NOT NULL DEFAULT 'We deliver exceptional digital experiences that drive growth and success for companies of all sizes.',
  hero_cta_primary TEXT NOT NULL DEFAULT 'Get Started Today',
  hero_cta_secondary TEXT NOT NULL DEFAULT 'Watch Demo',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Insert default homepage content
INSERT INTO public.homepage_content (id) VALUES (gen_random_uuid());

-- Enable RLS
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;

-- Create policies for homepage content
CREATE POLICY "Anyone can view homepage content" 
ON public.homepage_content 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update homepage content" 
ON public.homepage_content 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create features table
CREATE TABLE public.features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  page_type TEXT NOT NULL DEFAULT 'homepage' CHECK (page_type IN ('homepage', 'web-development', 'mobile-first', 'cloud', 'data-analytics')),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default features
INSERT INTO public.features (title, description, icon, page_type, sort_order) VALUES
('Lightning Fast Performance', 'Optimized for speed and efficiency with modern web technologies and best practices.', 'Zap', 'homepage', 1),
('Scalable Architecture', 'Built to grow with your business using cloud-native solutions and microservices.', 'TrendingUp', 'homepage', 2),
('24/7 Expert Support', 'Round-the-clock technical support from our team of experienced developers.', 'Shield', 'homepage', 3),
('Secure & Reliable', 'Enterprise-grade security with 99.9% uptime guarantee and data protection.', 'Lock', 'homepage', 4);

-- Enable RLS
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;

-- Create policies for features
CREATE POLICY "Anyone can view active features" 
ON public.features 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage features" 
ON public.features 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  author_company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  author_avatar TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default testimonials
INSERT INTO public.testimonials (author_name, author_role, author_company, content, rating, is_featured, sort_order) VALUES
('Sarah Johnson', 'CTO', 'TechCorp Inc.', 'The team delivered an exceptional web application that exceeded our expectations. Their attention to detail and technical expertise is unmatched.', 5, true, 1),
('Michael Chen', 'Founder', 'StartupXYZ', 'Working with this team was a game-changer for our business. They transformed our vision into a beautiful, functional reality.', 5, true, 2),
('Emma Rodriguez', 'VP Engineering', 'Digital Solutions Co.', 'Professional, reliable, and incredibly skilled. They delivered our project on time and within budget while maintaining the highest quality standards.', 5, true, 3);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage testimonials" 
ON public.testimonials 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for blog posts
CREATE POLICY "Anyone can view published blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Only admins can manage blog posts" 
ON public.blog_posts 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create pages table for SEO and content management
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image TEXT,
  content JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default pages
INSERT INTO public.pages (slug, title, seo_title, seo_description) VALUES
('home', 'Homepage', 'Digital Solutions | Transform Your Business', 'Transform your business with cutting-edge digital solutions. Web development, mobile apps, cloud infrastructure.'),
('services', 'Our Services', 'Our Services | Professional Digital Solutions', 'Comprehensive digital services including web development, mobile applications, and cloud infrastructure.'),
('web-development', 'Web Development', 'Web Development Services | Custom Solutions', 'Professional web development services with modern technologies and best practices.'),
('mobile-first', 'Mobile-First Development', 'Mobile-First Development | Responsive Solutions', 'Mobile-first development approach for optimal user experience across all devices.'),
('cloud', 'Cloud Infrastructure', 'Cloud Infrastructure Services | Scalable Solutions', 'Scalable cloud infrastructure solutions for modern businesses.'),
('data-analytics', 'Data Analytics', 'Data Analytics Services | Business Intelligence', 'Advanced data analytics and business intelligence solutions.'),
('pricing', 'Pricing', 'Pricing Plans | Affordable Digital Solutions', 'Transparent pricing for our digital services and solutions.'),
('blog', 'Blog', 'Tech Blog | Latest Industry Insights', 'Stay updated with the latest trends and insights in digital technology.'),
('about', 'About Us', 'About Us | Our Story and Mission', 'Learn about our mission, vision, and the team behind our success.'),
('contact', 'Contact', 'Contact Us | Get In Touch', 'Get in touch with our team for your next digital project.');

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Create policies for pages
CREATE POLICY "Anyone can view active pages" 
ON public.pages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage pages" 
ON public.pages 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true);

-- Create storage policies
CREATE POLICY "Admin can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'admin-uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Anyone can view uploaded files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'admin-uploads');

CREATE POLICY "Admin can update files" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'admin-uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admin can delete files" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'admin-uploads' AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_homepage_content_updated_at
  BEFORE UPDATE ON public.homepage_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON public.features
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();