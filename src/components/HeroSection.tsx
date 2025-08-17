import { ArrowRight, Play } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-orange/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></span>
              Now Available - Premium Digital Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Transform Your
              <span className="block bg-gradient-to-r from-accent-purple to-accent-orange bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              Elevate your business with cutting-edge digital solutions. From web development to digital transformation, we deliver premium results that drive growth and innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-white text-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white">500+</div>
                <div className="text-white/70 text-sm">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white">98%</div>
                <div className="text-white/70 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white">24/7</div>
                <div className="text-white/70 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img
                src={heroIllustration}
                alt="Digital transformation illustration"
                className="w-full h-auto max-w-lg mx-auto lg:max-w-none rounded-2xl shadow-2xl hover-lift"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-purple/20 to-accent-orange/20 rounded-3xl blur-2xl -z-10 animate-pulse-soft" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;