import { CheckCircle, BarChart3, TrendingUp, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const DataAnalytics = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Dashboards',
      description: 'Interactive dashboards that provide instant insights into your business metrics and KPIs.',
      benefits: ['Live data updates', 'Customizable widgets', 'Drill-down capabilities', 'Mobile responsive']
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Advanced machine learning algorithms to forecast trends and identify opportunities.',
      benefits: ['Trend forecasting', 'Anomaly detection', 'Risk assessment', 'Opportunity identification']
    },
    {
      icon: FileText,
      title: 'Custom Reports',
      description: 'Generate detailed reports tailored to your specific business needs and stakeholder requirements.',
      benefits: ['Automated scheduling', 'Multiple formats', 'White-label branding', 'Data filtering']
    },
    {
      icon: Eye,
      title: 'Data Visualization',
      description: 'Transform complex data into clear, actionable insights through interactive visualizations.',
      benefits: ['Interactive charts', '3D visualizations', 'Geo-mapping', 'Export capabilities']
    }
  ];

  const dataTypes = [
    { name: 'Sales & Revenue', icon: '💰' },
    { name: 'Customer Behavior', icon: '👥' },
    { name: 'Marketing ROI', icon: '📊' },
    { name: 'Operational Metrics', icon: '⚙️' }
  ];

  const integrations = [
    'Google Analytics', 'Salesforce', 'HubSpot', 'Shopify',
    'MySQL', 'PostgreSQL', 'MongoDB', 'BigQuery'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-accent-orange/10 via-transparent to-primary/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Data Analytics & <span className="text-accent-orange">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform raw data into actionable insights with advanced analytics, real-time dashboards, and predictive intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-accent-orange hover:bg-accent-orange/90">
                    Unlock Your Data
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline">
                    View Analytics Plans
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in [animation-delay:300ms]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/20 to-primary/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-card rounded-2xl p-8 shadow-2xl border border-border">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <BarChart3 className="w-8 h-8 text-accent-orange" />
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-sm text-muted-foreground">Live</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-accent-orange/10 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-accent-orange">$45.2K</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-primary">2.4K</div>
                          <div className="text-xs text-muted-foreground">Users</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Conversion Rate</span>
                          <span className="text-sm font-medium text-green-500">+12%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-[67%] bg-gradient-to-r from-accent-orange to-primary rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                      </div>
                      <div className="h-20 flex items-end gap-1">
                        {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-accent-orange/30 to-accent-orange rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
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
            <h2 className="text-4xl font-bold text-foreground mb-6">Powerful Analytics Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlock the full potential of your data with our comprehensive analytics platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:border-accent-orange/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent-orange" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-accent-orange flex-shrink-0" />
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

      {/* Data Types Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Data Can We Analyze?</h2>
            <p className="text-lg text-muted-foreground">We work with all types of business data</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dataTypes.map((type, index) => (
              <div
                key={type.name}
                className="bg-card rounded-xl p-6 text-center shadow-lg border border-border hover:border-accent-orange/20 transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-bold text-foreground text-sm">{type.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Seamless Integrations</h2>
            <p className="text-lg text-muted-foreground">Connect with your existing tools and databases</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <div
                key={integration}
                className="bg-card px-6 py-3 rounded-full border border-border hover:border-accent-orange/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-foreground">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-accent-orange mb-2">10x</div>
              <div className="text-muted-foreground">Faster Insights</div>
            </div>
            <div className="animate-fade-in [animation-delay:200ms]">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Data Accuracy</div>
            </div>
            <div className="animate-fade-in [animation-delay:400ms]">
              <div className="text-4xl font-bold text-accent-orange mb-2">24/7</div>
              <div className="text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent-orange to-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Turn Data into Decisions
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Stop guessing and start knowing. Get the insights you need to make data-driven decisions that grow your business.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-accent-orange hover:bg-white/90">
              Start Your Analytics Journey
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataAnalytics;