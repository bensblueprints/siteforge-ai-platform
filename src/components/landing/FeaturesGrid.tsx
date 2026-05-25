import { useEffect, useRef } from 'react';
import {
  Bot,
  Globe,
  Palette,
  Zap,
  Shield,
  BarChart3,
  Smartphone,
  Code2,
  Clock,
  Users,
  Layers,
  Headphones,
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Content Extraction',
    description: 'Our AI scans Google Maps listings and existing websites, automatically extracting business info, photos, reviews, and services.',
    color: '#6b46c1',
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Connect any domain in seconds. Free SSL certificate included. Your brand, your URL, professionally hosted.',
    color: '#2563eb',
  },
  {
    icon: Palette,
    title: 'Visual Editor',
    description: 'Drag, drop, and customize every element. Change colors, fonts, images, and layouts with zero coding knowledge.',
    color: '#0891b2',
  },
  {
    icon: Zap,
    title: '60-Second Builds',
    description: 'From URL to live website in under a minute. The fastest website builder engineered for speed and efficiency.',
    color: '#eab308',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Free SSL, DDoS protection, automated backups, and 99.9% uptime guarantee on our global CDN network.',
    color: '#16a34a',
  },
  {
    icon: BarChart3,
    title: 'SEO Optimized',
    description: 'Every site is built with proper meta tags, structured data, semantic HTML, and lightning-fast load speeds.',
    color: '#ea580c',
  },
  {
    icon: Smartphone,
    title: 'Mobile Perfect',
    description: 'Responsive by default. Every website looks stunning on phones, tablets, and desktops without extra work.',
    color: '#be185d',
  },
  {
    icon: Code2,
    title: 'Clean Code Export',
    description: 'Export your site as clean React + Tailwind code. No vendor lock-in. Own everything you build, always.',
    color: '#7c3aed',
  },
  {
    icon: Clock,
    title: 'Unlimited Revisions',
    description: 'Regenerate, redesign, and revise as many times as you want. No limits on creativity or iterations.',
    color: '#0d9488',
  },
  {
    icon: Users,
    title: 'Client Preview Links',
    description: 'Share professional preview links with clients before going live. Approve, iterate, then deploy.',
    color: '#dc2626',
  },
  {
    icon: Layers,
    title: '100 Industry Templates',
    description: 'From plumbers to pastry shops, every industry has a purpose-built template with the right sections and layouts.',
    color: '#ca8a04',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Get help when you need it. Our team of experts is available via chat and email on all paid plans.',
    color: '#4f46e5',
  },
];

export default function FeaturesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 50);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative py-24 sm:py-32" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
              Features
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
          >
            Everything You Need to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Build & Sell
            </span>
          </h2>
          <p className="text-base text-white/50 max-w-2xl mx-auto">
            Professional-grade tools that let you create, customize, and deploy websites at scale. Built for freelancers, agencies, and entrepreneurs.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s ease' }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>

              {/* Hover Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.color}08, transparent 40%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
