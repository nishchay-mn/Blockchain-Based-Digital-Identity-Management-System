import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { CredentialCard } from '../../components/CredentialCard';
import { QRModal } from '../../components/QRModal';
import { TamperDemoModal } from '../../components/TamperDemoModal';
import { Modal } from '../../components/Modal';
import { StatusBadge } from '../../components/StatusBadge';
import { Search, Filter, Award, ShieldAlert, CheckCircle2, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HolderCredentials = () => {
  const { credentials } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCred, setSelectedCred] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isTamperOpen, setIsTamperOpen] = useState(false);

  const filtered = useMemo(() => {
    return credentials.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.issuerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || c.status.toUpperCase() === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [credentials, searchTerm, statusFilter]);

  const handleViewDetails = (c) => {
    setSelectedCred(c);
    setIsDetailOpen(true);
  };

  const handleShare = (c) => {
    setSelectedCred(c);
    setIsQrOpen(true);
  };

  const handleVerify = (c) => {
    navigate(`/verifier/verify?id=${encodeURIComponent(c.id)}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Credentials</h1>
          <p className="text-xs text-slate-400">
            Decentralized verifiable credentials issued to your identity wallet
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by degree title, issuer, or ID..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-navy-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'VERIFIED', 'EXPIRED', 'REVOKED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'bg-navy-950/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st} {st === 'ALL' ? `(${credentials.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cred) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              onViewDetails={handleViewDetails}
              onShare={handleShare}
              onVerify={handleVerify}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-3">
          <Award className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No matching credentials found</h3>
          <p className="text-xs text-slate-500">
            Try resetting your search filters or status criteria.
          </p>
        </div>
      )}

      {/* Details Modal */}
      {selectedCred && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={selectedCred.title}
          subtitle={`Issued by ${selectedCred.issuerName}`}
          maxWidth="max-w-2xl"
          footer={
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsDetailOpen(false);
                  setIsTamperOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Test Tampering
              </button>
              <button
                onClick={() => {
                  setIsDetailOpen(false);
                  setIsQrOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-600"
              >
                Share QR Code
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 font-mono">Verification Status:</span>
              <StatusBadge status={selectedCred.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">Type</span>
                <p className="font-semibold text-slate-200">{selectedCred.type}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">Recipient</span>
                <p className="font-semibold text-slate-200">{selectedCred.recipientName}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">Issue Date</span>
                <p className="font-mono text-slate-200">{selectedCred.issueDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">Expiration Date</span>
                <p className="font-mono text-slate-200">{selectedCred.expirationDate || 'No Expiration'}</p>
              </div>
            </div>

            {selectedCred.claims && (
              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">
                  Encrypted Verified Claims
                </span>
                <div className="divide-y divide-slate-800/80">
                  {selectedCred.claims.map((c, i) => (
                    <div key={i} className="flex justify-between py-1 text-slate-300">
                      <span className="text-slate-400">{c.key}:</span>
                      <span className="font-medium text-white">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px]">
                Immutable Blockchain Commitment Hash (SHA-256)
              </span>
              <p className="font-mono text-[11px] text-brand-accent break-all select-all">
                {selectedCred.credentialHash}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>Block #{selectedCred.blockNumber || 124102}</span>
                <span>Tx: {selectedCred.transactionHash?.substring(0, 16)}...</span>
              </div>
            </div>

            {selectedCred.status === 'REVOKED' && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" /> Revocation Reason
                </span>
                <p className="text-[11px]">{selectedCred.revocationReason}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Modals */}
      <QRModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} credential={selectedCred} />
      <TamperDemoModal isOpen={isTamperOpen} onClose={() => setIsTamperOpen(false)} credential={selectedCred} />
    </div>
  );
};
