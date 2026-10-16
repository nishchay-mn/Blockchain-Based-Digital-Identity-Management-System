import React from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Building2, Check, X, ShieldCheck } from 'lucide-react';

export const AdminIssuers = () => {
  const { issuers, approveIssuer, rejectIssuer } = useData();
  const { addToast } = useToast();

  const handleApprove = (issuer) => {
    approveIssuer(issuer.id);
    addToast(`${issuer.name} authorized as credential issuer on-chain!`, 'success');
  };

  const handleReject = (issuer) => {
    rejectIssuer(issuer.id);
    addToast(`${issuer.name} application rejected.`, 'warning');
  };

  const columns = [
    {
      header: 'Institution / Authority',
      accessor: 'name',
      render: (row) => (
        <div>
          <span className="font-bold text-white text-xs block">{row.name}</span>
          <span className="text-[10px] text-slate-400">{row.category}</span>
        </div>
      ),
    },
    {
      header: 'Accreditation Proof',
      accessor: 'accreditationProof',
      render: (row) => (
        <span className="text-xs text-slate-300 font-mono line-clamp-1">{row.accreditationProof}</span>
      ),
    },
    {
      header: 'Signing Address',
      accessor: 'address',
      className: 'font-mono text-xs text-slate-400 whitespace-nowrap',
      render: (row) => (
        <span className="truncate max-w-[120px] block" title={row.address}>
          {row.address}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Governance Decision',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'PENDING' ? (
            <>
              <button
                onClick={() => handleApprove(row)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Approve
              </button>
              <button
                onClick={() => handleReject(row)}
                className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold border border-rose-500/30 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Reject
              </button>
            </>
          ) : row.status === 'APPROVED' ? (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Authorized Node
            </span>
          ) : (
            <span className="text-xs text-rose-400 font-medium">Deauthorized</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Issuer Authorization</h1>
        <p className="text-xs text-slate-400">
          Review, approve, and authorize educational institutions and corporate employers on the smart contract
        </p>
      </div>

      <DataTable
        columns={columns}
        data={issuers}
        searchPlaceholder="Search issuers by name, category, address..."
        searchKeys={['name', 'category', 'address', 'accreditationProof']}
        filterOptions={[
          { label: 'Approved', value: 'APPROVED' },
          { label: 'Pending', value: 'PENDING' },
          { label: 'Rejected', value: 'REJECTED' },
        ]}
        defaultFilterKey="status"
        pageSize={8}
      />
    </div>
  );
};
