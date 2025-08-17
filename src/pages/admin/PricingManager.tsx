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
import { Plus, Edit2, Trash2, Save, X, DollarSign, Star } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price_monthly: number;
  price_annual: number;
  description?: string;
  features: any;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

export default function PricingManager() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_tiers')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTiers(data || []);
    } catch (error) {
      console.error('Error fetching pricing tiers:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pricing tiers',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (tier: PricingTier) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('pricing_tiers')
        .upsert(tier);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Pricing tier saved successfully',
      });

      await fetchTiers();
      setEditingTier(null);
    } catch (error) {
      console.error('Error saving pricing tier:', error);
      toast({
        title: 'Error',
        description: 'Failed to save pricing tier',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return;

    try {
      const { error } = await supabase
        .from('pricing_tiers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Pricing tier deleted successfully',
      });

      await fetchTiers();
    } catch (error) {
      console.error('Error deleting pricing tier:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete pricing tier',
        variant: 'destructive',
      });
    }
  };

  const addNewTier = () => {
    const newTier: PricingTier = {
      id: '',
      name: '',
      price_monthly: 0,
      price_annual: 0,
      description: '',
      features: [],
      is_featured: false,
      is_active: true,
      sort_order: tiers.length,
    };
    setEditingTier(newTier);
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingTier) return;
    const newFeatures = [...editingTier.features];
    newFeatures[index] = value;
    setEditingTier({ ...editingTier, features: newFeatures });
  };

  const addFeature = () => {
    if (!editingTier) return;
    setEditingTier({
      ...editingTier,
      features: [...editingTier.features, '']
    });
  };

  const removeFeature = (index: number) => {
    if (!editingTier) return;
    const newFeatures = editingTier.features.filter((_, i) => i !== index);
    setEditingTier({ ...editingTier, features: newFeatures });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading pricing tiers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pricing Manager</h1>
          <p className="text-muted-foreground">
            Manage your pricing tiers and subscription plans
          </p>
        </div>
        <Button onClick={addNewTier} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Pricing Tier
        </Button>
      </div>

      {/* Edit Modal */}
      {editingTier && (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="flex items-center justify-between">
              {editingTier.id ? 'Edit Pricing Tier' : 'New Pricing Tier'}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingTier(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tier Name</Label>
                  <Input
                    id="name"
                    value={editingTier.name}
                    onChange={(e) => setEditingTier({
                      ...editingTier,
                      name: e.target.value
                    })}
                    placeholder="e.g. Professional"
                  />
                </div>
                <div>
                  <Label htmlFor="price_monthly">Monthly Price ($)</Label>
                  <Input
                    id="price_monthly"
                    type="number"
                    step="0.01"
                    value={editingTier.price_monthly}
                    onChange={(e) => setEditingTier({
                      ...editingTier,
                      price_monthly: parseFloat(e.target.value) || 0
                    })}
                    placeholder="99.00"
                  />
                </div>
                <div>
                  <Label htmlFor="price_annual">Annual Price ($)</Label>
                  <Input
                    id="price_annual"
                    type="number"
                    step="0.01"
                    value={editingTier.price_annual}
                    onChange={(e) => setEditingTier({
                      ...editingTier,
                      price_annual: parseFloat(e.target.value) || 0
                    })}
                    placeholder="990.00"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingTier.description || ''}
                    onChange={(e) => setEditingTier({
                      ...editingTier,
                      description: e.target.value
                    })}
                    placeholder="Tier description"
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={editingTier.is_featured}
                      onCheckedChange={(checked) => setEditingTier({
                        ...editingTier,
                        is_featured: checked
                      })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={editingTier.is_active}
                      onCheckedChange={(checked) => setEditingTier({
                        ...editingTier,
                        is_active: checked
                      })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
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
                {editingTier.features.map((feature, index) => (
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

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingTier(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave(editingTier)}
                disabled={isSaving}
                className="btn-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Tier'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Tiers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className={`card-pricing hover-lift ${tier.is_featured ? 'featured' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  {tier.is_featured && <Star className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTier(tier)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(tier.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-3xl font-bold">
                    <DollarSign className="h-6 w-6" />
                    <span>{tier.price_monthly}</span>
                    <span className="text-lg text-muted-foreground">/mo</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${tier.price_annual}/year (save ${(tier.price_monthly * 12 - tier.price_annual).toFixed(2)})
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={tier.is_active ? "default" : "secondary"}>
                      {tier.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {tier.is_featured && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Features:</span>
                  <ul className="mt-2 space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tiers.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Pricing Tiers Found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first pricing tier
            </p>
            <Button onClick={addNewTier} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Pricing Tier
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}