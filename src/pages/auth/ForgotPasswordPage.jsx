import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Simulated password reset instructions sent!', 'success');
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
          Reset Your Access Key
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Decentralized recovery authorization
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In a production deployment, a recovery transaction would be dispatched to your backup custodian address. For this college project demonstration, you can simply sign in with any demo password.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:underline mt-2"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all"
              >
                Send Reset Authorization
              </button>

              <div className="pt-4 border-t border-slate-800 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
