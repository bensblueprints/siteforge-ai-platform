import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the Google Maps website builder work?',
    answer: 'Simply paste a Google Maps business listing URL into our platform. Our AI scraper extracts the business name, address, phone number, hours, photos, reviews, services, and description. It then matches this data to one of our 100+ industry-specific templates and generates a complete, professional website in under 60 seconds.',
  },
  {
    question: 'Can I use an existing website URL instead?',
    answer: 'Absolutely. Paste any existing website URL and our AI will analyze its structure, extract all content, images, and styling preferences, then rebuild it as a modern, optimized website using our platform. This is perfect for redesigning outdated client sites.',
  },
  {
    question: 'How do I achieve 80% margins?',
    answer: 'Your hard cost per website is approximately $5-7 (AI generation + hosting). The market rate for business websites is $500-$5,000 for the build plus $25-50/month for hosting. Charging $1,500 for the build + $25/mo hosting gives you a 99.5% margin on the build and 80%+ recurring margin on hosting.',
  },
  {
    question: 'Do I need coding skills?',
    answer: 'Not at all. SiteForge AI is built for non-technical users. The entire process — from URL input to deployment — is automated. Our visual editor lets you customize everything with drag-and-drop simplicity. No HTML, CSS, or JavaScript knowledge required.',
  },
  {
    question: 'Can I export the website code?',
    answer: 'Yes! On Professional and Agency plans, you can export your website as clean, well-structured React + Tailwind CSS code. This means you own everything you build and can host it anywhere. No vendor lock-in, ever.',
  },
  {
    question: 'What industries are supported?',
    answer: 'We support 100+ industries across 20 categories including Home Services (plumbing, HVAC, roofing), Professional Services (accounting, consulting, marketing), Health & Wellness (chiropractic, massage, yoga), Food & Beverage (restaurants, cafes, catering), Retail, Automotive, Beauty, Fitness, Education, Technology, and many more.',
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes! Our free plan lets you build 3 websites with basic features, SiteForge branding, and a subdomain. It is perfect for testing the platform. Upgrade anytime to remove branding, connect custom domains, and unlock unlimited builds.',
  },
  {
    question: 'How does client billing work?',
    answer: 'You bill your clients directly — we never interfere. Set your own prices for website builds ($500-$5,000+) and monthly hosting ($25-$50/mo). Use our built-in invoicing tool or your own payment processor. All revenue is yours to keep.',
  },
  {
    question: 'What is included with hosting?',
    answer: 'Every website includes fast global CDN hosting, free SSL certificate, automatic backups, DDoS protection, 99.9% uptime guarantee, unlimited bandwidth, and custom domain support. We handle all the technical infrastructure so you can focus on selling.',
  },
  {
    question: 'How is this different from SiteDrop?',
    answer: 'SiteForge AI offers three unique advantages: (1) Dual input — we support BOTH Google Maps URLs AND existing website URLs, (2) 100 industry-specific templates with exact sections each business needs, (3) Superior pricing with an 80% margin model built in. Plus code export, white-label options, and a more powerful visual editor.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32" style={{ background: '#000000' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
          >
            Questions,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Answered
            </span>
          </h2>
          <p className="text-base text-white/50">
            Everything you need to know about building your web agency with SiteForge AI.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? '300px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
