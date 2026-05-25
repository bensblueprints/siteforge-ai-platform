import type { EditorTab } from '../../pages/EditorPage';
import type { WebsiteContent, PageSection } from '../../store/useStore';
import {
  Layout, Palette, Type, Settings, ChevronUp, ChevronDown,
  Eye, EyeOff, Plus, Trash2, GripVertical,
} from 'lucide-react';

const tabs: { id: EditorTab; label: string; icon: React.ComponentType<any> }[] = [
  { id: 'sections', label: 'Sections', icon: Layout },
  { id: 'style', label: 'Style', icon: Palette },
  { id: 'content', label: 'Content', icon: Type },
  { id: 'settings', label: 'SEO', icon: Settings },
];

const availableSections: PageSection[] = [
  { id: 'add-hero', type: 'hero', name: 'Hero Banner', enabled: true, order: 0, content: {} },
  { id: 'add-services', type: 'services', name: 'Services Grid', enabled: true, order: 0, content: {} },
  { id: 'add-about', type: 'about', name: 'About Us', enabled: true, order: 0, content: {} },
  { id: 'add-testimonials', type: 'testimonials', name: 'Testimonials', enabled: true, order: 0, content: {} },
  { id: 'add-gallery', type: 'gallery', name: 'Photo Gallery', enabled: true, order: 0, content: {} },
  { id: 'add-contact', type: 'contact', name: 'Contact Form', enabled: true, order: 0, content: {} },
  { id: 'add-team', type: 'team', name: 'Team Members', enabled: true, order: 0, content: {} },
  { id: 'add-faq', type: 'faq', name: 'FAQ Section', enabled: true, order: 0, content: {} },
  { id: 'add-cta', type: 'cta', name: 'Call to Action', enabled: true, order: 0, content: {} },
  { id: 'add-map', type: 'map', name: 'Google Map', enabled: true, order: 0, content: {} },
];

interface Props {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  content: WebsiteContent;
  onContentChange: (field: string, value: string) => void;
  sections: PageSection[];
  selectedSectionId: string | null;
  onSelectSection: (id: string | null) => void;
  onToggleSection: (id: string) => void;
  onMoveSection: (id: string, dir: 'up' | 'down') => void;
  onUpdateSections: (sections: PageSection[]) => void;
}

