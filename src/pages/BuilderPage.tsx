import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { industries } from '../data/industries';
import DashboardNav from '../components/dashboard/DashboardNav';
import BuilderInput from '../components/builder/BuilderInput';
import IndustrySelect from '../components/builder/IndustrySelect';
import AIGeneration from '../components/builder/AIGeneration';
import PreviewLaunch from '../components/builder/PreviewLaunch';

export type BuilderStep = 'input' | 'industry' | 'generating' | 'preview';

export default function BuilderPage() {
  const navigate = useNavigate();
  const { addProject } = useStore();
  const [step, setStep] = useState<BuilderStep>('input');
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState<'maps' | 'website'>('maps');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const builderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  const handleInputSubmit = (url: string, type: 'maps' | 'website') => {
    setInputUrl(url);
    setInputType(type);
    setStep('industry');
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setStep('generating');
    
    // Simulate AI generation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStep('preview');
          // Create project
          const industry = industries.find((i) => i.id === industryId);
          addProject({
            id: `proj-${Date.now()}`,
            name: industry?.name || 'New Website',
            industry: industry?.name || 'Custom',
            status: 'ready',
            createdAt: new Date(),
            updatedAt: new Date(),
            preview: '/images/hero-website.jpg',
          });
        }, 500);
      }
      setGenerationProgress(Math.min(progress, 100));
    }, 400);
  };

  const handleLaunch = () => {
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (step === 'industry') setStep('input');
    else if (step === 'generating') setStep('industry');
    else if (step === 'preview') setStep('industry');
  };

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <DashboardNav />
      <div ref={builderRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        isCurrent
                          ? 'bg-violet-500 text-white'
                          : isActive
                          ? 'bg-violet-500/30 text-violet-300'
                          : 'bg-white/5 text-white/30'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-xs mt-1.5 transition-colors ${
                        isCurrent ? 'text-violet-400' : isActive ? 'text-white/50' : 'text-white/20'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-px mx-1 sm:mx-2 transition-colors ${
                        stepOrder.indexOf(s.key) < currentIndex ? 'bg-violet-500/40' : 'bg-white/5'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[500px]">
          {step === 'input' && <BuilderInput onSubmit={handleInputSubmit} />}
          {step === 'industry' && (
            <IndustrySelect
              onSelect={handleIndustrySelect}
              onBack={handleBack}
              inputUrl={inputUrl}
              inputType={inputType}
            />
          )}
          {step === 'generating' && (
            <AIGeneration progress={generationProgress} industryId={selectedIndustry} />
          )}
          {step === 'preview' && (
            <PreviewLaunch
              industryId={selectedIndustry}
              inputUrl={inputUrl}
              onLaunch={handleLaunch}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
