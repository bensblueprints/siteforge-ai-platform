import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import DashboardNav from '../components/dashboard/DashboardNav';
import ProjectCard from '../components/dashboard/ProjectCard';
import StatsBar from '../components/dashboard/StatsBar';
import { Plus, Sparkles } from 'lucide-react';

const demoProjects = [
  {
    id: 'demo-1',
    name: 'Elite Auto Repair',
    industry: 'Auto Repair Shop',
    industryId: 'auto-repair',
    status: 'published' as const,
    url: 'eliteautorepair.com',
    inputUrl: 'https://maps.google.com/?q=Elite+Auto+Repair',
    inputType: 'maps' as const,
    createdAt: '2026-05-20T00:00:00.000Z',
    updatedAt: '2026-05-25T00:00:00.000Z',
    preview: '/images/hero-website.jpg',
    content: {
      businessName: 'Elite Auto Repair',
      tagline: 'Premium Auto Care You Can Trust',
      description: 'Full-service auto repair shop specializing in domestic and foreign vehicles.',
      services: ['Oil Change', 'Brake Repair', 'Engine Diagnostics', 'Transmission Service'],
      phone: '(512) 555-0142',
      email: 'service@eliteauto.com',
      address: '123 Main Street, Austin, TX 78701',
      hours: 'Mon-Fri: 8AM-6PM | Sat: 9AM-4PM',
      rating: '4.9',
      reviewCount: '287',
      primaryColor: '#dc2626',
      secondaryColor: '#2563eb',
      accentColor: '#fca5a5',
      fontFamily: 'Inter',
      rawText: '',
    },
    sections: [
      { id: 's1', type: 'hero', name: 'Hero', enabled: true, order: 0, content: {} },
      { id: 's2', type: 'services', name: 'Services', enabled: true, order: 1, content: {} },
      { id: 's3', type: 'about', name: 'About', enabled: true, order: 2, content: {} },
      { id: 's4', type: 'testimonials', name: 'Testimonials', enabled: true, order: 3, content: {} },
      { id: 's5', type: 'contact', name: 'Contact', enabled: true, order: 4, content: {} },
    ],
  },
  {
    id: 'demo-2',
    name: 'Lotus Yoga Studio',
    industry: 'Yoga Studio',
    industryId: 'yoga',
    status: 'ready' as const,
    url: undefined,
    inputUrl: 'https://example.com/lotus-yoga',
    inputType: 'website' as const,
    createdAt: '2026-05-22T00:00:00.000Z',
    updatedAt: '2026-05-24T00:00:00.000Z',
    preview: '/images/hero-phone.jpg',
    content: {
      businessName: 'Lotus Yoga Studio',
      tagline: 'Find Your Inner Peace',
      description: 'Transform your mind and body with our expert-led yoga classes.',
      services: ['Vinyasa Flow', 'Hot Yoga', 'Meditation', 'Private Sessions'],
      phone: '(512) 555-0199',
      email: 'hello@lotusyoga.com',
      address: '456 Oak Ave, Austin, TX 78702',
      hours: 'Mon-Sun: 6AM-9PM',
      rating: '4.8',
      reviewCount: '156',
      primaryColor: '#6b46c1',
      secondaryColor: '#a78bfa',
      accentColor: '#c4b5fd',
      fontFamily: 'Inter',
      rawText: '',
    },
    sections: [
      { id: 's1', type: 'hero', name: 'Hero', enabled: true, order: 0, content: {} },
      { id: 's2', type: 'about', name: 'About', enabled: true, order: 1, content: {} },
      { id: 's3', type: 'services', name: 'Services', enabled: true, order: 2, content: {} },
      { id: 's4', type: 'testimonials', name: 'Testimonials', enabled: true, order: 3, content: {} },
      { id: 's5', type: 'contact', name: 'Contact', enabled: true, order: 4, content: {} },
    ],
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, projects } = useStore();
  const allProjects = [...projects, ...demoProjects];

  const stats = {
    total: allProjects.length,
    published: allProjects.filter((p) => p.status === 'published').length,
    ready: allProjects.filter((p) => p.status === 'ready').length,
    draft: allProjects.filter((p) => p.status === 'draft').length,
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
            You have {stats.total} project{stats.total !== 1 ? 's' : ''}. Let's build something amazing.
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

        {allProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onEdit={() => navigate(`/editor/${project.id}`)} />
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
            <button onClick={() => navigate('/builder')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25"
              style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}>
              <Plus className="w-4 h-4" />
              <span>Create Your First Website</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
