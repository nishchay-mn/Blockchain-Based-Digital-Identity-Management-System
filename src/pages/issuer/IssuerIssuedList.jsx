import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { ShieldAlert, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const IssuerIssuedList = () => {
  const { credentials, revokeCredential } = useData();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [selectedCred, setSelectedCred] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [revokeReason, setRevokeReason] = useState('');

  const handleOpenRevoke = (cred) => {
    setSelectedCred(cred);
    setRevokeReason('');
    setIsRevokeOpen(true);
  };

  const handleConfirmRevoke = (e) => {
    e.preventDefault();
    if (!revokeReason.trim()) {
      addToast('Please provide an official revocation reason.', 'warning');
      return;
    }

    revokeCredential(selectedCred.id, revokeReason, currentUser?.organization || 'Apex Institute of Technology');
    setIsRevokeOpen(false);
    addToast(`Credential ${selectedCred.id} revoked on-chain!`, 'success');
  };

  const columns = [
    {
      header: 'Credential ID',
      accessor: 'id',
      className: 'font-mono text-xs text-brand-accent whitespace-nowrap',
    },
    {
      header: 'Title & Type',
      accessor: 'title',
      render: (row) => (
        <div>
          <span className="font-bold text-white text-xs block">{row.title}</span>
          <span className="text-[10px] text-slate-400">{row.type}</span>
        </div>
      ),
    },
    {
      header: 'Recipient',
      accessor: 'recipientName',
      render: (row) => (
        <div>
          <span className="text-xs text-slate-200 font-medium block">{row.recipientName}</span>
          <span className="font-mono text-[10px] text-slate-500 truncate max-w-[120px] block">
            {row.recipientDid}
          </span>
        </div>
      ),
    },
    {
      header: 'Issue / Expiry',
      accessor: 'issueDate',
      render: (row) => (
        <span className="font-mono text-xs text-slate-400 whitespace-nowrap">
          {row.issueDate} → {row.expirationDate || 'Never'}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCred(row);
              setIsDetailOpen(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Details
          </button>

          {row.status !== 'REVOKED' ? (
            <button
              onClick={() => handleOpenRevoke(row)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-semibold border border-rose-500/30"
            >
              Revoke
            </button>
          ) : (
            <span className="text-[10px] font-mono text-rose-400 italic">Revoked</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Issued Credentials</h1>
        <p className="text-xs text-slate-400">
          Complete ledger of academic and professional credentials issued by your institution
        </p>
      </div>

      <DataTable
        columns={columns}
        data={credentials}
        searchPlaceholder="Search issued records by ID, title, recipient..."
        searchKeys={['id', 'title', 'recipientName', 'recipientDid']}
        filterOptions={[
          { label: 'Verified', value: 'VERIFIED' },
          { label: 'Expired', value: 'EXPIRED' },
          { label: 'Revoked', value: 'REVOKED' },
        ]}
        defaultFilterKey="status"
        pageSize={8}
      />

      {/* Details Modal */}
      {selectedCred && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={selectedCred.title}
          subtitle={`Credential ID: ${selectedCred.id}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 font-mono">Current Status:</span>
              <StatusBadge status={selectedCred.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Recipient</span>
                <p className="font-semibold text-slate-200">{selectedCred.recipientName}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800">
                <span className="text-slate-500 text-[10px]">Classification</span>
                <p className="font-semibold text-slate-200">{selectedCred.type}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px]">Smart Contract Hash Commitment</span>
              <p className="font-mono text-[11px] text-brand-accent break-all select-all">
                {selectedCred.credentialHash}
              </p>
            </div>

            {selectedCred.status === 'REVOKED' && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <span className="font-bold block mb-1">Revocation Statement:</span>
                <p className="text-[11px]">{selectedCred.revocationReason}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Revocation Modal */}
      {selectedCred && (
        <Modal
          isOpen={isRevokeOpen}
          onClose={() => setIsRevokeOpen(false)}
          title="Revoke Credential On-Chain"
          subtitle={`Are you sure you want to revoke ${selectedCred.id}?`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleConfirmRevoke} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Permanent Action:</strong> Revoking will set the <code className="font-mono text-white">isRevoked = true</code> flag on the smart contract registry. Verifiers worldwide will immediately detect this credential as revoked.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Official Revocation Reason *
              </label>
              <textarea
                required
                rows={3}
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g. Student expelled for academic dishonesty, credential superceded by revised transcript, or administrative recall."
                className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRevokeOpen(false)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Confirm Revocation
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
