import { useEffect, useRef, useState } from 'react';
import { Link, Search, Sparkles, Edit3, Rocket, MousePointer } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Link,
    title: 'Paste Any URL',
    description: 'Drop in a Google Maps listing or any existing website URL. Our AI instantly begins analyzing the business data, images, reviews, and content.',
    color: '#6b46c1',
  },
  {
    number: '02',
    icon: Search,
    title: 'AI Extracts Everything',
    description: 'Our intelligent scraper pulls business name, hours, services, contact info, photos, and reviews — building a complete content profile in seconds.',
    color: '#2563eb',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Pick Your Industry',
    description: 'Choose from 100+ industry-specific templates. Each one is professionally designed with the exact sections your business type needs.',
    color: '#0891b2',
  },
  {
    number: '04',
    icon: Edit3,
    title: 'Edit with Ease',
    description: 'Customize anything — text, colors, images, layouts — with our intuitive visual editor. No coding knowledge required, ever.',
    color: '#16a34a',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch & Profit',
    description: 'Hit deploy. Your site goes live on a custom domain with SSL, hosting, and unlimited bandwidth. Start charging clients immediately.',
    color: '#ea580c',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const section = sectionRef.current;
    if (section) {
      const items = section.querySelectorAll('.step-item');
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <MousePointer className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
              How It Works
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
          >
            From URL to Live in{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              60 Seconds
            </span>
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            The fastest website builder on the planet. No templates to configure. No content to write. Just paste a link and watch the magic happen.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item relative group"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: `all 0.6s ease ${index * 0.1}s` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              <div
                className={`relative p-6 rounded-2xl border transition-all duration-500 h-full ${
                  activeStep === index
                    ? 'border-violet-500/30 bg-white/5'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                {/* Step Number */}
                <div
                  className="text-5xl font-bold mb-4 opacity-20"
                  style={{ fontFamily: 'Oswald, Inter, sans-serif', color: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${step.color}15` }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>

                {/* Connector Line (not on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-2 w-4 h-px bg-white/10" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CSS for animations */}
        <style>{`
          .step-item.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}</style>
      </div>
    </section>
  );
}
