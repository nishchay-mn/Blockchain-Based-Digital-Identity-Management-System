import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/DataTable';
import { ScrollText, ShieldAlert, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const AdminAuditLogs = () => {
  const { auditLogs } = useData();

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      className: 'font-mono text-xs text-slate-400 whitespace-nowrap',
    },
    {
      header: 'Event Action',
      accessor: 'action',
      render: (row) => (
        <span className="font-mono text-xs font-bold text-white block">{row.action}</span>
      ),
    },
    {
      header: 'Actor',
      accessor: 'actor',
      render: (row) => <span className="text-xs text-slate-300 font-medium">{row.actor}</span>,
    },
    {
      header: 'Target Subject / Entity',
      accessor: 'target',
      render: (row) => (
        <span className="font-mono text-xs text-brand-accent line-clamp-1">{row.target}</span>
      ),
    },
    {
      header: 'Severity',
      accessor: 'severity',
      render: (row) => {
        let badgeClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        if (row.severity === 'success') badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (row.severity === 'warning') badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        if (row.severity === 'danger') badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${badgeClass}`}>
            {row.severity}
          </span>
        );
      },
    },
    {
      header: 'Audit Statement',
      accessor: 'details',
      render: (row) => (
        <span className="text-xs text-slate-400 line-clamp-1">{row.details}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Security Audit Logs</h1>
        <p className="text-xs text-slate-400">
          Immutable event log of all smart contract state transitions, administrative grants, and verification checks
        </p>
      </div>

      <DataTable
        columns={columns}
        data={auditLogs}
        searchPlaceholder="Search audit trail by action, actor, target..."
        searchKeys={['action', 'actor', 'target', 'details']}
        filterOptions={[
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Danger', value: 'danger' },
          { label: 'Info', value: 'info' },
        ]}
        defaultFilterKey="severity"
        pageSize={8}
      />
    </div>
  );
};
