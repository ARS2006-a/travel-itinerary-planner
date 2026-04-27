import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [searchParams]       = useSearchParams();
  const [tab, setTab]        = useState(searchParams.get('tab') === 'signup' ? 'signup' : 'login');
  const [form, setForm]      = useState({ name: '', email: '', password: '' });
  const [showPwd, setShowPwd]= useState(false);
  const [loading, setLoading]= useState(false);
  const [error, setError]    = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate('/planner', { replace: true }); }, [isAuthenticated, navigate]);

  const switchTab = (t) => { setTab(t); setError(''); setForm({ name: '', email: '', password: '' }); };
  const handleChange = (e) => { setForm((p) => ({ ...p, [e.target.name]: e.target.value })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = tab === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };
      const res  = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed.');
      login(data.user, data.token);
      navigate('/planner', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const inputCls = 'w-full px-4 py-3 bg-dark-5 border border-dark-7 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-all';

  return (
    <div className="min-h-screen bg-dark text-white flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center shadow-lg shadow-gold/30">
              <MapPin className="w-5 h-5 text-dark" />
            </div>
            <span className="font-bold text-xl text-white">Travel<span className="text-gold">Plan</span></span>
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Your next<br /><span className="text-gold">adventure</span><br />awaits.
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-sm">
            Join thousands of travellers who plan smarter trips with personalised itineraries, local events, and transport info.
          </p>
          <div className="flex gap-8 mt-10">
            {[['10K+', 'Trips Planned'], ['150+', 'Destinations'], ['4.9★', 'Rating']].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-black text-white">{v}</p>
                <p className="text-xs text-zinc-500">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
                <MapPin className="w-4 h-4 text-dark" />
              </div>
              <span className="font-bold text-lg text-white">Travel<span className="text-gold">Plan</span></span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1">
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-zinc-500 text-sm">
              {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => switchTab(tab === 'login' ? 'signup' : 'login')} className="text-gold hover:text-gold-light font-semibold transition-colors">
                {tab === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required className={inputCls} />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required minLength={6}
                  className={`${inputCls} pr-12`}
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center gap-2 py-3.5 bg-gold hover:bg-gold-dark text-dark font-bold rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {loading && <Loader2 className="w-4 h-4 animate-spin relative z-10" />}
              <span className="relative z-10">{tab === 'login' ? 'Login' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
