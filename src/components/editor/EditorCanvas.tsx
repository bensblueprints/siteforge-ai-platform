import { useRef } from 'react';
import type { DeviceView } from '../../pages/EditorPage';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Menu,
  Shield,
  Wrench,
  Car,
  Zap,
  CheckCircle,
} from 'lucide-react';

interface EditorCanvasProps {
  deviceView: DeviceView;
  websiteContent: any;
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
}

const deviceWidths: Record<DeviceView, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function EditorCanvas({
  deviceView,
  websiteContent,
  onSelectElement,
}: EditorCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    businessName,
    tagline,
    description,
    phone,
    email,
    address,
    hours,
    primaryColor,
    secondaryColor,
    fontFamily,
  } = websiteContent;

  const services = [
    { icon: Wrench, name: 'General Repair', desc: 'Expert diagnostics and repairs for all vehicle makes and models.' },
    { icon: Car, name: 'Oil Change', desc: 'Quick, professional oil changes using premium synthetic oils.' },
    { icon: Zap, name: 'Engine Service', desc: 'Complete engine diagnostics, tune-ups, and rebuilds.' },
    { icon: Shield, name: 'Brake Service', desc: 'Brake inspections, pad replacements, and rotor resurfacing.' },
  ];

  const testimonials = [
    { name: 'Michael R.', text: 'Best auto shop in Austin. Fair prices and honest service every time.', stars: 5 },
    { name: 'Sarah K.', text: 'They fixed my transmission when the dealership quoted triple. Highly recommend!', stars: 5 },
    { name: 'David L.', text: 'Fast oil change, friendly staff, and great waiting area with free WiFi.', stars: 5 },
  ];

  return (
    <div className="flex-1 overflow-auto" style={{ background: '#0a0a0a' }}>
      <div className="min-h-full flex justify-center p-8">
        <div
          ref={canvasRef}
          className="relative transition-all duration-500"
          style={{ width: deviceWidths[deviceView], maxWidth: '100%' }}
        >
          {/* Website Preview */}
          <div
            className="rounded-lg overflow-hidden border border-white/5 shadow-2xl"
            style={{ fontFamily: `${fontFamily}, sans-serif` }}
          >
            {/* Navigation */}
            <nav
              className="flex items-center justify-between px-6 py-4"
              style={{ background: primaryColor }}
              onClick={() => onSelectElement('nav')}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">{businessName}</span>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <span className="text-sm text-white/80 hover:text-white cursor-pointer">Services</span>
                <span className="text-sm text-white/80 hover:text-white cursor-pointer">About</span>
                <span className="text-sm text-white/80 hover:text-white cursor-pointer">Reviews</span>
                <span className="text-sm text-white/80 hover:text-white cursor-pointer">Contact</span>
              </div>
              <button className="sm:hidden text-white">
                <Menu className="w-5 h-5" />
              </button>
            </nav>

            {/* Hero */}
            <section
              className="relative px-6 py-16 sm:py-24 text-center"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
              onClick={() => onSelectElement('hero')}
            >
              <div className="max-w-2xl mx-auto">
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {tagline}
                </h1>
                <p className="text-base text-white/80 mb-8 leading-relaxed">{description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    className="px-6 py-3 rounded-full bg-white font-semibold text-sm transition-all hover:shadow-lg"
                    style={{ color: primaryColor }}
                  >
                    Schedule Service
                  </button>
                  <button className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                    Call Now
                  </button>
                </div>
              </div>
            </section>

            {/* Trust Badges */}
            <section className="px-6 py-6 border-b border-white/5" style={{ background: '#111' }}>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: CheckCircle, text: 'ASE Certified' },
                  { icon: Star, text: '4.9 Rating' },
                  { icon: Shield, text: 'Warranty Included' },
                  { icon: Clock, text: 'Same-Day Service' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon className="w-4 h-4" style={{ color: primaryColor }} />
                    <span className="text-xs text-white/60">{badge.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="px-6 py-12" style={{ background: '#000' }} onClick={() => onSelectElement('services')}>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Our Services
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">What We Offer</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${primaryColor}15` }}
                    >
                      <service.icon className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">{service.name}</h3>
                    <p className="text-sm text-white/40">{service.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* About */}
            <section
              className="px-6 py-12"
              style={{ background: '#111' }}
              onClick={() => onSelectElement('about')}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                    About Us
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                    Trusted Auto Care Since 2008
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    For over 15 years, {businessName} has been Austin&apos;s go-to destination for reliable,
                    honest auto repair. Our ASE-certified technicians use the latest diagnostic equipment
                    to get you back on the road safely.
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-white">15+</div>
                      <div className="text-xs text-white/40">Years Experience</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div>
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-xs text-white/40">Happy Customers</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div>
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-xs text-white/40">Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="/images/hero-website.jpg"
                    alt="Auto Shop"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="px-6 py-12" style={{ background: '#000' }} onClick={() => onSelectElement('testimonials')}>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Testimonials
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">What Customers Say</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(t.stars)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white/60 mb-3">&ldquo;{t.text}&rdquo;</p>
                    <p className="text-sm font-medium text-white/80">— {t.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section className="px-6 py-12" style={{ background: '#111' }} onClick={() => onSelectElement('contact')}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                    Contact Us
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-6">Get In Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                        <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">Phone</div>
                        <div className="text-sm text-white">{phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                        <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">Email</div>
                        <div className="text-sm text-white">{email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                        <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">Address</div>
                        <div className="text-sm text-white">{address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                        <Clock className="w-4 h-4" style={{ color: primaryColor }} />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">Hours</div>
                        <div className="text-sm text-white">{hours}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-4">Send a Message</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
                    />
                    <textarea
                      placeholder="How can we help?"
                      rows={3}
                      className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none"
                    />
                    <button
                      className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-all hover:shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-white/5" style={{ background: '#000' }} onClick={() => onSelectElement('footer')}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: primaryColor }}>
                    <Car className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{businessName}</span>
                </div>
                <p className="text-xs text-white/30">
                  © {new Date().getFullYear()} {businessName}. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
