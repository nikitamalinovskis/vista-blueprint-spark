import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, MessageSquare, Image } from 'lucide-react';

interface Stats {
  blogPosts: number;
  testimonials: number;
  features: number;
  pages: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    blogPosts: 0,
    testimonials: 0,
    features: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogResult, testimonialsResult, featuresResult, pagesResult] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('features').select('id', { count: 'exact' }),
        supabase.from('pages').select('id', { count: 'exact' }),
      ]);

      setStats({
        blogPosts: blogResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        features: featuresResult.count || 0,
        pages: pagesResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      description: 'Published articles',
      icon: FileText,
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      description: 'Customer reviews',
      icon: MessageSquare,
    },
    {
      title: 'Features',
      value: stats.features,
      description: 'Product features',
      icon: Image,
    },
    {
      title: 'Pages',
      value: stats.pages,
      description: 'Website pages',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your content management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              • Update homepage content<br />
              • Create new blog post<br />
              • Add testimonial<br />
              • Manage features<br />
              • Edit page SEO settings
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Info</CardTitle>
            <CardDescription>
              Current system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Operational</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Storage:</span>
                <span className="text-green-600">Available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}