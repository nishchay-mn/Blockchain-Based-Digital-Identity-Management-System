import React from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { StatusBadge } from '../../components/StatusBadge';
import { Users, Building2, Award, ShieldCheck, ScrollText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { VERIFICATION_ACTIVITY_CHART_DATA, INITIAL_USERS } from '../../data/mockData';

export const AdminOverview = () => {
  const { issuers, credentials, verifications, auditLogs } = useData();

  const totalUsers = INITIAL_USERS.length + 8; // demo total
  const totalIssuers = issuers.length;
  const pendingIssuers = issuers.filter((i) => i.status === 'PENDING').length;
  const totalCreds = credentials.length;
  const totalVerifications = verifications.length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Governance Authority Console
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
              Root Multisig Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Administration</h1>
          <p className="text-xs text-slate-400">
            Decentralized identity consortium network monitoring and authority governance
          </p>
        </div>

        {pendingIssuers > 0 && (
          <Link
            to="/admin/issuers"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
          >
            <span>{pendingIssuers} Pending Issuers to Approve</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Identities"
          value={totalUsers}
          icon={Users}
          subtitle="Registered DIDs"
          color="blue"
        />
        <StatCard
          title="Accredited Issuers"
          value={totalIssuers}
          icon={Building2}
          subtitle={`${pendingIssuers} pending approval`}
          color="purple"
        />
        <StatCard
          title="Credentials Minted"
          value={totalCreds}
          icon={Award}
          subtitle="On-chain hash commitments"
          color="emerald"
        />
        <StatCard
          title="Verifications Logged"
          value={totalVerifications}
          icon={ShieldCheck}
          subtitle="Real-time audit events"
          color="amber"
        />
      </div>

      {/* Analytics Chart & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Consortium Verification Volume</h3>
              <p className="text-xs text-slate-400">Passed genuine credentials vs rejected or tampered</p>
            </div>
            <span className="text-xs font-mono text-brand-accent bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              EVM Smart Contract
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VERIFICATION_ACTIVITY_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1120',
                    borderColor: '#1E293B',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="passed" name="Valid & Verified" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failedOrRevoked" name="Revoked / Lapsed" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Issuers Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Pending Authorities</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono text-[10px] font-bold">
                {pendingIssuers} Pending
              </span>
            </div>

            <div className="space-y-2.5">
              {issuers
                .filter((i) => i.status === 'PENDING')
                .slice(0, 2)
                .map((iss) => (
                  <div key={iss.id} className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1 text-xs">
                    <span className="font-bold text-white block">{iss.name}</span>
                    <span className="text-slate-400 text-[11px] block">{iss.category}</span>
                    <span className="text-[10px] font-mono text-slate-500 block">{iss.accreditationProof}</span>
                  </div>
                ))}
            </div>
          </div>

          <Link
            to="/admin/issuers"
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Review & Authorize</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Audit Events */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Security Audit Log Feed</h3>
            <p className="text-xs text-slate-400">System actions, smart contract registrations, and administrative changes</p>
          </div>
          <Link
            to="/admin/audit-logs"
            className="text-xs font-semibold text-brand-accent hover:text-white flex items-center gap-1"
          >
            <span>Full Audit Trail ({auditLogs.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-800/60">
          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-brand-accent">
                    {log.action}
                  </span>
                  <span className="text-slate-500 text-[10px] font-mono">by {log.actor}</span>
                </div>
                <p className="text-slate-300 text-xs">{log.details}</p>
              </div>
              <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">
                {log.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
