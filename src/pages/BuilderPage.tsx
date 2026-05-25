import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getIndustryById } from '../data/industries';
import { scrapeUrl, enhanceScrapedData } from '../services/scraper';
import DashboardNav from '../components/dashboard/DashboardNav';
import BuilderInput from '../components/builder/BuilderInput';
import IndustrySelect from '../components/builder/IndustrySelect';
import AIGeneration from '../components/builder/AIGeneration';
import PreviewLaunch from '../components/builder/PreviewLaunch';

export type BuilderStep = 'input' | 'industry' | 'generating' | 'preview';

function createDefaultSections(industryId: string) {
  const industry = getIndustryById(industryId);
  const sectionTypes = industry?.sections || ['hero', 'services', 'about', 'testimonials', 'contact'];
  
  return sectionTypes.map((type, i) => ({
    id: `section-${type}`,
    type,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    enabled: true,
    order: i,
    content: {},
  }));
}

export default function BuilderPage() {
  const navigate = useNavigate();
  const { addProject } = useStore();
  const [step, setStep] = useState<BuilderStep>('input');
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState<'maps' | 'website'>('maps');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('Preparing...');
  const [, setScrapedData] = useState<any>(null);

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
    setGenerationProgress(0);
    setGenerationStage('Connecting to source...');

    try {
      // Stage 1: Fetch
      setGenerationProgress(10);
      setGenerationStage('Fetching page data...');
      const rawData = await scrapeUrl(inputUrl);
      
      // Stage 2: Parse
      setGenerationProgress(40);
      setGenerationStage('Extracting business information...');
      
      // Stage 3: Enhance
      setGenerationProgress(60);
      setGenerationStage('Applying industry template...');
      const enhanced = enhanceScrapedData(rawData, industryId);
      setScrapedData(enhanced);
      
      // Stage 4: Build sections
      setGenerationProgress(80);
      setGenerationStage('Building page sections...');
      const sections = createDefaultSections(industryId);
      
      // Stage 5: Save project
      setGenerationProgress(95);
      setGenerationStage('Finalizing...');
      
      const industry = getIndustryById(industryId);
      const project = {
        id: `proj-${Date.now()}`,
        name: enhanced.businessName || industry?.name || 'New Website',
        industry: industry?.name || 'Custom',
        industryId,
        status: 'ready' as const,
        url: undefined,
        inputUrl,
        inputType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preview: '/images/hero-website.jpg',
        content: {
          businessName: enhanced.businessName,
          tagline: enhanced.tagline,
          description: enhanced.description,
          services: enhanced.services,
          phone: enhanced.phone,
          email: enhanced.email,
          address: enhanced.address,
          hours: enhanced.hours,
          rating: enhanced.rating,
          reviewCount: enhanced.reviewCount,
          primaryColor: industry?.color || '#6b46c1',
          secondaryColor: '#2563eb',
          accentColor: '#a78bfa',
          fontFamily: 'Inter',
          rawText: enhanced.rawText || '',
        },
        sections,
      };
      
      addProject(project);
      
      setGenerationProgress(100);
      setGenerationStage('Complete!');
      
      setTimeout(() => {
        setStep('preview');
      }, 600);
      
    } catch (err: any) {
      console.error('Scraping error:', err);
      setGenerationStage('Error: ' + (err.message || 'Failed to fetch data'));
      // Still show preview with fallback data after a delay
      setTimeout(() => {
        const fallback = enhanceScrapedData(
          { businessName: 'Your Business', tagline: '', description: '', phone: '', email: '', address: '', hours: '', services: [], images: [], rating: '4.8', reviewCount: '150', website: inputUrl, category: '', rawText: '' },
          industryId
        );
        setScrapedData(fallback);
        const industry = getIndustryById(industryId);
        const sections = createDefaultSections(industryId);
        addProject({
          id: `proj-${Date.now()}`,
          name: fallback.businessName || industry?.name || 'New Website',
          industry: industry?.name || 'Custom',
          industryId,
          status: 'ready' as const,
          url: undefined,
          inputUrl,
          inputType,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          preview: '/images/hero-website.jpg',
          content: {
            businessName: fallback.businessName,
            tagline: fallback.tagline,
            description: fallback.description,
            services: fallback.services,
            phone: fallback.phone,
            email: fallback.email,
            address: fallback.address,
            hours: fallback.hours,
            rating: fallback.rating,
            reviewCount: fallback.reviewCount,
            primaryColor: industry?.color || '#6b46c1',
            secondaryColor: '#2563eb',
            accentColor: '#a78bfa',
            fontFamily: 'Inter',
            rawText: '',
          },
          sections,
        });
        setGenerationProgress(100);
        setTimeout(() => setStep('preview'), 500);
      }, 2000);
    }
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
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        isCurrent ? 'bg-violet-500 text-white' : isActive ? 'bg-violet-500/30 text-violet-300' : 'bg-white/5 text-white/30'
                      }`}
                    >{i + 1}</div>
                    <span className={`text-xs mt-1.5 transition-colors ${isCurrent ? 'text-violet-400' : isActive ? 'text-white/50' : 'text-white/20'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`w-12 sm:w-20 h-px mx-1 sm:mx-2 transition-colors ${stepOrder.indexOf(s.key) < currentIndex ? 'bg-violet-500/40' : 'bg-white/5'}`} />
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
            <IndustrySelect onSelect={handleIndustrySelect} onBack={handleBack} inputUrl={inputUrl} inputType={inputType} />
          )}
          {step === 'generating' && (
            <AIGeneration progress={generationProgress} industryId={selectedIndustry} stage={generationStage} />
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
