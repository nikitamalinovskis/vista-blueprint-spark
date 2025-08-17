import { Monitor, Smartphone, Cloud, BarChart3 } from 'lucide-react';

const AlternatingFeatures = () => {
  const features = [
    {
      icon: Monitor,
      title: 'Web Development Excellence',
      description: 'Create stunning, responsive websites that captivate your audience and drive conversions. Our expert developers use the latest technologies to build fast, secure, and scalable web solutions.',
      benefits: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Cross-Browser Compatible'],
      image: 'web-dev'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Approach',
      description: 'In today\'s mobile world, we prioritize mobile experiences from the ground up. Every solution is designed to work flawlessly across all devices and screen sizes.',
      benefits: ['Native Performance', 'Intuitive UI/UX', 'Offline Capabilities', 'Push Notifications'],
      image: 'mobile-first'
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Leverage the power of cloud computing with our scalable infrastructure solutions. We help you migrate, optimize, and manage your cloud environment for maximum efficiency.',
      benefits: ['Auto Scaling', 'High Availability', 'Cost Optimization', '24/7 Monitoring'],
      image: 'cloud-infra'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & Insights',
      description: 'Make data-driven decisions with our advanced analytics solutions. We transform raw data into actionable insights that drive business growth and optimize performance.',
      benefits: ['Real-time Dashboards', 'Predictive Analytics', 'Custom Reports', 'Data Visualization'],
      image: 'analytics'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="inline-flex items-center px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 text-secondary text-sm font-medium">
                    Feature #{index + 1}
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {feature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm font-medium text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button className="btn-primary">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Image/Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-card rounded-3xl p-8 flex items-center justify-center border border-border">
                    <div className="text-center space-y-4">
                      <feature.icon className="w-20 h-20 text-primary mx-auto" />
                      <div className="text-lg font-semibold text-foreground">
                        {feature.title}
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-hero rounded-full transition-all duration-1000"
                          style={{ width: `${85 + index * 3}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl blur-2xl -z-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlternatingFeatures;