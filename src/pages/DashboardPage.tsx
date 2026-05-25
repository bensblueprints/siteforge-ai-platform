import { useNavigate } from 'react-router-dom';
import { trpc } from '@/providers/trpc';
import { useStore } from '@/store/useStore';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ProjectCard from '@/components/dashboard/ProjectCard';
import StatsBar from '@/components/dashboard/StatsBar';
import { Plus, Sparkles, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useStore();
  const { data: projects, isLoading } = trpc.scrape.listProjects.useQuery();

  const stats = {
    total: projects?.length || 0,
    published: projects?.filter((p) => p.status === 'published').length || 0,
    ready: projects?.filter((p) => p.status === 'ready').length || 0,
    draft: projects?.filter((p) => p.status === 'draft').length || 0,
  };

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <DashboardNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Welcome back, <span className="text-violet-400">{user?.name || 'Creator'}</span>
          </h1>
          <p className="text-sm text-white/40">
            {isLoading ? 'Loading projects...' : `You have ${stats.total} project${stats.total !== 1 ? 's' : ''}.`}
          </p>
        </div>

        <StatsBar stats={stats} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-lg font-semibold text-white">Your Projects</h2>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
          >
            <Plus className="w-4 h-4" />
            <span>New Website</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  id: String(project.id),
                  name: project.name,
                  industry: project.industry,
                  status: project.status as 'draft' | 'generating' | 'ready' | 'published',
                  url: undefined,
                  createdAt: project.createdAt,
                  updatedAt: project.updatedAt,
                  preview: '/images/hero-website.jpg',
                }}
                onEdit={() => navigate(`/editor/${project.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-sm text-white/40 mb-6 max-w-sm mx-auto">
              Create your first website by pasting a Google Maps URL or existing website link.
            </p>
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25"
              style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Website</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
