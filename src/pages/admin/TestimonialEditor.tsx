import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Save, Trash2, Star } from 'lucide-react';

interface Testimonial {
  id?: string;
  author_name: string;
  author_role: string;
  author_company: string;
  content: string;
  rating: number;
  author_avatar: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export default function TestimonialEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      author_name: '',
      author_role: '',
      author_company: '',
      content: '',
      rating: 5,
      author_avatar: '',
      is_featured: false,
      is_active: true,
      sort_order: testimonials.length,
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: any) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const removeTestimonial = async (index: number) => {
    const testimonial = testimonials[index];
    
    if (testimonial.id) {
      if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
      
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', testimonial.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
        return;
      }
    }

    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
  };

  const saveTestimonials = async () => {
    setIsSaving(true);
    try {
      const operations = testimonials.map(async (testimonial, index) => {
        const testimonialData = {
          ...testimonial,
          sort_order: index,
        };

        if (testimonial.id) {
          return supabase
            .from('testimonials')
            .update(testimonialData)
            .eq('id', testimonial.id);
        } else {
          return supabase
            .from('testimonials')
            .insert([testimonialData])
            .select()
            .single();
        }
      });

      const results = await Promise.all(operations);
      
      // Update local state with new IDs
      const updatedTestimonials = testimonials.map((testimonial, index) => {
        const result = results[index];
        if (result.data && !testimonial.id) {
          return Array.isArray(result.data) ? result.data[0] : result.data;
        }
        return testimonial;
      });
      
      setTestimonials(updatedTestimonials);

      toast({
        title: "Success",
        description: "Testimonials saved successfully!",
      });
    } catch (error) {
      console.error('Error saving testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonials",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage customer testimonials and reviews
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={addTestimonial} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
          <Button onClick={saveTestimonials} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Testimonial #{index + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Author Name</Label>
                  <Input
                    value={testimonial.author_name}
                    onChange={(e) => updateTestimonial(index, 'author_name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Author Role</Label>
                  <Input
                    value={testimonial.author_role}
                    onChange={(e) => updateTestimonial(index, 'author_role', e.target.value)}
                    placeholder="CEO, CTO, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={testimonial.author_company}
                    onChange={(e) => updateTestimonial(index, 'author_company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Select 
                    value={testimonial.rating.toString()} 
                    onValueChange={(value) => updateTestimonial(index, 'rating', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center">
                            {Array.from({ length: rating }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                            ))}
                            <span className="ml-2">{rating} Star{rating !== 1 ? 's' : ''}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input
                  value={testimonial.author_avatar}
                  onChange={(e) => updateTestimonial(index, 'author_avatar', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Testimonial Content</Label>
                <Textarea
                  value={testimonial.content}
                  onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                  placeholder="Enter the testimonial content..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={testimonial.is_featured}
                    onCheckedChange={(checked) => updateTestimonial(index, 'is_featured', checked)}
                  />
                  <Label>Featured</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={testimonial.is_active}
                    onCheckedChange={(checked) => updateTestimonial(index, 'is_active', checked)}
                  />
                  <Label>Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No testimonials yet. Add your first testimonial to get started.
              </p>
              <Button onClick={addTestimonial}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Testimonial
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}