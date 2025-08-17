import { Check, Zap, Crown, Rocket } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 999,
      description: 'Perfect for small businesses starting their digital journey',
      features: [
        'Responsive Website Design',
        'Basic SEO Optimization',
        'Contact Form Integration',
        '3 Months Support',
        'Mobile Optimization',
        'Basic Analytics Setup'
      ],
      popular: false,
      color: 'primary'
    },
    {
      name: 'Professional',
      icon: Crown,
      price: 2499,
      description: 'Ideal for growing businesses with advanced needs',
      features: [
        'Everything in Starter',
        'Custom Web Application',
        'Advanced SEO & Marketing',
        'E-commerce Integration',
        '6 Months Support',
        'Performance Optimization',
        'Custom Database Design',
        'Third-party Integrations'
      ],
      popular: true,
      color: 'primary'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 4999,
      description: 'Complete solution for large-scale operations',
      features: [
        'Everything in Professional',
        'Cloud Infrastructure Setup',
        'Advanced Security Features',
        'Custom API Development',
        '12 Months Support',
        'DevOps & CI/CD Pipeline',
        'Advanced Analytics',
        'Dedicated Project Manager',
        '24/7 Priority Support'
      ],
      popular: false,
      color: 'primary'
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20 text-secondary text-sm font-medium mb-6">
            Flexible Pricing
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Perfect
            <span className="block text-primary">Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From startups to enterprise, we have the right solution for your business needs. All plans include our premium support and consultation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`card-pricing hover-lift ${plan.popular ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-hero text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 bg-${plan.color}/10 rounded-2xl flex items-center justify-center`}>
                    <plan.icon className={`w-8 h-8 text-${plan.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                {/* Price */}
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">/project</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <button 
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-hero text-white shadow-lg hover-glow' 
                      : 'btn-secondary'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include free consultation and 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;