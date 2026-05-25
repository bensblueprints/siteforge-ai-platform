import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Menu, X, Zap } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{
                fontFamily: 'Oswald, Inter, sans-serif',
                background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SITEFORGE AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              100 Industries
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 text-sm font-semibold rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
                  style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-white/60 hover:text-white py-2">Features</button>
            <button onClick={() => scrollToSection('industries')} className="block w-full text-left text-white/60 hover:text-white py-2">100 Industries</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-white/60 hover:text-white py-2">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-white/60 hover:text-white py-2">FAQ</button>
            <hr className="border-white/10" />
            {isAuthenticated ? (
              <>
                <button onClick={() => { navigate('/dashboard'); setMobileOpen(false); }} className="block w-full text-left text-white/60 hover:text-white py-2">Dashboard</button>
                <button onClick={() => { logout(); navigate('/'); setMobileOpen(false); }} className="block w-full text-left text-white/60 hover:text-white py-2">Log Out</button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="block w-full text-left text-white/60 hover:text-white py-2">Log In</button>
                <button
                  onClick={() => { navigate('/signup'); setMobileOpen(false); }}
                  className="w-full py-2 text-sm font-semibold rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
