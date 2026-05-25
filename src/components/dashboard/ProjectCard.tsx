import { Globe, Clock, FileText, ExternalLink, Pencil } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    industry: string;
    status: 'draft' | 'generating' | 'ready' | 'published';
    url?: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    preview?: string;
  };
  onEdit: () => void;
}

const statusConfig = {
  draft: { icon: FileText, color: '#ca8a04', bg: '#ca8a0415', label: 'Draft' },
  generating: { icon: Clock, color: '#2563eb', bg: '#2563eb15', label: 'Generating' },
  ready: { icon: Clock, color: '#0891b2', bg: '#0891b215', label: 'Ready' },
  published: { icon: Globe, color: '#16a34a', bg: '#16a34a15', label: 'Published' },
};

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <div className="group relative rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 overflow-hidden">
      {/* Preview Image */}
      <div className="relative h-36 overflow-hidden">
        {project.preview ? (
          <img
            src={project.preview}
            alt={project.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
            <FileText className="w-8 h-8 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: status.bg }}>
          <StatusIcon className="w-3 h-3" style={{ color: status.color }} />
          <span className="text-xs font-medium" style={{ color: status.color }}>{status.label}</span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.url && (
            <button
              onClick={(e) => { e.stopPropagation(); window.open(`https://${project.url}`, '_blank'); }}
              className="p-1.5 rounded-md bg-black/60 backdrop-blur-sm text-white/60 hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onEdit}
            className="p-1.5 rounded-md bg-black/60 backdrop-blur-sm text-white/60 hover:text-white transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white mb-1 truncate">{project.name}</h3>
        <p className="text-xs text-white/40 mb-3">{project.industry}</p>
        {project.url && (
          <div className="flex items-center gap-1 text-xs text-violet-400">
            <Globe className="w-3 h-3" />
            <span className="truncate">{project.url}</span>
          </div>
        )}
      </div>
    </div>
  );
}
