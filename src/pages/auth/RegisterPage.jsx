import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, Eye, EyeOff, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('holder');
  const [organization, setOrganization] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('Please fill in all required fields.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register({ name, email, role, organization });
      addToast(`Identity created successfully! Assigned unique DID.`, 'success');
      setLoading(false);

      if (role === 'issuer') navigate('/issuer');
      else if (role === 'verifier') navigate('/verifier');
      else navigate('/holder');
    }, 500);
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
          Create Your Decentralized Digital Identity
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Generate an asymmetric cryptographic keypair and DID identifier
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Full Name / Legal Entity Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma or Apex University"
                className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
              />
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
                <option value="holder">Identity Holder (Student / Individual)</option>
                <option value="issuer">Credential Issuer (University / Organization)</option>
                <option value="verifier">Verifier (Employer / Auditor)</option>
              </select>
            </div>

            {role === 'issuer' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Accredited Institution Name
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Apex Institute of Technology"
                  className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
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
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-200 block">Cryptographic Keypair Generation</span>
              <p>Registration will automatically assign you a simulated DID conforming to W3C Decentralized Identity conventions.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Creating Digital Identity...' : 'Register Identity'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Already have a digital identity?{' '}
            <Link to="/login" className="text-brand-accent font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
