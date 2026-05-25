import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import EditorSidebar from '../components/editor/EditorSidebar';
import EditorCanvas from '../components/editor/EditorCanvas';
import { Menu, X, Monitor, Smartphone, Tablet, Save, Undo, Redo, Eye } from 'lucide-react';

export type EditorTab = 'elements' | 'style' | 'content' | 'settings';
export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export default function EditorPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useStore();
  const [activeTab, setActiveTab] = useState<EditorTab>('elements');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Website content state
  const [websiteContent, setWebsiteContent] = useState({
    businessName: 'Elite Auto Repair',
    tagline: 'Premium Auto Care You Can Trust',
    description: 'Full-service auto repair shop specializing in domestic and foreign vehicles. From oil changes to engine rebuilds, our certified technicians have you covered.',
    phone: '(512) 555-0142',
    email: 'service@eliteauto.com',
    address: '123 Main Street, Austin, TX 78701',
    hours: 'Mon-Fri: 8AM-6PM | Sat: 9AM-4PM',
    primaryColor: '#6b46c1',
    secondaryColor: '#2563eb',
    fontFamily: 'Inter',
  });

  const project = projects.find((p) => p.id === projectId) || {
    id: 'demo',
    name: 'Demo Project',
    industry: 'Auto Repair Shop',
    status: 'ready' as const,
  };

  const handleContentChange = (field: string, value: string) => {
    setWebsiteContent((prev) => {
      const next = { ...prev, [field]: value };
      // Add to history
      setHistory((h) => [...h.slice(0, historyIndex + 1), next]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setWebsiteContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setWebsiteContent(history[historyIndex + 1]);
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: '#000000' }}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-white/5" style={{ background: '#111111' }}>
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <div className="h-5 w-px bg-white/10" />
          <span className="text-sm font-medium text-white truncate max-w-[150px]">{project.name}</span>
          <span className="text-xs text-white/30 px-2 py-0.5 rounded bg-white/5">{project.industry}</span>
        </div>

        {/* Center - Device Switcher */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-white/5">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded-md transition-all ${deviceView === 'desktop' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded-md transition-all ${deviceView === 'tablet' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded-md transition-all ${deviceView === 'mobile' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
          <div className="h-5 w-px bg-white/10 mx-1" />
          <button
            onClick={() => alert('Preview saved!')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={() => alert('Opening preview...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
            style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white/40 hover:text-white transition-all"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <EditorSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            websiteContent={websiteContent}
            onContentChange={handleContentChange}
            selectedElement={selectedElement}
          />
        )}

        {/* Canvas */}
        <EditorCanvas
          deviceView={deviceView}
          websiteContent={websiteContent}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
        />
      </div>
    </div>
  );
}
