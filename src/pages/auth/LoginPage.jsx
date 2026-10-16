import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, Eye, EyeOff, LogIn, Sparkles, UserCheck, Building2, ShieldCheck, UserCog } from 'lucide-react';
import { INITIAL_USERS } from '../../data/mockData';

export const LoginPage = () => {
  const [email, setEmail] = useState('rohan.sharma@example.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('holder');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleQuickLogin = (userRole) => {
    const user = INITIAL_USERS.find((u) => u.role === userRole) || INITIAL_USERS[0];
    setEmail(user.email);
    setPassword('demoPass123');
    setRole(userRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password, role);
      addToast(`Welcome back! Signed in as ${role.toUpperCase()}`, 'success');
      setLoading(false);

      switch (role) {
        case 'issuer':
          navigate('/issuer');
          break;
        case 'verifier':
          navigate('/verifier');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/holder');
          break;
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-navy-950 bg-grid-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-accent p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-brand-accent" />
            </div>
          </div>
          <span className="text-2xl font-black text-white">
            Trust<span className="text-brand-accent">ID</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
          Sign In to Your Digital Identity
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Decentralized Identity & Verifiable Credentials
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        {/* Academic Project Demo Notice */}
        <div className="mb-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-brand-accent block">Academic Demonstration Notice</span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              This is a college project simulation with mock accounts. Use the 1-click quick-fill buttons below to test each user role instantly.
            </p>
          </div>
        </div>

        {/* 1-Click Quick Fill Demo Buttons */}
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin('holder')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              role === 'holder'
                ? 'bg-brand-blue/20 border-brand-accent text-white'
                : 'bg-navy-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 mx-auto mb-1 text-brand-accent" />
            <span className="text-[11px] font-bold block">Holder</span>
            <span className="text-[9px] text-slate-400">Rohan (Student)</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('issuer')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              role === 'issuer'
                ? 'bg-brand-blue/20 border-brand-accent text-white'
                : 'bg-navy-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 mx-auto mb-1 text-purple-400" />
            <span className="text-[11px] font-bold block">Issuer</span>
            <span className="text-[9px] text-slate-400">Apex Institute</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('verifier')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              role === 'verifier'
                ? 'bg-brand-blue/20 border-brand-accent text-white'
                : 'bg-navy-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
            <span className="text-[11px] font-bold block">Verifier</span>
            <span className="text-[9px] text-slate-400">Recruiter</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              role === 'admin'
                ? 'bg-brand-blue/20 border-brand-accent text-white'
                : 'bg-navy-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <UserCog className="w-4 h-4 mx-auto mb-1 text-amber-400" />
            <span className="text-[11px] font-bold block">Admin</span>
            <span className="text-[9px] text-slate-400">Root Node</span>
          </button>
        </div>

        {/* Login Form Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-brand-accent hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Role Persona
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
              >
                <option value="holder">Identity Holder (Student / Citizen)</option>
                <option value="issuer">Credential Issuer (University / Authority)</option>
                <option value="verifier">Verifier (Employer / Verifying Entity)</option>
                <option value="admin">System Administrator (Consortium Admin)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have a digital identity yet?{' '}
            <Link to="/register" className="text-brand-accent font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
