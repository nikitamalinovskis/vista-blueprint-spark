import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AlternatingFeatures from '@/components/AlternatingFeatures';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  console.log('Index component is loading...');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded">
        DigitalCorp Loading ✓
      </div>
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Alternating Features */}
        <AlternatingFeatures />

        {/* Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
