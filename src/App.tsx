import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WebDevelopment from "./pages/WebDevelopment";
import MobileFirst from "./pages/MobileFirst";
import CloudInfrastructure from "./pages/CloudInfrastructure";
import DataAnalytics from "./pages/DataAnalytics";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
// Admin imports
import { AdminLayout } from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import HomepageEditor from "./pages/admin/HomepageEditor";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import TestimonialEditor from "./pages/admin/TestimonialEditor";
import ServicesManager from "./pages/admin/ServicesManager";
import PricingManager from "./pages/admin/PricingManager";
import AboutEditor from "./pages/admin/AboutEditor";
import ContactEditor from "./pages/admin/ContactEditor";
import Analytics from "./pages/admin/Analytics";
import SiteSettings from "./pages/admin/SiteSettings";
import MediaLibrary from "./pages/admin/MediaLibrary";
import PagesManager from "./pages/admin/PagesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/mobile-first" element={<MobileFirst />} />
            <Route path="/services/cloud" element={<CloudInfrastructure />} />
            <Route path="/services/data-analytics" element={<DataAnalytics />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="homepage" element={<HomepageEditor />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="pricing" element={<PricingManager />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/:id" element={<BlogEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="contact" element={<ContactEditor />} />
              <Route path="pages" element={<PagesManager />} />
              <Route path="testimonials" element={<TestimonialEditor />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;