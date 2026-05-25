import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { industries } from '../../data/industries';
import {
    Globe,
  ExternalLink,
  Pencil,
  Download,
  Check,
  ArrowLeft,
  Rocket,
  Copy,
} from 'lucide-react';

interface PreviewLaunchProps {
  industryId: string | null;
  inputUrl: string;
  onLaunch: () => void;
  onBack: () => void;
}

export default function PreviewLaunch({ industryId, inputUrl, onLaunch, onBack }: PreviewLaunchProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState('');
  const industry = industries.find((i) => i.id === industryId);

  const previewUrl = `https://preview.siteforge.ai/p/${btoa(inputUrl).slice(0, 12)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    navigate('/editor/demo-project');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-medium text-green-300 tracking-wider uppercase">
            Ready to Launch
          </span>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'Oswald, Inter, sans-serif' }}
        >
          Your Website is Ready
        </h2>
        <p className="text-sm text-white/40">
          {industry?.name} website generated successfully. Preview, edit, or launch now.
        </p>
      </div>

      {/* Preview Frame */}
      <div className="mb-8 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white/30">
              <Globe className="w-3 h-3" />
              <span className="truncate">{previewUrl}</span>
              <button
                onClick={handleCopy}
                className="ml-auto p-1 rounded hover:bg-white/5 transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center overflow-hidden">
          <img
            src="/images/hero-website.jpg"
            alt="Website Preview"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Floating Stats */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className="liquid-glass px-3 py-1.5 rounded-lg">
              <div className="text-[10px] text-white/50 uppercase">Build Time</div>
              <div className="text-sm font-bold text-white">0:47</div>
            </div>
            <div className="liquid-glass px-3 py-1.5 rounded-lg">
              <div className="text-[10px] text-white/50 uppercase">Score</div>
              <div className="text-sm font-bold text-green-400">98/100</div>
            </div>
          </div>

          {/* Live Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">PREVIEW MODE</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <button
          onClick={handleEdit}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/[0.05] transition-all"
        >
          <Pencil className="w-4 h-4" />
          <span>Edit Design</span>
        </button>
        <button
          onClick={() => window.open(previewUrl, '_blank')}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/[0.05] transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Preview</span>
        </button>
        <button
          onClick={() => alert('Code export coming soon!')}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white font-medium text-sm hover:bg-white/[0.05] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Code</span>
        </button>
      </div>

      {/* Domain Connect */}
      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] mb-8">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-violet-400" />
          Connect Custom Domain
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yourbusiness.com"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
          <button
            onClick={() => alert('Domain connected! (Demo)')}
            className="px-5 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25"
            style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
          >
            Connect
          </button>
        </div>
        <p className="mt-2 text-xs text-white/30">
          Free SSL certificate included. DNS changes may take up to 24 hours to propagate.
        </p>
      </div>

      {/* Launch */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onLaunch}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
        >
          <Rocket className="w-4 h-4" />
          <span>Launch Website</span>
        </button>
      </div>
    </div>
  );
}
