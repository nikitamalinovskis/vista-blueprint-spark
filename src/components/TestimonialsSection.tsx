import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'DigitalCorp transformed our digital presence completely. Their attention to detail and technical expertise is unmatched. We saw a 300% increase in conversions within 3 months.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateLabs',
      content: 'The team delivered beyond our expectations. Their cloud infrastructure solutions scaled perfectly with our rapid growth. Professional, reliable, and innovative.',
      rating: 5,
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCo',
      content: 'Working with DigitalCorp was a game-changer. Their data analytics insights helped us optimize our campaigns and increase ROI by 250%. Highly recommended!',
      rating: 5,
      avatar: 'ER'
    }
  ];

  const clientLogos = [
    { name: 'TechStart', logo: 'TS' },
    { name: 'InnovateLabs', logo: 'IL' },
    { name: 'GrowthCo', logo: 'GC' },
    { name: 'DataFlow', logo: 'DF' },
    { name: 'CloudVision', logo: 'CV' },
    { name: 'NextGen', logo: 'NG' }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Client Logos */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by leading companies</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={client.name}
                className="group cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-card rounded-xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-all duration-300 mx-auto">
                  <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {client.logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium mb-6">
            Client Success Stories
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Clients
            <span className="block text-primary">Say About Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders have to say about their experience working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card-testimonial animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;