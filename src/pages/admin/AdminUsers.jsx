import React, { useState } from 'react';
import { INITIAL_USERS } from '../../data/mockData';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Users, Shield, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const { addToast } = useToast();

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          addToast(`User ${u.name} status updated to ${newStatus}`, 'info');
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const columns = [
    {
      header: 'Identity Subject',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-8 h-8 rounded-full border border-slate-700 object-cover"
          />
          <div>
            <span className="font-bold text-white text-xs block">{row.name}</span>
            <span className="text-[10px] text-slate-400">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-brand-accent border border-slate-700">
          {row.role}
        </span>
      ),
    },
    {
      header: 'DID Identifier',
      accessor: 'did',
      className: 'font-mono text-xs text-slate-400',
      render: (row) => (
        <span className="truncate max-w-[140px] block" title={row.did}>
          {row.did}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.status === 'active' || row.status === 'approved'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => handleToggleStatus(row.id)}
          className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700"
        >
          {row.status === 'active' || row.status === 'approved' ? 'Suspend' : 'Activate'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Identity Directory</h1>
        <p className="text-xs text-slate-400">
          Manage all registered identity holders, issuer authorities, verifier nodes, and administrators
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name, email, or DID..."
        searchKeys={['name', 'email', 'did', 'role']}
        filterOptions={[
          { label: 'Holders', value: 'holder' },
          { label: 'Issuers', value: 'issuer' },
          { label: 'Verifiers', value: 'verifier' },
          { label: 'Admins', value: 'admin' },
        ]}
        defaultFilterKey="role"
        pageSize={8}
      />
    </div>
  );
};
