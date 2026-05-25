import type { DeviceView } from '../../pages/EditorPage';
import type { WebsiteContent, PageSection } from '../../store/useStore';
import {
  Phone, Mail, MapPin, Clock, Star, Menu, Shield, Wrench, Car, Zap,
  CheckCircle, HelpCircle,
} from 'lucide-react';

interface EditorCanvasProps {
  deviceView: DeviceView;
  content: WebsiteContent;
  sections: PageSection[];
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
}

const deviceWidths: Record<DeviceView, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function EditorCanvas({
  deviceView, content, sections, selectedSectionId, onSelectSection,
}: EditorCanvasProps) {
  const { primaryColor, fontFamily } = content;
  const sortedSections = [...sections].sort((a, b) => a.order - b.order).filter((s) => s.enabled);

  return (
    <div className="flex-1 overflow-auto" style={{ background: '#0a0a0a' }}>
      <div className="min-h-full flex justify-center p-4 sm:p-8">
        <div className="w-full transition-all duration-500" style={{ maxWidth: deviceWidths[deviceView] }}>
          <div className="rounded-lg overflow-hidden border border-white/5 shadow-2xl" style={{ fontFamily: `${fontFamily}, sans-serif` }}>

            {/* Navigation - always shown */}
            <nav className="flex items-center justify-between px-4 sm:px-6 py-3" style={{ background: primaryColor }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-white truncate max-w-[120px] sm:max-w-none">{content.businessName}</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
                  <span key={item} className="text-xs text-white/80 hover:text-white cursor-pointer transition-colors">{item}</span>
                ))}
              </div>
              <button className="md:hidden text-white"><Menu className="w-4 h-4" /></button>
            </nav>

            {/* Render Sections */}
            {sortedSections.map((section) => (
              <div
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedSectionId === section.id
                    ? 'ring-2 ring-violet-500 ring-inset'
                    : 'hover:ring-1 hover:ring-white/10 hover:ring-inset'
                }`}
              >
                {/* Section Label */}
                {selectedSectionId === section.id && (
                  <div className="absolute top-0 left-0 z-20 px-2 py-0.5 bg-violet-500 text-white text-[10px] font-semibold uppercase tracking-wider rounded-br">
                    {section.name}
                  </div>
                )}

                <SectionRenderer section={section} content={content} />
              </div>
            ))}

            {/* Footer - always shown */}
            <footer className="px-4 sm:px-6 py-6 border-t border-white/5" style={{ background: '#000' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: primaryColor }}>
                    <Car className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{content.businessName}</span>
                </div>
                <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionRenderer({ section, content }: { section: PageSection; content: WebsiteContent }) {
  switch (section.type) {
    case 'hero': return <HeroSection content={content} />;
    case 'services': return <ServicesSection content={content} />;
    case 'about': return <AboutSection content={content} />;
    case 'testimonials': return <TestimonialsSection content={content} />;
    case 'contact': return <ContactSection content={content} />;
    case 'gallery': return <GallerySection content={content} />;
    case 'team': return <TeamSection content={content} />;
    case 'faq': return <FAQSection content={content} />;
    case 'cta': return <CTASection content={content} />;
    case 'map': return <MapSection content={content} />;
    default: return null;
  }
}

function HeroSection({ content }: { content: WebsiteContent }) {
  return (
    <section className="relative px-4 sm:px-6 py-12 sm:py-20 text-center" style={{ background: `linear-gradient(135deg, ${content.primaryColor} 0%, ${content.secondaryColor} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 text-yellow-300 fill-yellow-300" />)}
          <span className="text-xs text-white/70 ml-1">{content.rating} ({content.reviewCount} reviews)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
          {content.tagline}
        </h1>
        <p className="text-xs sm:text-sm text-white/80 mb-6 leading-relaxed max-w-lg mx-auto">{content.description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button className="px-5 py-2.5 rounded-full bg-white text-sm font-semibold transition-all hover:shadow-lg" style={{ color: content.primaryColor }}>
            Get Started
          </button>
          <button className="px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-all">
            Call {content.phone}
          </button>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: WebsiteContent }) {
  const serviceIcons = [Wrench, Zap, Shield, Star, Clock, CheckCircle];
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#000' }}>
      <div className="text-center mb-8">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>Our Services</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">What We Offer</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {content.services.map((service, i) => {
          const Icon = serviceIcons[i % serviceIcons.length];
          return (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${content.primaryColor}15` }}>
                <Icon className="w-4 h-4" style={{ color: content.primaryColor }} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{service}</h3>
              <p className="text-[11px] text-white/40">Professional {service.toLowerCase()} services.</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AboutSection({ content }: { content: WebsiteContent }) {
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#111' }}>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>About Us</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-3">Trusted {content.businessName} Professionals</h2>
          <p className="text-xs text-white/50 leading-relaxed mb-4">{content.description}</p>
          <div className="flex items-center gap-4">
            <div><div className="text-xl font-bold text-white">15+</div><div className="text-[10px] text-white/40">Years</div></div>
            <div className="w-px h-6 bg-white/10" />
            <div><div className="text-xl font-bold text-white">10K+</div><div className="text-[10px] text-white/40">Customers</div></div>
            <div className="w-px h-6 bg-white/10" />
            <div><div className="text-xl font-bold text-white">100%</div><div className="text-[10px] text-white/40">Satisfaction</div></div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img src="/images/hero-website.jpg" alt="About" className="w-full h-48 sm:h-56 object-cover" />
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ content }: { content: WebsiteContent }) {
  const testimonials = [
    { name: 'Michael R.', text: `Excellent service from ${content.businessName}. Highly professional and reliable.` },
    { name: 'Sarah K.', text: `I have been using ${content.businessName} for years. Always exceeds expectations!` },
    { name: 'David L.', text: `Fast, friendly, and fairly priced. ${content.businessName} is the best in the area.` },
  ];
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#000' }}>
      <div className="text-center mb-8">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>Testimonials</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">What Customers Say</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {testimonials.map((t, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((j) => <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-xs text-white/60 mb-2">&ldquo;{t.text}&rdquo;</p>
            <p className="text-xs font-medium text-white/80">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: WebsiteContent }) {
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#111' }}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>Contact Us</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-4">Get In Touch</h2>
          <div className="space-y-3">
            {[
              { icon: Phone, label: 'Phone', value: content.phone },
              { icon: Mail, label: 'Email', value: content.email },
              { icon: MapPin, label: 'Address', value: content.address },
              { icon: Clock, label: 'Hours', value: content.hours },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${content.primaryColor}15` }}>
                  <item.icon className="w-3.5 h-3.5" style={{ color: content.primaryColor }} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40">{item.label}</div>
                  <div className="text-xs text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h3 className="text-sm font-semibold text-white mb-3">Send a Message</h3>
          <div className="space-y-2">
            <input type="text" placeholder="Your Name" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50" />
            <input type="email" placeholder="Your Email" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50" />
            <textarea placeholder="How can we help?" rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none" />
            <button className="w-full py-2 rounded-lg text-white text-xs font-semibold transition-all hover:shadow-lg" style={{ background: `linear-gradient(135deg, ${content.primaryColor} 0%, ${content.secondaryColor} 100%)` }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection({ content }: { content: WebsiteContent }) {
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#000' }}>
      <div className="text-center mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>Gallery</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Our Work</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {['/images/hero-website.jpg', '/images/pos-terminal.jpg', '/images/retail-analytics.jpg', '/images/server-room.jpg'].map((src, i) => (
          <div key={i} className="rounded-lg overflow-hidden aspect-square">
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamSection({ content }: { content: WebsiteContent }) {
  const team = [
    { name: 'John Smith', role: 'Owner & Founder' },
    { name: 'Lisa Chen', role: 'Operations Manager' },
    { name: 'Mike Johnson', role: 'Lead Technician' },
  ];
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#111' }}>
      <div className="text-center mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>Our Team</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Meet the Experts</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        {team.map((member, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center">
            <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold text-white" style={{ background: `linear-gradient(135deg, ${content.primaryColor}, ${content.secondaryColor})` }}>
              {member.name[0]}
            </div>
            <h3 className="text-sm font-semibold text-white">{member.name}</h3>
            <p className="text-[11px] text-white/40">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ content }: { content: WebsiteContent }) {
  const faqs = [
    { q: `What services does ${content.businessName} offer?`, a: 'We offer a comprehensive range of professional services tailored to your needs.' },
    { q: 'How do I schedule an appointment?', a: `You can call us at ${content.phone} or use the contact form on this page.` },
    { q: 'What are your business hours?', a: content.hours },
    { q: 'Do you offer emergency services?', a: 'Yes, we offer emergency services. Please call us directly for urgent requests.' },
  ];
  return (
    <section className="px-4 sm:px-6 py-10" style={{ background: '#000' }}>
      <div className="text-center mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: content.primaryColor }}>FAQ</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Common Questions</h2>
      </div>
      <div className="max-w-2xl mx-auto space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
            <p className="text-xs font-medium text-white mb-1 flex items-center gap-2">
              <HelpCircle className="w-3 h-3 text-white/30 flex-shrink-0" />
              {faq.q}
            </p>
            <p className="text-[11px] text-white/40 pl-5">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ content }: { content: WebsiteContent }) {
  return (
    <section className="px-4 sm:px-6 py-10 text-center" style={{ background: `linear-gradient(135deg, ${content.primaryColor}20, ${content.secondaryColor}20)` }}>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Get Started?</h2>
      <p className="text-xs text-white/50 mb-4 max-w-md mx-auto">Contact {content.businessName} today for a free consultation.</p>
      <button className="px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:shadow-lg hover:scale-105" style={{ background: `linear-gradient(135deg, ${content.primaryColor} 0%, ${content.secondaryColor} 100%)` }}>
        Call {content.phone}
      </button>
    </section>
  );
}

function MapSection({ content }: { content: WebsiteContent }) {
  return (
    <section className="px-4 sm:px-6 py-6" style={{ background: '#111' }}>
      <div className="rounded-xl overflow-hidden border border-white/5">
        <div className="h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${content.primaryColor}10, ${content.secondaryColor}10)` }}>
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: content.primaryColor }} />
            <p className="text-xs text-white/50">{content.address}</p>
            <p className="text-[10px] text-white/30 mt-1">Google Map will display here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
