import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff, User, Building2 } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email) {
        setError('Please fill in all fields');
        return;
      }
      setError('');
      setStep(2);
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    setUser({ name, email, plan: 'starter' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#000000' }}>
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold"
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

          <h1 className="text-2xl font-bold text-white mb-2">
            {step === 1 ? 'Create your account' : 'Set your password'}
          </h1>
          <p className="text-sm text-white/40 mb-8">
            {step === 1
              ? 'Start building websites for free. No credit card required.'
              : 'One last step to get you started.'}
          </p>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-violet-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
              style={{ background: 'linear-gradient(135deg, #6b46c1 0%, #2563eb 100%)' }}
            >
              <span>{step === 1 ? 'Continue' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/liquid-metal.jpg"
            alt="Abstract"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 p-12 space-y-6">
          {[
            { icon: Building2, text: 'Build for any of 100+ industries' },
            { icon: Zap, text: 'Generate websites in 60 seconds' },
            { icon: Lock, text: 'Free SSL + hosting on every site' },
          ].map((item, i) => (
            <div key={i} className="liquid-glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-sm text-white font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
