import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Save } from 'lucide-react';

interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
}

export default function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .single();

      if (error) throw error;
      setContent(data);
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      toast({
        title: "Error",
        description: "Failed to load homepage content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('homepage_content')
        .update({
          hero_title: content.hero_title,
          hero_subtitle: content.hero_subtitle,
          hero_description: content.hero_description,
          hero_cta_primary: content.hero_cta_primary,
          hero_cta_secondary: content.hero_cta_secondary,
        })
        .eq('id', content.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Homepage content updated successfully!",
      });
    } catch (error) {
      console.error('Error updating homepage content:', error);
      toast({
        title: "Error",
        description: "Failed to update homepage content",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (field: keyof HomepageContent, value: string) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No homepage content found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Homepage Editor</h1>
          <p className="text-muted-foreground">
            Edit your homepage hero section content
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>
            Configure the main hero section of your homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              value={content.hero_title}
              onChange={(e) => updateContent('hero_title', e.target.value)}
              placeholder="Enter hero title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
            <Input
              id="hero-subtitle"
              value={content.hero_subtitle}
              onChange={(e) => updateContent('hero_subtitle', e.target.value)}
              placeholder="Enter hero subtitle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-description">Hero Description</Label>
            <Textarea
              id="hero-description"
              value={content.hero_description}
              onChange={(e) => updateContent('hero_description', e.target.value)}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cta-primary">Primary CTA Button</Label>
              <Input
                id="cta-primary"
                value={content.hero_cta_primary}
                onChange={(e) => updateContent('hero_cta_primary', e.target.value)}
                placeholder="e.g., Get Started Today"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-secondary">Secondary CTA Button</Label>
              <Input
                id="cta-secondary"
                value={content.hero_cta_secondary}
                onChange={(e) => updateContent('hero_cta_secondary', e.target.value)}
                placeholder="e.g., Watch Demo"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}