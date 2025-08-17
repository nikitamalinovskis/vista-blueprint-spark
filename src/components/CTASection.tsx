import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-orange/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Transform Your Business?
          </div>

          {/* Main Content */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Build Something
            <span className="block bg-gradient-to-r from-accent-purple to-accent-orange bg-clip-text text-transparent">
              Extraordinary Together
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join hundreds of successful businesses who've transformed their digital presence with our expert solutions. 
            Your success story starts with a single conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-white text-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center animate-pulse-soft">
              Start Your Project Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50 flex items-center justify-center">
              Schedule Free Consultation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">Free</div>
              <div className="text-white/70">Initial Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">30-Day</div>
              <div className="text-white/70">Money-Back Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Premium Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;