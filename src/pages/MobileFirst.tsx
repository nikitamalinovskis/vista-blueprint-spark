import { CheckCircle, Smartphone, Gauge, Wifi, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const MobileFirst = () => {
  const features = [
    {
      icon: Gauge,
      title: 'Native Performance',
      description: 'Deliver app-like performance with smooth animations, instant load times, and responsive interactions.',
      benefits: ['60fps animations', 'Hardware acceleration', 'Memory optimization', 'Battery efficiency']
    },
    {
      icon: Smartphone,
      title: 'Intuitive UI/UX',
      description: 'User-centered design that feels natural and engaging across all mobile platforms and devices.',
      benefits: ['Touch-optimized interface', 'Gesture navigation', 'Accessibility features', 'Platform conventions']
    },
    {
      icon: Wifi,
      title: 'Offline Capabilities',
      description: 'Seamless offline functionality that keeps users engaged even without internet connectivity.',
      benefits: ['Offline data sync', 'Progressive loading', 'Cache strategies', 'Background updates']
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Intelligent notification system to re-engage users and drive meaningful interactions.',
      benefits: ['Targeted messaging', 'Rich notifications', 'A/B testing', 'Analytics tracking']
    }
  ];

  const platforms = [
    { name: 'iOS', icon: '📱' },
    { name: 'Android', icon: '🤖' },
    { name: 'PWA', icon: '🌐' },
    { name: 'React Native', icon: '⚛️' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Mobile-First <span className="text-secondary">Approach</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Build exceptional mobile experiences that engage users with native performance, intuitive design, and cutting-edge functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                    Start Mobile Project
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Mobile Plans
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in [animation-delay:300ms]">
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div className="w-64 h-[500px] bg-gradient-to-b from-primary/20 to-secondary/20 rounded-[2.5rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-card rounded-[2rem] overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-primary to-secondary h-24 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
                        <div className="h-4 bg-secondary/20 rounded animate-pulse [animation-delay:500ms]"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded"></div>
                          <div className="h-16 bg-gradient-to-br from-secondary/10 to-primary/10 rounded"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted/50 rounded animate-pulse [animation-delay:700ms]"></div>
                          <div className="h-3 bg-muted/30 rounded animate-pulse [animation-delay:900ms]"></div>
                        </div>
                      </div>
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
            <h2 className="text-4xl font-bold text-foreground mb-6">Mobile Excellence Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every mobile solution we create is built with these core principles to ensure exceptional user experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:border-secondary/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
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

      {/* Platforms Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Multi-Platform Development</h2>
            <p className="text-lg text-muted-foreground">We build for every platform your users love</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="bg-card rounded-xl p-6 text-center shadow-lg border border-border hover:border-secondary/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3">{platform.icon}</div>
                <h3 className="font-bold text-foreground">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-secondary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="animate-fade-in [animation-delay:200ms]">
              <div className="text-4xl font-bold text-primary mb-2">&lt;2s</div>
              <div className="text-muted-foreground">Load Time</div>
            </div>
            <div className="animate-fade-in [animation-delay:400ms]">
              <div className="text-4xl font-bold text-secondary mb-2">5★</div>
              <div className="text-muted-foreground">App Store Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary to-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Go Mobile?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Transform your digital presence with a mobile-first approach that puts your users first and drives engagement.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-secondary hover:bg-white/90">
              Launch Your Mobile App
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MobileFirst;