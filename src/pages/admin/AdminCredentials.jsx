import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { Layers, Award, Terminal } from 'lucide-react';

export const AdminCredentials = () => {
  const { credentials } = useData();
  const [selectedCred, setSelectedCred] = useState(null);

  const columns = [
    {
      header: 'Credential ID',
      accessor: 'id',
      className: 'font-mono text-xs text-brand-accent whitespace-nowrap',
    },
    {
      header: 'Award Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <span className="font-bold text-white text-xs block">{row.title}</span>
          <span className="text-[10px] text-slate-400">{row.type}</span>
        </div>
      ),
    },
    {
      header: 'Issuing Authority',
      accessor: 'issuerName',
      render: (row) => <span className="text-xs text-slate-300">{row.issuerName}</span>,
    },
    {
      header: 'Recipient',
      accessor: 'recipientName',
      render: (row) => <span className="text-xs text-slate-300 font-medium">{row.recipientName}</span>,
    },
    {
      header: 'Block Confirmation',
      accessor: 'blockNumber',
      render: (row) => (
        <span className="font-mono text-xs text-emerald-400">
          #{row.blockNumber || 124102}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Details',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => setSelectedCred(row)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
        >
          View Proof
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Global Credential Ledger</h1>
        <p className="text-xs text-slate-400">
          Smart contract state monitor: All credentials registered across all issuing nodes
        </p>
      </div>

      <DataTable
        columns={columns}
        data={credentials}
        searchPlaceholder="Search credentials by ID, title, issuer, recipient..."
        searchKeys={['id', 'title', 'issuerName', 'recipientName', 'credentialHash']}
        filterOptions={[
          { label: 'Verified', value: 'VERIFIED' },
          { label: 'Expired', value: 'EXPIRED' },
          { label: 'Revoked', value: 'REVOKED' },
        ]}
        defaultFilterKey="status"
        pageSize={8}
      />

      {/* Proof Modal */}
      {selectedCred && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCred(null)}
          title={selectedCred.title}
          subtitle={`Ledger Record for ${selectedCred.id}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 font-mono">Registry Status:</span>
              <StatusBadge status={selectedCred.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Recipient DID</span>
                <p className="font-mono text-[11px] text-slate-200 truncate">{selectedCred.recipientDid}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Issuer DID</span>
                <p className="font-mono text-[11px] text-slate-200 truncate">{selectedCred.issuerDid}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">Cryptographic SHA-256 Hash Commitment</span>
              <p className="font-mono text-[11px] text-brand-accent break-all select-all">
                {selectedCred.credentialHash}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">ECDSA Digital Signature</span>
              <p className="font-mono text-[11px] text-slate-400 break-all select-all">
                {selectedCred.signature}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
