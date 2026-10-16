import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LayoutDashboard, LogIn, UserPlus, Menu, X, ChevronRight, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, isAuthenticated, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    switch (role) {
      case 'issuer':
        return '/issuer';
      case 'verifier':
        return '/verifier';
      case 'admin':
        return '/admin';
      default:
        return '/holder';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About System', path: '/about' },
    { name: 'Verifier Portal', path: '/verifier' },
  ];

  return (
    <nav className="border-b border-slate-800/80 bg-navy-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-accent p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-accent" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                Trust<span className="text-brand-accent">ID</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 block -mt-1 tracking-wider uppercase">
                Blockchain Identity
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-accent' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Actions & Dashboard CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:shadow-blue-500/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={currentUser?.name}
                    className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                  />
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-navy-950 px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold"
                >
                  Open Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-2 text-center text-xs text-rose-400 hover:underline"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl bg-brand-blue text-white text-xs font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
