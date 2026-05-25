import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trpc } from '@/providers/trpc';
import EditorSidebar from '@/components/editor/EditorSidebar';
import EditorCanvas from '@/components/editor/EditorCanvas';
import { Menu, X, Monitor, Smartphone, Tablet, Save, Eye, ChevronLeft, Loader2 } from 'lucide-react';

export type EditorTab = 'sections' | 'style' | 'content' | 'settings';
export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function EditorPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const id = parseInt(projectId || '0', 10);

  const { data: project, isLoading } = trpc.scrape.getProject.useQuery(
    { id },
    { enabled: id > 0 }
  );
  const updateMutation = trpc.scrape.updateProject.useMutation({
    onSuccess: () => {
      utils.scrape.getProject.invalidate({ id });
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 1500);
    },
  });

  const [activeTab, setActiveTab] = useState<EditorTab>('sections');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const content = useMemo(() => ({
    businessName: project?.businessName || 'Your Business',
    tagline: project?.tagline || 'Your Tagline',
    description: project?.description || 'Your description.',
    services: Array.isArray(project?.services) ? project?.services as string[] : ['Service 1', 'Service 2', 'Service 3'],
    phone: project?.phone || '(555) 000-0000',
    email: project?.email || '',
    address: project?.address || '',
    hours: project?.hours || 'Mon-Fri 9AM-5PM',
    rating: project?.rating || '4.8',
    reviewCount: project?.reviewCount || '150',
    primaryColor: project?.primaryColor || '#6b46c1',
    secondaryColor: project?.secondaryColor || '#2563eb',
    accentColor: project?.accentColor || '#a78bfa',
    fontFamily: project?.fontFamily || 'Inter',
    rawText: project?.rawText || '',
  }), [project]);

  const sections = useMemo(() => {
    const s = project?.sections;
    if (Array.isArray(s)) {
      return (s as any[]).map((sec) => ({
        id: sec.id || String(Math.random()),
        type: sec.type || 'hero',
        name: sec.name || sec.type || 'Section',
        enabled: sec.enabled !== false,
        order: typeof sec.order === 'number' ? sec.order : 0,
        content: sec.content || {} as Record<string, any>,
      }));
    }
    return [];
  }, [project]);

  const updateContent = (field: string, value: string) => {
    if (!project) return;
    const currentServices = Array.isArray(project.services) ? project.services : [];
    let newServices = currentServices;

    if (field === 'services') {
      try { newServices = JSON.parse(value); } catch { /* keep current */ }
    }

    updateMutation.mutate({
      id: project.id,
      data: field === 'services'
        ? { services: newServices }
        : { [field]: value },
    });
  };

  const updateSections = (newSections: any[]) => {
    if (!project) return;
    updateMutation.mutate({ id: project.id, data: { sections: newSections } });
  };

  const toggleSection = (sectionId: string) => {
    const newSections = sections.map((s) =>
      s.id === sectionId ? { ...s, enabled: !s.enabled } : s
    );
    updateSections(newSections);
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const idx = sections.findIndex((s) => s.id === sectionId);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sections.length - 1) return;
    const newSections = [...sections];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    newSections.forEach((s, i) => { s.order = i; });
    updateSections(newSections);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: '#000' }}>
        <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ background: '#000' }}>
        <div className="text-center">
          <p className="text-white/40 mb-4">Project not found</p>
          <button onClick={() => navigate('/dashboard')} className="text-violet-400 hover:text-violet-300 text-sm">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: '#000000' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-white/5" style={{ background: '#111111' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <div className="h-5 w-px bg-white/10" />
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-white truncate max-w-[150px]">{project.name}</span>
          <span className="text-[10px] text-white/30 px-1.5 py-0.5 rounded bg-white/5">{project.industry}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-white/5">
          {(['desktop', 'tablet', 'mobile'] as DeviceView[]).map((d) => (
            <button key={d} onClick={() => setDeviceView(d)}
              className={`p-1.5 rounded-md transition-all ${deviceView === d ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}>
              {d === 'desktop' ? <Monitor className="w-4 h-4" /> : d === 'tablet' ? <Tablet className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 relative">
          {showSavedToast && (
            <div className="absolute -top-8 right-0 flex items-center gap-1 px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
              <Save className="w-3 h-3" /> Saved
            </div>
          )}
          <button onClick={() => navigate('/dashboard')} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/40 hover:text-white transition-all">Done</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}>
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {sidebarOpen && (
          <EditorSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            content={content}
            onContentChange={updateContent}
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            onToggleSection={toggleSection}
            onMoveSection={moveSection}
            onUpdateSections={updateSections}
          />
        )}
        <EditorCanvas
          deviceView={deviceView}
          content={content}
          sections={sections}
          selectedSectionId={selectedSectionId}
          onSelectSection={setSelectedSectionId}
        />
      </div>
    </div>
  );
}
