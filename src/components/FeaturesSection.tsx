import { Zap, Shield, Target, Rocket, Users, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance and blazing fast load times for exceptional user experiences.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security measures to protect your data and ensure compliance.'
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Data-driven strategies that hit your business goals with surgical precision.'
    },
    {
      icon: Rocket,
      title: 'Rapid Deployment',
      description: 'From concept to live in record time with our streamlined development process.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Seasoned professionals with years of experience in cutting-edge technologies.'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Solutions designed to scale globally with robust infrastructure and support.'
    }
  ];

  return (
    <section className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium mb-6">
            Why Choose Us
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Built for Modern
            <span className="block text-primary">Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We combine cutting-edge technology with proven strategies to deliver exceptional results that drive your business forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-feature animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;