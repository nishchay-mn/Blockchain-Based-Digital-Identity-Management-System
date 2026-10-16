import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { Building2, FilePlus, Files, ShieldAlert, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const IssuerOverview = () => {
  const { currentUser } = useAuth();
  const { credentials } = useData();

  const totalIssued = credentials.length;
  const activeCount = credentials.filter((c) => c.status === 'VERIFIED').length;
  const revokedCount = credentials.filter((c) => c.status === 'REVOKED').length;
  const expiredCount = credentials.filter((c) => c.status === 'EXPIRED').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
              Accredited Issuing Authority
            </span>
            <StatusBadge status="APPROVED" size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {currentUser?.organization || 'Apex Institute of Technology'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign and publish tamper-proof academic and professional credentials directly to the decentralized registry.
          </p>
        </div>

        <Link
          to="/issuer/issue"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all flex-shrink-0"
        >
          <FilePlus className="w-4 h-4" />
          <span>Issue New Credential</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Issued"
          value={totalIssued}
          icon={Files}
          subtitle="All credentials minted"
          color="blue"
        />
        <StatCard
          title="Active On-Chain"
          value={activeCount}
          icon={Award}
          subtitle="Valid & non-expired"
          color="emerald"
        />
        <StatCard
          title="Revoked On-Chain"
          value={revokedCount}
          icon={ShieldAlert}
          subtitle="Invalidated by authority"
          color="rose"
        />
        <StatCard
          title="Expired"
          value={expiredCount}
          icon={Building2}
          subtitle="Validity window past"
          color="amber"
        />
      </div>

      {/* Recent Issued Credentials Table Preview */}
      <div className="glass-panel rounded-2xl border border-slate-800/80 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recently Issued Credentials</h3>
            <p className="text-xs text-slate-400">Latest academic awards registered to the blockchain</p>
          </div>
          <Link
            to="/issuer/credentials"
            className="text-xs font-semibold text-brand-accent hover:text-white flex items-center gap-1"
          >
            <span>Manage All ({credentials.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Credential ID</th>
                <th className="p-3">Title & Award</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {credentials.slice(0, 4).map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-slate-400">{c.id}</td>
                  <td className="p-3 font-semibold text-white">{c.title}</td>
                  <td className="p-3">{c.recipientName}</td>
                  <td className="p-3 font-mono">{c.issueDate}</td>
                  <td className="p-3">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
