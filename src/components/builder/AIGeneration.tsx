import { useMemo } from 'react';
import { industries } from '../../data/industries';
import { Sparkles, Globe, Bot, Layers, Palette, Rocket, Search, AlertCircle } from 'lucide-react';

interface AIGenerationProps {
  progress: number;
  industryId: string | null;
  stage: string;
}

const stages = [
  { icon: Search, label: 'Scanning source...', threshold: 15 },
  { icon: Globe, label: 'Fetching page data...', threshold: 25 },
  { icon: Bot, label: 'Extracting business data...', threshold: 50 },
  { icon: Layers, label: 'Matching industry template...', threshold: 65 },
  { icon: Palette, label: 'Generating design & content...', threshold: 80 },
  { icon: Sparkles, label: 'Optimizing for conversions...', threshold: 95 },
  { icon: Rocket, label: 'Finalizing...', threshold: 100 },
];

export default function AIGeneration({ progress, industryId, stage }: AIGenerationProps) {
  const industry = useMemo(() => {
    if (!industryId) return null;
    return industries.find((i) => i.id === industryId);
  }, [industryId]);

  const hasError = stage.toLowerCase().includes('error');
  const currentStage = stages.find((s) => progress <= s.threshold) || stages[stages.length - 1];
  const CurrentIcon = hasError ? AlertCircle : currentStage.icon;

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <div className="mb-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${hasError ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
          {hasError ? <AlertCircle className="w-3.5 h-3.5 text-red-400" /> : <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />}
          <span className={`text-xs font-medium tracking-wider uppercase ${hasError ? 'text-red-300' : 'text-violet-300'}`}>
            {hasError ? 'Issue Detected' : 'AI Building'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Oswald, Inter, sans-serif' }}>
          {hasError ? 'Using Fallback Data' : 'Building Your Website'}
        </h2>
        <p className="text-sm text-white/40">
          {industry?.name ? `Creating a ${industry.name} website.` : 'Creating your website.'} {stage}
        </p>
      </div>

      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-violet-500/10 animate-pulse" />
        <div className={`relative w-full h-full rounded-full flex items-center justify-center border ${hasError ? 'bg-red-500/10 border-red-500/20' : 'bg-gradient-to-br from-violet-500/30 to-blue-500/30 border-violet-500/20'}`}>
          <CurrentIcon className={`w-10 h-10 ${hasError ? 'text-red-400' : 'text-violet-400'}`} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-white/30 mb-2">
          <span>{stage}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: hasError
                ? 'linear-gradient(90deg, #dc2626 0%, #f87171 100%)'
                : 'linear-gradient(90deg, #6b46c1 0%, #2563eb 100%)',
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isComplete = progress > s.threshold || (i === stages.length - 1 && progress >= 100);
          const isActive = s.threshold === currentStage.threshold && !hasError;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                isComplete ? 'text-green-400 bg-green-500/5' : isActive ? 'text-violet-400 bg-violet-500/5' : 'text-white/20'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
              <span>{s.label}</span>
              {isComplete && (
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {industry && (
        <div className="mt-8 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="text-xs text-white/30 uppercase tracking-wider mb-3">Template Sections</div>
          <div className="flex flex-wrap gap-2">
            {industry.sections.map((section) => (
              <span key={section} className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/50 capitalize">{section}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
