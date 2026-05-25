import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Zap, Plus, Bell, Settings, LogOut } from 'lucide-react';

export default function DashboardNav() {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-base font-bold"
              style={{
                fontFamily: 'Oswald, Inter, sans-serif',
                background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SITEFORGE
            </span>
          </Link>

          {/* Center Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:bg-white/5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Build
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
            </button>
            <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
              >
                {(user?.name || 'U')[0].toUpperCase()}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-white/5 transition-all"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
