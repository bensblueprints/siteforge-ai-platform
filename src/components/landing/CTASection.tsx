import { ArrowRight, Zap } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: '#000000' }}>
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <Zap className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
            Start Building Today
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6"
          style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
        >
          Every Day You Wait Is
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Money Left on the Table
          </span>
        </h2>

        <p className="text-base sm:text-lg text-white/50 mb-10 max-w-2xl mx-auto">
          Local businesses desperately need websites. They will pay $500-$5,000 for something you build in 60 seconds. Be the one who builds them. Join 10,000+ creators already earning.
        </p>

        <button
          onClick={onGetStarted}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
        >
          <span>Start Building Free</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-4 text-xs text-white/30">No credit card required. Free forever plan available.</p>
      </div>
    </section>
  );
}
