import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Globe,
  Eye,
  MousePointer
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalBlogPosts: number;
  publishedPosts: number;
  totalTestimonials: number;
  totalServices: number;
  totalPricingTiers: number;
  recentActivity: Array<{
    action: string;
    timestamp: string;
    details: string;
  }>;
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
    totalTestimonials: 0,
    totalServices: 0,
    totalPricingTiers: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [
        { count: usersCount },
        { count: blogPostsCount },
        { count: publishedPostsCount },
        { count: testimonialsCount },
        { count: servicesCount },
        { count: pricingTiersCount },
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('pricing_tiers').select('id', { count: 'exact' }),
      ]);

      setAnalyticsData({
        totalUsers: usersCount || 0,
        totalBlogPosts: blogPostsCount || 0,
        publishedPosts: publishedPostsCount || 0,
        totalTestimonials: testimonialsCount || 0,
        totalServices: servicesCount || 0,
        totalPricingTiers: pricingTiersCount || 0,
        recentActivity: [
          {
            action: 'System Setup',
            timestamp: new Date().toISOString(),
            details: 'Admin panel initialized successfully'
          }
        ],
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: analyticsData.totalUsers,
      description: 'Registered users',
      icon: Users,
      trend: '+0%',
      color: 'text-blue-600',
    },
    {
      title: 'Blog Posts',
      value: analyticsData.totalBlogPosts,
      description: `${analyticsData.publishedPosts} published`,
      icon: FileText,
      trend: '+0%',
      color: 'text-green-600',
    },
    {
      title: 'Testimonials',
      value: analyticsData.totalTestimonials,
      description: 'Customer reviews',
      icon: MessageSquare,
      trend: '+0%',
      color: 'text-purple-600',
    },
    {
      title: 'Services',
      value: analyticsData.totalServices,
      description: 'Active services',
      icon: Globe,
      trend: '+0%',
      color: 'text-orange-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your website performance and content metrics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="card-feature hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">{card.trend}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Overview */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Content Overview</span>
            </CardTitle>
            <CardDescription>
              Summary of your website content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Blog Posts</span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{analyticsData.totalBlogPosts} total</Badge>
                <Badge variant="default">{analyticsData.publishedPosts} published</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Services</span>
              <Badge variant="outline">{analyticsData.totalServices} active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pricing Tiers</span>
              <Badge variant="outline">{analyticsData.totalPricingTiers} tiers</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Testimonials</span>
              <Badge variant="outline">{analyticsData.totalTestimonials} reviews</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Overview (Placeholder) */}
        <Card className="card-feature">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Traffic Overview</span>
            </CardTitle>
            <CardDescription>
              Website visitor statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <MousePointer className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Traffic Analytics Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                Connect Google Analytics to see detailed traffic statistics
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-feature">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and changes to your content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.length > 0 ? (
              analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recent Activity</h3>
                <p className="text-muted-foreground text-sm">
                  Activity will appear here as you make changes to your content
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics (Placeholder) */}
      <Card className="card-feature">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Key performance indicators for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">--</div>
              <div className="text-sm text-muted-foreground">Page Views</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">--</div>
              <div className="text-sm text-muted-foreground">Bounce Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">--</div>
              <div className="text-sm text-muted-foreground">Avg. Session</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Connect analytics tools to view detailed performance metrics
          </p>
        </CardContent>
      </Card>
    </div>
  );
}