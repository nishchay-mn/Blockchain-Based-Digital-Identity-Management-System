import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { Search, ShieldCheck, ShieldAlert, Clock, XCircle, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VerifierOverview = () => {
  const { verifications } = useData();
  const [credentialId, setCredentialId] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (credentialId.trim()) {
      navigate(`/verifier/verify?id=${encodeURIComponent(credentialId.trim())}`);
    }
  };

  const handleQuickTest = (id) => {
    navigate(`/verifier/verify?id=${encodeURIComponent(id)}`);
  };

  const total = verifications.length;
  const verifiedCount = verifications.filter((v) => v.status === 'VERIFIED').length;
  const expiredCount = verifications.filter((v) => v.status === 'EXPIRED').length;
  const revokedCount = verifications.filter((v) => v.status === 'REVOKED').length;

  return (
    <div className="space-y-6">
      {/* Top Hero Card with Verification Input */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 relative overflow-hidden space-y-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
              Public Verifier Node
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
              Online & Connected
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Instant Credential Authenticity Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Verify academic degrees, employment certificates, and identity passes against immutable blockchain commitments.
          </p>
        </div>

        {/* Verification Input Form */}
        <form onSubmit={handleVerify} className="max-w-2xl flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={credentialId}
              onChange={(e) => setCredentialId(e.target.value)}
              placeholder="Enter Credential ID (e.g. CRED-AIT-2025-089)..."
              className="w-full pl-11 pr-4 py-3 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify on Blockchain</span>
          </button>
        </form>

        {/* 1-Click Quick-Test Presets */}
        <div className="pt-2">
          <span className="text-xs text-slate-400 font-semibold block mb-2">
            1-Click Demonstration Test Presets:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => handleQuickTest('CRED-AIT-2025-089')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Valid Degree (CRED-AIT-2025-089)</span>
            </button>

            <button
              onClick={() => handleQuickTest('CRED-CAMPUS-2024-41')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Expired Credential (CRED-CAMPUS-2024-41)</span>
            </button>

            <button
              onClick={() => handleQuickTest('CRED-INTERN-2024-082')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Test Revoked Credential (CRED-INTERN-2024-082)</span>
            </button>

            <button
              onClick={() => handleQuickTest('CRED-FAKE-TAMPERED-000')}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1.5 font-medium transition-colors"
            >
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Test Unregistered / Invalid ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Verifications Run"
          value={total}
          icon={ShieldCheck}
          subtitle="Total verified records"
          color="blue"
        />
        <StatCard
          title="Passed (Genuine)"
          value={verifiedCount}
          icon={ShieldCheck}
          subtitle="Cryptographically sound"
          color="emerald"
        />
        <StatCard
          title="Expired"
          value={expiredCount}
          icon={Clock}
          subtitle="Validity window closed"
          color="amber"
        />
        <StatCard
          title="Revoked / Invalid"
          value={revokedCount}
          icon={ShieldAlert}
          subtitle="Failed on-chain validation"
          color="rose"
        />
      </div>

      {/* Recent Verifications Preview */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Verification Logs</h3>
            <p className="text-xs text-slate-400">Audit trail of verified digital credentials</p>
          </div>
          <button
            onClick={() => navigate('/verifier/history')}
            className="text-xs font-semibold text-brand-accent hover:text-white flex items-center gap-1"
          >
            <span>Full History ({verifications.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-800/60">
          {verifications.slice(0, 4).map((v) => (
            <div key={v.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-white block">{v.credentialTitle}</span>
                <span className="font-mono text-[11px] text-slate-400">{v.credentialId}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-mono">{v.timestamp}</span>
                <StatusBadge status={v.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
