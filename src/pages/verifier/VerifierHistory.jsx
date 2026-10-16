import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { History, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerifierHistory = () => {
  const { verifications } = useData();

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      className: 'font-mono text-xs text-slate-400 whitespace-nowrap',
    },
    {
      header: 'Credential ID',
      accessor: 'credentialId',
      render: (row) => (
        <Link
          to={`/verifier/verify?id=${encodeURIComponent(row.credentialId)}`}
          className="font-mono text-xs text-brand-accent hover:underline font-bold"
        >
          {row.credentialId}
        </Link>
      ),
    },
    {
      header: 'Award Title',
      accessor: 'credentialTitle',
      render: (row) => (
        <span className="text-xs font-semibold text-white">{row.credentialTitle}</span>
      ),
    },
    {
      header: 'Verifier Identity',
      accessor: 'verifierName',
      render: (row) => <span className="text-xs text-slate-300">{row.verifierName}</span>,
    },
    {
      header: 'Outcome',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Result Details',
      accessor: 'resultDetails',
      render: (row) => (
        <span className="text-xs text-slate-400 line-clamp-1">{row.resultDetails}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Verification Logs</h1>
        <p className="text-xs text-slate-400">
          Decentralized audit log of all verification checks performed on this verifier node
        </p>
      </div>

      <DataTable
        columns={columns}
        data={verifications}
        searchPlaceholder="Search verifications by ID, title, verifier..."
        searchKeys={['credentialId', 'credentialTitle', 'verifierName', 'resultDetails']}
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
