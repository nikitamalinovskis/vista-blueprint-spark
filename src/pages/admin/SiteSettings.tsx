import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Globe, Image, Search, BarChart3 } from 'lucide-react';

interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  favicon_url?: string;
  logo_url?: string;
  meta_keywords?: string;
  google_analytics_id?: string;
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    id: '',
    site_title: 'DigitalCorp',
    site_description: 'Premium digital solutions for modern businesses',
    favicon_url: '',
    logo_url: '',
    meta_keywords: '',
    google_analytics_id: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch site settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert(settings);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Site settings saved successfully',
      });

      await fetchSiteSettings();
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save site settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading site settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">
          Configure your website's global settings and branding
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
            <CardDescription>
              Basic information about your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_title">Site Title</Label>
              <Input
                id="site_title"
                value={settings.site_title}
                onChange={(e) => setSettings({
                  ...settings,
                  site_title: e.target.value
                })}
                placeholder="Your Company Name"
              />
              <p className="text-xs text-muted-foreground mt-1">
                This appears in browser tabs and search results
              </p>
            </div>
            <div>
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                value={settings.site_description}
                onChange={(e) => setSettings({
                  ...settings,
                  site_description: e.target.value
                })}
                placeholder="Brief description of your website"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used in meta descriptions and search results
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="h-5 w-5" />
              <span>Branding & Assets</span>
            </CardTitle>
            <CardDescription>
              Upload and manage your brand assets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={settings.logo_url || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  logo_url: e.target.value
                })}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Used in the header and footer of your website
              </p>
            </div>
            <div>
              <Label htmlFor="favicon_url">Favicon URL</Label>
              <Input
                id="favicon_url"
                value={settings.favicon_url || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  favicon_url: e.target.value
                })}
                placeholder="https://example.com/favicon.ico"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Small icon displayed in browser tabs (16x16 or 32x32 pixels)
              </p>
            </div>
            
            {(settings.logo_url || settings.favicon_url) && (
              <div className="pt-4 border-t">
                <Label>Preview</Label>
                <div className="flex items-center space-x-4 mt-2">
                  {settings.logo_url && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Logo</p>
                      <img
                        src={settings.logo_url}
                        alt="Logo preview"
                        className="h-12 w-auto object-contain border rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  {settings.favicon_url && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Favicon</p>
                      <img
                        src={settings.favicon_url}
                        alt="Favicon preview"
                        className="h-8 w-8 object-contain border rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SEO Settings */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>SEO Settings</span>
            </CardTitle>
            <CardDescription>
              Optimize your website for search engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta_keywords">Meta Keywords</Label>
              <Textarea
                id="meta_keywords"
                value={settings.meta_keywords || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  meta_keywords: e.target.value
                })}
                placeholder="web development, digital solutions, business growth"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Comma-separated keywords that describe your website
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics & Tracking</span>
            </CardTitle>
            <CardDescription>
              Configure tracking and analytics tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={settings.google_analytics_id || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  google_analytics_id: e.target.value
                })}
                placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Google Analytics tracking ID
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Information */}
      <Card className="card-feature">
        <CardHeader>
          <CardTitle>Technical Information</CardTitle>
          <CardDescription>
            Important technical details about your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-medium mb-2">Domain Configuration</h4>
              <p className="text-sm text-muted-foreground">
                Make sure your domain DNS settings point to your hosting provider
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-medium mb-2">SSL Certificate</h4>
              <p className="text-sm text-muted-foreground">
                Ensure your website has a valid SSL certificate for security
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Site Settings'}
        </Button>
      </div>
    </div>
  );
}