export default function EditorSidebar({
  activeTab, onTabChange, content, onContentChange,
  sections, selectedSectionId, onSelectSection,
  onToggleSection, onMoveSection, onUpdateSections,
}: Props) {
  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  const addSection = (template: PageSection) => {
    const newSection: PageSection = {
      ...template,
      id: `${template.type}-${Date.now()}`,
      order: sections.length,
    };
    onUpdateSections([...sections, newSection]);
    onSelectSection(newSection.id);
  };

  const removeSection = (id: string) => {
    onUpdateSections(sections.filter((s) => s.id !== id));
    if (selectedSectionId === id) onSelectSection(null);
  };

  return (
    <div className="w-72 flex flex-col border-r border-white/5" style={{ background: '#111111' }}>
      <div className="flex border-b border-white/5">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all ${
              activeTab === tab.id ? 'text-violet-400 border-b-2 border-violet-400' : 'text-white/30 hover:text-white/60'
            }`}>
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'sections' && (
          <SectionsPanel
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={onSelectSection}
            onToggleSection={onToggleSection}
            onMoveSection={onMoveSection}
            onRemoveSection={removeSection}
            onAddSection={addSection}
          />
        )}
        {activeTab === 'style' && <StylePanel content={content} onContentChange={onContentChange} />}
        {activeTab === 'content' && (
          <ContentPanel
            content={content}
            onContentChange={onContentChange}
            selectedSection={selectedSection}
          />
        )}
        {activeTab === 'settings' && <SettingsPanel content={content} onContentChange={onContentChange} />}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </div>
  );
}

function SectionsPanel({
  sections, selectedSectionId, onSelectSection, onToggleSection, onMoveSection, onRemoveSection, onAddSection,
}: {
  sections: PageSection[]; selectedSectionId: string | null;
  onSelectSection: (id: string) => void; onToggleSection: (id: string) => void;
  onMoveSection: (id: string, dir: 'up' | 'down') => void; onRemoveSection: (id: string) => void;
  onAddSection: (template: PageSection) => void;
}) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Page Sections</h3>
          <button onClick={() => setShowAdd(!showAdd)} className="p-1 rounded hover:bg-white/5 text-violet-400 transition-all">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {showAdd && (
          <div className="mb-4 p-3 rounded-lg border border-white/5 bg-white/[0.02] space-y-1">
            <p className="text-[10px] text-white/30 mb-2">Click to add a section</p>
            {availableSections
              .filter((a) => !sections.some((s) => s.type === a.type))
              .map((section) => (
                <button key={section.id} onClick={() => { onAddSection(section); setShowAdd(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-white/60 hover:text-white hover:bg-white/5 transition-all text-left">
                  <Plus className="w-3 h-3 text-violet-400" />
                  {section.name}
                </button>
              ))}
            {availableSections.filter((a) => !sections.some((s) => s.type === a.type)).length === 0 && (
              <p className="text-xs text-white/20">All sections added</p>
            )}
          </div>
        )}

        <div className="space-y-1">
          {[...sections].sort((a, b) => a.order - b.order).map((section, idx, arr) => (
            <div
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all ${
                selectedSectionId === section.id
                  ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <GripVertical className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              <span className="flex-1 text-xs">{section.name}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); onMoveSection(section.id, 'up'); }}
                  className="p-0.5 rounded hover:bg-white/10 text-white/30 hover:text-white" disabled={idx === 0}>
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onMoveSection(section.id, 'down'); }}
                  className="p-0.5 rounded hover:bg-white/10 text-white/30 hover:text-white" disabled={idx === arr.length - 1}>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onToggleSection(section.id); }}
                className={`p-0.5 rounded hover:bg-white/10 transition-colors ${section.enabled ? 'text-green-400' : 'text-white/20'}`}>
                {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              {arr.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); onRemoveSection(section.id); }}
                  className="p-0.5 rounded hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedSectionId && (
        <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Section Info</p>
          <p className="text-xs text-white/50">
            Click on a section above to select it. Use the <strong className="text-white">Content</strong> tab to edit its text.
          </p>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

function StylePanel({ content, onContentChange }: { content: WebsiteContent; onContentChange: (f: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Brand Colors</h3>
        {[
          { label: 'Primary', field: 'primaryColor', value: content.primaryColor },
          { label: 'Secondary', field: 'secondaryColor', value: content.secondaryColor },
          { label: 'Accent', field: 'accentColor', value: content.accentColor },
        ].map((c) => (
          <div key={c.field} className="mb-3">
            <label className="text-xs text-white/40 mb-1 block">{c.label}</label>
            <div className="flex items-center gap-2">
              <input type="color" value={c.value}
                onChange={(e) => onContentChange(c.field, e.target.value)}
                className="w-8 h-8 rounded-lg border-none cursor-pointer flex-shrink-0" />
              <input type="text" value={c.value}
                onChange={(e) => onContentChange(c.field, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Typography</h3>
        <label className="text-xs text-white/40 mb-1 block">Font Family</label>
        <select value={content.fontFamily}
          onChange={(e) => onContentChange('fontFamily', e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50">
          {['Inter', 'Oswald', 'Playfair Display', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans'].map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Preview</h3>
        <div className="p-4 rounded-lg border border-white/5" style={{ background: content.primaryColor }}>
          <p className="text-xs text-white/80" style={{ fontFamily: content.fontFamily }}>Primary Color</p>
        </div>
        <div className="p-4 rounded-lg border border-white/5 mt-2" style={{ background: content.secondaryColor }}>
          <p className="text-xs text-white/80" style={{ fontFamily: content.fontFamily }}>Secondary Color</p>
        </div>
      </div>
    </div>
  );
}

function ContentPanel({ content, onContentChange, selectedSection }: { content: WebsiteContent; onContentChange: (f: string, v: string) => void; selectedSection?: PageSection }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Business Info</h3>
        {[
          { label: 'Business Name', field: 'businessName', type: 'text', placeholder: 'Your Business Name' },
          { label: 'Tagline', field: 'tagline', type: 'text', placeholder: 'Your catchy tagline' },
          { label: 'Phone', field: 'phone', type: 'text', placeholder: '(555) 000-0000' },
          { label: 'Email', field: 'email', type: 'email', placeholder: 'contact@example.com' },
          { label: 'Address', field: 'address', type: 'text', placeholder: '123 Main St, City, ST' },
          { label: 'Hours', field: 'hours', type: 'text', placeholder: 'Mon-Fri 9AM-5PM' },
        ].map((f) => (
          <div key={f.field} className="mb-3">
            <label className="text-xs text-white/40 mb-1 block">{f.label}</label>
            <input type={f.type} value={(content as any)[f.field] || ''}
              onChange={(e) => onContentChange(f.field, e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50" />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Description</h3>
        <textarea value={content.description}
          onChange={(e) => onContentChange('description', e.target.value)}
          rows={4}
          placeholder="Describe your business..."
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none" />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Services</h3>
        {content.services.map((service, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input type="text" value={service}
              onChange={(e) => {
                const newServices = [...content.services];
                newServices[i] = e.target.value;
                onContentChange('services', JSON.stringify(newServices));
              }}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50" />
          </div>
        ))}
      </div>

      {selectedSection && (
        <div className="p-3 rounded-lg border border-violet-500/20 bg-violet-500/5">
          <p className="text-[10px] text-violet-300 uppercase tracking-wider mb-1">Active Section</p>
          <p className="text-sm font-medium text-white">{selectedSection.name}</p>
          <p className="text-xs text-white/40 mt-1">
            Editing content above will update this section in real-time.
          </p>
        </div>
      )}
    </div>
  );
}

function SettingsPanel({ content, onContentChange }: { content: WebsiteContent; onContentChange: (f: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">SEO Metadata</h3>
        <div className="mb-3">
          <label className="text-xs text-white/40 mb-1 block">Page Title</label>
          <input type="text" value={content.businessName}
            onChange={(e) => onContentChange('businessName', e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50" />
        </div>
        <div className="mb-3">
          <label className="text-xs text-white/40 mb-1 block">Meta Description</label>
          <textarea value={content.description}
            onChange={(e) => onContentChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-violet-500/50 resize-none" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Social & Tracking</h3>
        {['Facebook', 'Instagram', 'Twitter', 'Yelp', 'Google Analytics ID'].map((label) => (
          <div key={label} className="mb-3">
            <label className="text-xs text-white/40 mb-1 block">{label}</label>
            <input type="text" placeholder={`Enter ${label} URL or ID...`}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50" />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Business Stats</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
            <p className="text-lg font-bold text-yellow-400">{content.rating}</p>
            <p className="text-[10px] text-white/30">Avg Rating</p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
            <p className="text-lg font-bold text-violet-400">{content.reviewCount}</p>
            <p className="text-[10px] text-white/30">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
