import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does a typical project take to complete?',
      answer: 'Project timelines vary based on complexity and scope. A basic website typically takes 2-4 weeks, while custom applications can take 8-16 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.'
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Absolutely! All our plans include ongoing support ranging from 3-12 months depending on your package. We also offer extended support contracts for long-term partnerships. Our team is available 24/7 for critical issues.'
    },
    {
      question: 'Can you work with our existing systems and integrate new solutions?',
      answer: 'Yes, we specialize in seamless integrations with existing systems. Our team has experience with various platforms, APIs, and databases. We conduct thorough analysis to ensure compatibility and smooth transitions.'
    },
    {
      question: 'What makes DigitalCorp different from other agencies?',
      answer: 'Our combination of technical expertise, design excellence, and business understanding sets us apart. We focus on delivering measurable results, not just beautiful designs. Our clients see an average of 300% improvement in key metrics within the first quarter.'
    },
    {
      question: 'Do you offer custom development or only template-based solutions?',
      answer: 'We provide both options based on your needs and budget. Our custom development services create unique, tailored solutions that perfectly match your requirements. We also offer premium template customization for faster, cost-effective results.'
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-sm font-medium mb-6">
              FAQ
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked
              <span className="block text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our services, process, and what you can expect when working with us.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 p-8 bg-gradient-card rounded-2xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Get in touch for personalized answers to your specific needs.
            </p>
            <button className="btn-primary">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;