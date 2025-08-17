import { CheckCircle, Globe, Zap, Search, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const WebDevelopment = () => {
  const features = [
    {
      icon: Globe,
      title: 'Responsive Design',
      description: 'Perfect display across all devices and screen sizes with fluid, adaptive layouts that ensure optimal user experience.',
      benefits: ['Mobile-first approach', 'Cross-device compatibility', 'Flexible grid systems', 'Touch-friendly interfaces']
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Built-in search engine optimization to improve visibility and drive organic traffic to your website.',
      benefits: ['Meta tag optimization', 'Schema markup', 'Page speed optimization', 'Content structure']
    },
    {
      icon: Zap,
      title: 'Fast Loading',
      description: 'Lightning-fast performance with optimized code, compressed assets, and efficient caching strategies.',
      benefits: ['Under 2s load times', 'Image optimization', 'Code splitting', 'CDN integration']
    },
    {
      icon: Monitor,
      title: 'Cross-Browser Compatible',
      description: 'Consistent functionality and appearance across all major browsers and platforms.',
      benefits: ['Chrome, Firefox, Safari', 'Edge compatibility', 'Progressive enhancement', 'Fallback support']
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
    'Node.js', 'GraphQL', 'PostgreSQL', 'AWS'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Web Development <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Create exceptional web experiences with modern technologies, responsive design, and performance optimization that drives results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Project
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in [animation-delay:300ms]">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="bg-card rounded-xl p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="ml-auto text-sm text-muted-foreground">yoursite.com</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
                      <div className="h-4 bg-secondary/20 rounded animate-pulse [animation-delay:500ms]"></div>
                      <div className="h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Core Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every website we build includes these essential features to ensure success in today's digital landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Modern Technologies</h2>
            <p className="text-lg text-muted-foreground">We use cutting-edge tools and frameworks</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech}
                className="bg-card px-6 py-3 rounded-full border border-border hover:border-primary/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's create a website that not only looks great but performs exceptionally and drives your business forward.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Your Project Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebDevelopment;