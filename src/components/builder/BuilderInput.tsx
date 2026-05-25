import { useState } from 'react';
import { MapPin, Globe, ArrowRight, Sparkles } from 'lucide-react';

interface BuilderInputProps {
  onSubmit: (url: string, type: 'maps' | 'website') => void;
}

export default function BuilderInput({ onSubmit }: BuilderInputProps) {
  const [mapsUrl, setMapsUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'maps' | 'website'>('maps');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const url = activeTab === 'maps' ? mapsUrl : websiteUrl;
    if (!url.trim()) {
      setError(`Please enter a ${activeTab === 'maps' ? 'Google Maps' : 'website'} URL`);
      return;
    }
    setError('');
    onSubmit(url, activeTab);
  };

  const handleQuickStart = (type: 'maps' | 'website', demoUrl: string) => {
    setError('');
    onSubmit(demoUrl, type);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-violet-300 tracking-wider uppercase">
            Step 1
          </span>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
        >
          Paste Your URL
        </h2>
        <p className="text-sm text-white/40">
          Enter a Google Maps listing or existing website URL to begin.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-white/5 bg-white/[0.02] p-1 mb-6">
        <button
          onClick={() => { setActiveTab('maps'); setError(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'maps'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/20'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Google Maps
        </button>
        <button
          onClick={() => { setActiveTab('website'); setError(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'website'
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/20'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Globe className="w-4 h-4" />
          Website URL
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <div className="relative">
          {activeTab === 'maps' ? (
            <>
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="text"
                value={mapsUrl}
                onChange={(e) => { setMapsUrl(e.target.value); setError(''); }}
                placeholder="https://maps.google.com/?q=..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </>
          ) : (
            <>
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => { setWebsiteUrl(e.target.value); setError(''); }}
                placeholder="https://example.com"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </>
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-400">{error}</p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02]"
        style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Quick Start Examples */}
      <div className="mt-8">
        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Quick Start (Demo)</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickStart('maps', 'https://maps.google.com/?q=Elite+Auto+Repair+Austin+TX')}
            className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Elite Auto Repair</div>
              <div className="text-xs text-white/30">Google Maps Listing</div>
            </div>
          </button>
          <button
            onClick={() => handleQuickStart('website', 'https://example-restaurant.com')}
            className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Restaurant Website</div>
              <div className="text-xs text-white/30">Existing Website URL</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
