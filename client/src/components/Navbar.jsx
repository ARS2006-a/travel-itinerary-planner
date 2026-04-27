import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home',        path: '/'        },
  { label: 'Plan a Trip', path: '/planner' },
  { label: 'Events',      path: '/events'  },
  { label: 'Saved Trips', path: '/saved'   },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (p) => location.pathname === p;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-dark-3/95 backdrop-blur-xl border-b border-dark-border shadow-2xl shadow-black/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center shadow-lg shadow-gold/30 group-hover:shadow-gold/50 group-hover:scale-110 transition-all duration-300">
              <MapPin className="w-4 h-4 text-dark" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Travel<span className="text-gold">Plan</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(l.path)
                    ? 'text-gold bg-gold/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
                {isActive(l.path) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-5 border border-dark-border">
                  <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <User className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm text-zinc-300 font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-dark-border hover:border-red-500/30 transition-all duration-200"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-dark-border hover:border-zinc-600 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth?tab=signup"
                  className="px-4 py-2 text-sm font-semibold bg-gold hover:bg-gold-dark text-dark rounded-lg transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-3/98 backdrop-blur-xl border-t border-dark-border px-6 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(l.path) ? 'bg-gold/10 text-gold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-dark-border pt-3 mt-3 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout ({user?.name})
              </button>
            ) : (
              <>
                <Link to="/auth" className="block px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 text-center">Login</Link>
                <Link to="/auth?tab=signup" className="block px-4 py-3 rounded-xl text-sm font-semibold text-dark bg-gold text-center hover:bg-gold-dark transition-colors">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
