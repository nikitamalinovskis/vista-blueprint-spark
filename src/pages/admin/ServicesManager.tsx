import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Save, X, Settings } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: any;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image?: string;
  is_active: boolean;
  sort_order: number;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch services',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (service: Service) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('services')
        .upsert(service);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Service saved successfully',
      });

      await fetchServices();
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });

      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    }
  };

  const addNewService = () => {
    const newService: Service = {
      id: '',
      title: '',
      slug: '',
      description: '',
      icon: 'Settings',
      features: [],
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      og_image: '',
      is_active: true,
      sort_order: services.length,
    };
    setEditingService(newService);
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingService) return;
    const newFeatures = [...editingService.features];
    newFeatures[index] = value;
    setEditingService({ ...editingService, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: [...editingService.features, '']
    });
  };

  const removeFeature = (index: number) => {
    if (!editingService) return;
    const newFeatures = editingService.features.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features: newFeatures });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Manager</h1>
          <p className="text-muted-foreground">
            Manage your service offerings and their content
          </p>
        </div>
        <Button onClick={addNewService} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="flex items-center justify-between">
              {editingService.id ? 'Edit Service' : 'New Service'}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingService(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingService.title}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={editingService.slug}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      slug: e.target.value
                    })}
                    placeholder="service-slug"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      icon: e.target.value
                    })}
                    placeholder="Icon name (e.g., Settings, Globe)"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingService.description}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      description: e.target.value
                    })}
                    placeholder="Service description"
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={editingService.is_active}
                    onCheckedChange={(checked) => setEditingService({
                      ...editingService,
                      is_active: checked
                    })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Features</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {editingService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={editingService.seo_title || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      seo_title: e.target.value
                    })}
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <Label htmlFor="seo_keywords">SEO Keywords</Label>
                  <Input
                    id="seo_keywords"
                    value={editingService.seo_keywords || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      seo_keywords: e.target.value
                    })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={editingService.seo_description || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      seo_description: e.target.value
                    })}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingService(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave(editingService)}
                disabled={isSaving}
                className="btn-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Service'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Grid */}
      <div className="grid gap-6">
        {services.map((service) => (
          <Card key={service.id} className="card-feature hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <Badge variant={service.is_active ? "default" : "secondary"}>
                    {service.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingService(service)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Features:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Slug:</span> /{service.slug}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Services Found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first service
            </p>
            <Button onClick={addNewService} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}