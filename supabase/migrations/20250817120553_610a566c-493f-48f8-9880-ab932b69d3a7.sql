-- Create services table for managing service pages
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pricing_tiers table
CREATE TABLE public.pricing_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2) NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table for about page
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_settings table
CREATE TABLE public.contact_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT,
  phone TEXT,
  email TEXT,
  map_embed TEXT,
  business_hours JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_title TEXT DEFAULT 'DigitalCorp',
  site_description TEXT DEFAULT 'Premium digital solutions for modern businesses',
  favicon_url TEXT,
  logo_url TEXT,
  meta_keywords TEXT,
  google_analytics_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for services
CREATE POLICY "Anyone can view active services" 
ON public.services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage services" 
ON public.services 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for pricing_tiers
CREATE POLICY "Anyone can view active pricing tiers" 
ON public.pricing_tiers 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage pricing tiers" 
ON public.pricing_tiers 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for team_members
CREATE POLICY "Anyone can view active team members" 
ON public.team_members 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Only admins can manage team members" 
ON public.team_members 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for contact_settings
CREATE POLICY "Anyone can view contact settings" 
ON public.contact_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update contact settings" 
ON public.contact_settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for site_settings
CREATE POLICY "Anyone can view site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can update site settings" 
ON public.site_settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_tiers_updated_at
BEFORE UPDATE ON public.pricing_tiers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_settings_updated_at
BEFORE UPDATE ON public.contact_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.contact_settings (address, phone, email) VALUES 
('123 Business St, Tech City, TC 12345', '+1 (555) 123-4567', 'contact@digitalcorp.com');

INSERT INTO public.site_settings (site_title, site_description) VALUES 
('DigitalCorp', 'Transform Your Business with Cutting-Edge Digital Solutions');

-- Insert default services
INSERT INTO public.services (title, slug, description, icon, features) VALUES 
('Web Development', 'web-development', 'Custom web applications built with modern technologies', 'Globe', '["React & Next.js", "Node.js Backend", "Database Design", "API Development"]'),
('Mobile-First Design', 'mobile-first', 'Responsive designs that work perfectly on all devices', 'Smartphone', '["Responsive Design", "Progressive Web Apps", "Mobile Optimization", "Touch Interfaces"]'),
('Cloud Infrastructure', 'cloud-infrastructure', 'Scalable cloud solutions for your business', 'Cloud', '["AWS & Azure", "Docker Containers", "CI/CD Pipelines", "Auto Scaling"]'),
('Data Analytics', 'data-analytics', 'Turn your data into actionable business insights', 'BarChart3', '["Real-time Analytics", "Custom Dashboards", "Data Visualization", "Business Intelligence"]');

-- Insert default pricing tiers
INSERT INTO public.pricing_tiers (name, price_monthly, price_annual, description, features, is_featured) VALUES 
('Starter', 99.00, 990.00, 'Perfect for small businesses and startups', '["5 Projects", "10GB Storage", "Email Support", "Basic Analytics"]', false),
('Professional', 199.00, 1990.00, 'Ideal for growing businesses', '["15 Projects", "50GB Storage", "Priority Support", "Advanced Analytics", "Custom Integrations"]', true),
('Enterprise', 399.00, 3990.00, 'For large organizations', '["Unlimited Projects", "500GB Storage", "24/7 Phone Support", "Advanced Analytics", "Custom Integrations", "Dedicated Account Manager"]', false);

-- Insert default team members
INSERT INTO public.team_members (name, role, bio) VALUES 
('John Smith', 'CEO & Founder', 'Visionary leader with 15+ years in digital transformation'),
('Sarah Johnson', 'CTO', 'Technical expert specializing in scalable architecture'),
('Mike Chen', 'Lead Developer', 'Full-stack developer passionate about clean code'),
('Emma Davis', 'UX Designer', 'Creative designer focused on user-centered design');