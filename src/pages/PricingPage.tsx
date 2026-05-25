import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown, ArrowLeft } from 'lucide-react';
import Navigation from '../components/landing/Navigation';
import Footer from '../components/landing/Footer';

const plans = [
  {
    name: 'Starter',
    description: 'For freelancers getting started',
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: Sparkles,
    color: '#6b46c1',
    popular: false,
    features: [
      '50 AI website builds / month',
      '100 industry templates',
      'Google Maps URL input',
      'Existing website URL input',
      'Visual editor',
      'Custom domain + SSL',
      'Client preview links',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    description: 'For agencies scaling fast',
    monthlyPrice: 69,
    yearlyPrice: 57,
    icon: Zap,
    color: '#2563eb',
    popular: true,
    features: [
      'Unlimited AI website builds',
      '100 industry templates',
      'Google Maps URL input',
      'Existing website URL input',
      'Advanced visual editor',
      'Custom domain + SSL',
      'Client preview links',
      'Advanced analytics',
      'Code export (React + Tailwind)',
      'White-label option',
      'Priority support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Agency',
    description: 'For teams with high volume',
    monthlyPrice: 149,
    yearlyPrice: 124,
    icon: Crown,
    color: '#0891b2',
    popular: false,
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'API access',
      'Webhook integrations',
      'Custom template creation',
      'Dedicated account manager',
      'SLA guarantee',
      'SSO / SAML authentication',
      'Advanced team permissions',
      'Custom onboarding',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <Navigation scrolled={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
              Pricing
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
          >
            Simple Pricing,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Maximum Margins
            </span>
          </h1>
          <p className="text-base text-white/50 max-w-2xl mx-auto mb-8">
            Start free, scale as you grow. Every plan is designed to help you keep 80%+ of your revenue.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-white/40'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full transition-colors duration-300"
              style={{ background: isYearly ? '#6b46c1' : '#222' }}
            >
              <div
                className="absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300"
                style={{ left: isYearly ? '32px' : '4px' }}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-white/40'}`}>
              Yearly <span className="text-violet-400">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-violet-500/40 bg-gradient-to-b from-violet-500/10 to-transparent'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
                >
                  Most Popular
                </div>
              )}

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${plan.color}15` }}
              >
                <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-white/40 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-white/40 text-sm">/mo</span>
                {isYearly && (
                  <div className="text-xs text-violet-400 mt-1">
                    Billed annually (${plan.yearlyPrice * 12}/year)
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'text-white hover:shadow-lg hover:shadow-violet-500/25'
                    : 'border border-white/10 text-white hover:bg-white/5'
                }`}
                style={plan.popular ? { background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' } : {}}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Margin Breakdown */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Your Platform Cost', value: '$5-7/mo', desc: 'AI + hosting per site', color: '#6b46c1' },
            { label: 'Charge Client Build', value: '$500-5K', desc: 'One-time fee', color: '#2563eb' },
            { label: 'Charge Client Hosting', value: '$25-50/mo', desc: 'Recurring revenue', color: '#16a34a' },
            { label: 'Your Margin', value: '80%+', desc: 'Profit after costs', color: '#ea580c' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] text-center">
              <div className="text-xs text-white/30 uppercase tracking-wider mb-2">{item.label}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: item.color, fontFamily: 'Oswald, Inter, sans-serif' }}>
                {item.value}
              </div>
              <div className="text-xs text-white/30">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
