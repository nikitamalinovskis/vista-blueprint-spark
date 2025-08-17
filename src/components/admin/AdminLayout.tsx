import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard,
  Home,
  Settings,
  FileText,
  MessageSquare,
  Image,
  DollarSign,
  Users,
  BarChart3,
  Mail,
  Folder,
  LogOut,
  Menu,
  X,
  Palette
} from 'lucide-react';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/services', label: 'Services', icon: Settings },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/about', label: 'About & Team', icon: Users },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
  { href: '/admin/pages', label: 'Pages & SEO', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/media', label: 'Media Library', icon: Image },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Site Settings', icon: Palette },
];

export function AdminLayout() {
  const { signOut, profile } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Grid Layout */}
      <div className="hidden xl:grid xl:grid-cols-[260px_1fr] xl:h-screen">
        {/* Desktop Sidebar */}
        <div className="bg-card border-r border-border/50 shadow-lg flex flex-col">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-border/50 bg-gradient-hero">
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-primary-foreground/80 text-sm">Content Management</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="text-sm text-muted-foreground mb-3 px-2">
              <div className="font-medium">Signed in as:</div>
              <div className="truncate">{profile?.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Desktop Content Area */}
        <div className="flex flex-col overflow-hidden">
          {/* Top Header */}
          <div className="h-16 bg-background/80 backdrop-blur-sm border-b border-border/50 px-6 flex items-center justify-end shrink-0">
            <div className="text-sm text-muted-foreground">
              Manage your website content and settings
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Tablet Layout (lg to xl) */}
      <div className="hidden lg:block xl:hidden">
        {/* Mobile Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/50 shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/50 bg-gradient-hero">
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-primary-foreground/80 text-sm">Content Management</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="text-sm text-muted-foreground mb-3 px-2">
              <div className="font-medium">Signed in as:</div>
              <div className="truncate">{profile?.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tablet Content */}
        <div className="flex flex-col min-h-screen">
          {/* Top Header */}
          <div className="h-16 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 flex items-center justify-between shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Manage your website content and settings
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="block lg:hidden">
        {/* Mobile Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/50 shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-hero">
            <div className="text-center flex-1">
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-primary-foreground/80 text-xs">Content Management</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="text-xs text-muted-foreground mb-3 px-2">
              <div className="font-medium">Signed in as:</div>
              <div className="truncate">{profile?.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground text-xs"
            >
              <LogOut className="h-3 w-3 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex flex-col min-h-screen">
          {/* Top Header - Sticky */}
          <div className="sticky top-0 z-40 h-14 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 flex items-center justify-between shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="text-xs text-muted-foreground">
              Manage content
            </div>
          </div>

          {/* Main Content - No gap, starts directly below header */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}