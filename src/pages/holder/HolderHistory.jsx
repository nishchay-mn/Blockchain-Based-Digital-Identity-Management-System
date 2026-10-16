import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { History, ShieldCheck } from 'lucide-react';

export const HolderHistory = () => {
  const { verifications } = useData();

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      className: 'font-mono text-xs text-slate-400 whitespace-nowrap',
    },
    {
      header: 'Credential',
      accessor: 'credentialTitle',
      render: (row) => (
        <div>
          <span className="font-bold text-white text-xs block">{row.credentialTitle}</span>
          <span className="font-mono text-[11px] text-slate-400">{row.credentialId}</span>
        </div>
      ),
    },
    {
      header: 'Verifier / Entity',
      accessor: 'verifierName',
      render: (row) => (
        <span className="text-xs text-slate-300 font-medium">{row.verifierName}</span>
      ),
    },
    {
      header: 'Result',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Verification Audit Note',
      accessor: 'resultDetails',
      render: (row) => (
        <span className="text-xs text-slate-400 line-clamp-1">{row.resultDetails}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Verification History</h1>
        <p className="text-xs text-slate-400">
          Decentralized audit trail of third parties who verified your credentials
        </p>
      </div>

      <DataTable
        columns={columns}
        data={verifications}
        searchPlaceholder="Search history by credential, verifier..."
        searchKeys={['credentialTitle', 'credentialId', 'verifierName', 'resultDetails']}
        filterOptions={[
          { label: 'Verified', value: 'VERIFIED' },
          { label: 'Expired', value: 'EXPIRED' },
          { label: 'Revoked', value: 'REVOKED' },
          { label: 'Invalid', value: 'INVALID' },
        ]}
        defaultFilterKey="status"
        pageSize={8}
      />
    </div>
  );
};
