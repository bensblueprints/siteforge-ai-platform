import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '@/providers/trpc';
import { getIndustryById } from '@/data/industries';
import DashboardNav from '@/components/dashboard/DashboardNav';
import BuilderInput from '@/components/builder/BuilderInput';
import IndustrySelect from '@/components/builder/IndustrySelect';
import AIGeneration from '@/components/builder/AIGeneration';
import PreviewLaunch from '@/components/builder/PreviewLaunch';

export type BuilderStep = 'input' | 'industry' | 'generating' | 'preview';

export default function BuilderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<BuilderStep>('input');
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState<'maps' | 'website'>('maps');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('Preparing...');
  const [builtProject, setBuiltProject] = useState<any>(null);

  const buildMutation = trpc.scrape.build.useMutation({
    onSuccess: (data) => {
      setBuiltProject(data.project);
      setGenerationProgress(100);
      setGenerationStage('Complete!');
      setTimeout(() => setStep('preview'), 800);
    },
    onError: (err) => {
      console.error('Build error:', err);
      setGenerationStage('Error: ' + err.message);
      setGenerationProgress(100);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleInputSubmit = (url: string, type: 'maps' | 'website') => {
    setInputUrl(url);
    setInputType(type);
    setStep('industry');
  };

  const handleIndustrySelect = async (industryId: string) => {
    setSelectedIndustry(industryId);
    setStep('generating');
    setGenerationProgress(5);
    setGenerationStage('Launching browser...');

    const industry = getIndustryById(industryId);
    if (!industry) return;

    // Animate progress while the mutation runs
    const progressInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 90) { clearInterval(progressInterval); return p; }
        return p + Math.random() * 15 + 5;
      });
      setGenerationStage((s) => {
        if (s.includes('Error') || s === 'Complete!') return s;
        const stages = ['Fetching page...', 'Extracting data...', 'Parsing content...', 'Generating AI copy...', 'Building sections...', 'Saving project...'];
        return stages[Math.floor(Math.random() * stages.length)];
      });
    }, 800);

    try {
      await buildMutation.mutateAsync({
        url: inputUrl,
        inputType,
        industryId,
        industryName: industry.name,
        industryColor: industry.color,
      });
    } finally {
      clearInterval(progressInterval);
    }
  };

  const handleLaunch = () => {
    if (builtProject) {
      navigate(`/editor/${builtProject.id}`);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step === 'industry') setStep('input');
    else if (step === 'generating') setStep('industry');
    else if (step === 'preview') setStep('industry');
  };

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <DashboardNav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {[
              { key: 'input', label: 'Input' },
              { key: 'industry', label: 'Industry' },
              { key: 'generating', label: 'AI Build' },
              { key: 'preview', label: 'Launch' },
            ].map((s, i, arr) => {
              const stepOrder = ['input', 'industry', 'generating', 'preview'];
              const currentIndex = stepOrder.indexOf(step);
              const isActive = stepOrder.indexOf(s.key) <= currentIndex;
              const isCurrent = s.key === step;
              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isCurrent ? 'bg-violet-500 text-white' : isActive ? 'bg-violet-500/30 text-violet-300' : 'bg-white/5 text-white/30'
                    }`}>{i + 1}</div>
                    <span className={`text-xs mt-1.5 transition-colors ${isCurrent ? 'text-violet-400' : isActive ? 'text-white/50' : 'text-white/20'}`}>{s.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-12 sm:w-20 h-px mx-1 sm:mx-2 transition-colors ${stepOrder.indexOf(s.key) < currentIndex ? 'bg-violet-500/40' : 'bg-white/5'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-h-[500px]">
          {step === 'input' && <BuilderInput onSubmit={handleInputSubmit} />}
          {step === 'industry' && (
            <IndustrySelect onSelect={handleIndustrySelect} onBack={handleBack} inputUrl={inputUrl} inputType={inputType} />
          )}
          {step === 'generating' && (
            <AIGeneration progress={Math.min(generationProgress, 99)} industryId={selectedIndustry} stage={generationStage} />
          )}
          {step === 'preview' && builtProject && (
            <PreviewLaunch
              project={builtProject}
              onLaunch={handleLaunch}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
