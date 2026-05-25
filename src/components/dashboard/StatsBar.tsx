import { Globe, Clock, FileText, CheckCircle } from 'lucide-react';

interface StatsBarProps {
  stats: {
    total: number;
    published: number;
    ready: number;
    draft: number;
  };
}

export default function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { icon: FileText, label: 'Total Projects', value: stats.total, color: '#6b46c1' },
    { icon: Globe, label: 'Published', value: stats.published, color: '#16a34a' },
    { icon: CheckCircle, label: 'Ready to Deploy', value: stats.ready, color: '#2563eb' },
    { icon: Clock, label: 'In Progress', value: stats.draft, color: '#ca8a04' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${item.color}15` }}
            >
              <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
            </div>
            <span className="text-xs text-white/40">{item.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
