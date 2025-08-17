import { CheckCircle, Cloud, TrendingUp, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const CloudInfrastructure = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Auto Scaling',
      description: 'Automatically adjust resources based on demand to ensure optimal performance while controlling costs.',
      benefits: ['Dynamic resource allocation', 'Load balancing', 'Traffic surge handling', 'Cost optimization']
    },
    {
      icon: Shield,
      title: 'High Availability',
      description: 'Enterprise-grade uptime with redundancy, failover systems, and global content distribution.',
      benefits: ['99.99% uptime SLA', 'Multi-region deployment', 'Disaster recovery', 'Zero-downtime updates']
    },
    {
      icon: Cloud,
      title: 'Cost Optimization',
      description: 'Smart resource management and usage monitoring to minimize cloud spending without sacrificing performance.',
      benefits: ['Pay-as-you-use model', 'Resource right-sizing', 'Reserved instances', 'Cost analytics']
    },
    {
      icon: Activity,
      title: '24/7 Monitoring',
      description: 'Comprehensive monitoring and alerting system to detect and resolve issues before they impact users.',
      benefits: ['Real-time metrics', 'Proactive alerts', 'Performance tracking', 'Security monitoring']
    }
  ];

  const cloudProviders = [
    { name: 'AWS', logo: '☁️', color: 'text-orange-500' },
    { name: 'Google Cloud', logo: '🌐', color: 'text-blue-500' },
    { name: 'Microsoft Azure', logo: '🔷', color: 'text-blue-600' },
    { name: 'Digital Ocean', logo: '🌊', color: 'text-cyan-500' }
  ];

  const metrics = [
    { value: '99.99%', label: 'Uptime SLA', icon: Shield },
    { value: '< 10ms', label: 'Response Time', icon: Activity },
    { value: '50+', label: 'Global Regions', icon: Cloud },
    { value: '24/7', label: 'Expert Support', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-accent-purple/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Cloud <span className="text-primary">Infrastructure</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Scale your applications with enterprise-grade cloud solutions featuring auto-scaling, high availability, and intelligent cost optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Deploy to Cloud
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Cloud Plans
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in [animation-delay:300ms]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-card rounded-2xl p-8 shadow-2xl border border-border">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Cloud className="w-8 h-8 text-primary" />
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Online</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CPU Usage</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[45%] bg-gradient-to-r from-primary to-accent-purple rounded-full"></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Memory</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-accent-purple to-primary rounded-full"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="text-lg font-bold text-primary">99.99%</div>
                          <div className="text-xs text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center p-3 bg-accent-purple/10 rounded-lg">
                          <div className="text-lg font-bold text-accent-purple">3.2s</div>
                          <div className="text-xs text-muted-foreground">Response</div>
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
            <h2 className="text-4xl font-bold text-foreground mb-6">Enterprise Cloud Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build scalable, reliable applications with our comprehensive cloud infrastructure solutions.
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

      {/* Metrics Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="text-center bg-card rounded-xl p-6 shadow-lg border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                  <div className="text-muted-foreground">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Multi-Cloud Support</h2>
            <p className="text-lg text-muted-foreground">Deploy on your preferred cloud platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cloudProviders.map((provider, index) => (
              <div
                key={provider.name}
                className="bg-card rounded-xl p-6 text-center shadow-lg border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3">{provider.logo}</div>
                <h3 className={`font-bold ${provider.color}`}>{provider.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent-purple">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Scale with Confidence
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let us handle your cloud infrastructure so you can focus on building amazing products that delight your customers.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Cloud Migration
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CloudInfrastructure;