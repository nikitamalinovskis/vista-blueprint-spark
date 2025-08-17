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
import { Plus, Edit2, Trash2, Save, X, FileText, Search } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: any;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_image?: string;
  is_active: boolean;
}

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pages',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (page: Page) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .upsert(page);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page saved successfully',
      });

      await fetchPages();
      setEditingPage(null);
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });

      await fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete page',
        variant: 'destructive',
      });
    }
  };

  const addNewPage = () => {
    const newPage: Page = {
      id: '',
      title: '',
      slug: '',
      content: {},
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      og_image: '',
      is_active: true,
    };
    setEditingPage(newPage);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pages & SEO Manager</h1>
          <p className="text-muted-foreground">
            Manage your website pages and SEO settings
          </p>
        </div>
        <Button onClick={addNewPage} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Search */}
      <Card className="card-feature">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingPage && (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="flex items-center justify-between">
              {editingPage.id ? 'Edit Page' : 'New Page'}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingPage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                    })}
                    placeholder="Page title"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                    })}
                    placeholder="page-url-slug"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL: /{editingPage.slug}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={editingPage.is_active}
                    onCheckedChange={(checked) => setEditingPage({
                      ...editingPage,
                      is_active: checked
                    })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={editingPage.seo_title || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      seo_title: e.target.value
                    })}
                    placeholder="SEO optimized title"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(editingPage.seo_title || '').length}/60 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={editingPage.seo_description || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      seo_description: e.target.value
                    })}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(editingPage.seo_description || '').length}/160 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced SEO */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Advanced SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seo_keywords">Keywords</Label>
                  <Input
                    id="seo_keywords"
                    value={editingPage.seo_keywords || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      seo_keywords: e.target.value
                    })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div>
                  <Label htmlFor="og_image">Open Graph Image URL</Label>
                  <Input
                    id="og_image"
                    value={editingPage.og_image || ''}
                    onChange={(e) => setEditingPage({
                      ...editingPage,
                      og_image: e.target.value
                    })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setEditingPage(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSave(editingPage)}
                disabled={isSaving || !editingPage.title || !editingPage.slug}
                className="btn-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Page'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pages Grid */}
      <div className="grid gap-6">
        {filteredPages.map((page) => (
          <Card key={page.id} className="card-feature hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-xl">{page.title}</CardTitle>
                  <Badge variant={page.is_active ? "default" : "secondary"}>
                    {page.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPage(page)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(page.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>/{page.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {page.seo_title && (
                  <div>
                    <span className="font-medium text-sm">SEO Title:</span>
                    <p className="text-sm text-muted-foreground">{page.seo_title}</p>
                  </div>
                )}
                {page.seo_description && (
                  <div>
                    <span className="font-medium text-sm">SEO Description:</span>
                    <p className="text-sm text-muted-foreground line-clamp-2">{page.seo_description}</p>
                  </div>
                )}
                {page.seo_keywords && (
                  <div>
                    <span className="font-medium text-sm">Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {page.seo_keywords.split(',').map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? 'No pages found' : 'No pages created yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first page'
              }
            </p>
            {searchTerm ? (
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            ) : (
              <Button onClick={addNewPage} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Page
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}