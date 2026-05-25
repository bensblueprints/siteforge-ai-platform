import type { EditorTab } from '../../pages/EditorPage';
import {
  Layout,
  Palette,
  Type,
  Settings,
  ChevronRight,
  Monitor,
} from 'lucide-react';

interface EditorSidebarProps {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  websiteContent: any;
  onContentChange: (field: string, value: string) => void;
  selectedElement: string | null;
}

const tabs: { id: EditorTab; label: string; icon: React.ComponentType<any> }[] = [
  { id: 'elements', label: 'Elements', icon: Layout },
  { id: 'style', label: 'Style', icon: Palette },
  { id: 'content', label: 'Content', icon: Type },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function EditorSidebar({
  activeTab,
  onTabChange,
  websiteContent,
  onContentChange,
  selectedElement,
}: EditorSidebarProps) {
  return (
    <div className="w-72 flex flex-col border-r border-white/5" style={{ background: '#111111' }}>
      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-white/30 hover:text-white/60'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'elements' && <ElementsPanel selectedElement={selectedElement} />}
        {activeTab === 'style' && <StylePanel websiteContent={websiteContent} onContentChange={onContentChange} />}
        {activeTab === 'content' && <ContentPanel websiteContent={websiteContent} onContentChange={onContentChange} />}
        {activeTab === 'settings' && <SettingsPanel />}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}

function ElementsPanel({ selectedElement }: { selectedElement: string | null }) {
  const sections = [
    { id: 'hero', label: 'Hero Section', icon: Monitor },
    { id: 'services', label: 'Services', icon: Layout },
    { id: 'about', label: 'About Us', icon: Type },
    { id: 'testimonials', label: 'Testimonials', icon: Type },
    { id: 'gallery', label: 'Photo Gallery', icon: Layout },
    { id: 'contact', label: 'Contact Section', icon: Settings },
    { id: 'footer', label: 'Footer', icon: Settings },
  ];

  const elements = [
    { id: 'button', label: 'Button', icon: 'button' },
    { id: 'heading', label: 'Heading', icon: 'heading' },
    { id: 'text', label: 'Text Block', icon: 'text' },
    { id: 'image', label: 'Image', icon: 'image' },
    { id: 'card', label: 'Card', icon: 'card' },
    { id: 'form', label: 'Contact Form', icon: 'form' },
  ];

  return (
    <div className="space-y-6">
      {/* Sections */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Page Sections</h3>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedElement === section.id
                  ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{section.label}</span>
              <ChevronRight className="w-3 h-3 opacity-30" />
            </button>
          ))}
        </div>
      </div>

      {/* Elements */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Elements</h3>
        <div className="grid grid-cols-2 gap-2">
          {elements.map((el) => (
            <button
              key={el.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center">
                <Layout className="w-4 h-4 text-white/40" />
              </div>
              <span className="text-xs text-white/50">{el.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StylePanel({ websiteContent, onContentChange }: { websiteContent: any; onContentChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Brand Colors</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={websiteContent.primaryColor}
                onChange={(e) => onContentChange('primaryColor', e.target.value)}
                className="w-8 h-8 rounded-lg border-none cursor-pointer"
              />
              <input
                type="text"
                value={websiteContent.primaryColor}
                onChange={(e) => onContentChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Secondary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={websiteContent.secondaryColor}
                onChange={(e) => onContentChange('secondaryColor', e.target.value)}
                className="w-8 h-8 rounded-lg border-none cursor-pointer"
              />
              <input
                type="text"
                value={websiteContent.secondaryColor}
                onChange={(e) => onContentChange('secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Typography</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Font Family</label>
            <select
              value={websiteContent.fontFamily}
              onChange={(e) => onContentChange('fontFamily', e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50"
            >
              <option value="Inter">Inter</option>
              <option value="Oswald">Oswald</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Background */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Background</h3>
        <div className="grid grid-cols-3 gap-2">
          {['#000000', '#111111', '#ffffff', '#f5f5f5', '#1a1a2e', '#16213e'].map((color) => (
            <button
              key={color}
              onClick={() => onContentChange('backgroundColor', color)}
              className="w-full h-10 rounded-lg border border-white/10 transition-transform hover:scale-105"
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentPanel({ websiteContent, onContentChange }: { websiteContent: any; onContentChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Business Name</label>
        <input
          type="text"
          value={websiteContent.businessName}
          onChange={(e) => onContentChange('businessName', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Tagline</label>
        <input
          type="text"
          value={websiteContent.tagline}
          onChange={(e) => onContentChange('tagline', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Description</label>
        <textarea
          value={websiteContent.description}
          onChange={(e) => onContentChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50 resize-none"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Phone</label>
        <input
          type="text"
          value={websiteContent.phone}
          onChange={(e) => onContentChange('phone', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Email</label>
        <input
          type="text"
          value={websiteContent.email}
          onChange={(e) => onContentChange('email', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Address</label>
        <input
          type="text"
          value={websiteContent.address}
          onChange={(e) => onContentChange('address', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
      <div>
        <label className="text-xs text-white/40 mb-1.5 block">Business Hours</label>
        <input
          type="text"
          value={websiteContent.hours}
          onChange={(e) => onContentChange('hours', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500/50"
        />
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">SEO Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Page Title</label>
            <input
              type="text"
              placeholder="Elite Auto Repair | Austin TX"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">Meta Description</label>
            <textarea
              placeholder="Premium auto repair services in Austin..."
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Social Links</h3>
        <div className="space-y-3">
          {['Facebook', 'Instagram', 'Twitter', 'Yelp'].map((platform) => (
            <div key={platform}>
              <label className="text-xs text-white/40 mb-1.5 block">{platform}</label>
              <input
                type="text"
                placeholder={`https://${platform.toLowerCase()}.com/...`}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Analytics</h3>
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Google Analytics ID</label>
          <input
            type="text"
            placeholder="G-XXXXXXXXXX"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
          />
        </div>
      </div>
    </div>
  );
}
