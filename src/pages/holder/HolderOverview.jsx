import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/StatCard';
import { CredentialCard } from '../../components/CredentialCard';
import { StatusBadge } from '../../components/StatusBadge';
import { QRModal } from '../../components/QRModal';
import { TamperDemoModal } from '../../components/TamperDemoModal';
import { Modal } from '../../components/Modal';
import {
  Award,
  ShieldCheck,
  Clock,
  ShieldAlert,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  QrCode,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { VERIFICATION_ACTIVITY_CHART_DATA } from '../../data/mockData';

export const HolderOverview = () => {
  const { currentUser } = useAuth();
  const { credentials } = useData();
  const navigate = useNavigate();

  const [selectedCred, setSelectedCred] = useState(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isTamperOpen, setIsTamperOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [copiedDid, setCopiedDid] = useState(false);

  // Compute metrics
  const totalCreds = credentials.length;
  const verifiedCreds = credentials.filter((c) => c.status === 'VERIFIED').length;
  const expiredCreds = credentials.filter((c) => c.status === 'EXPIRED').length;
  const revokedCreds = credentials.filter((c) => c.status === 'REVOKED').length;

  const handleCopyDid = () => {
    if (currentUser?.did) {
      navigator.clipboard.writeText(currentUser.did);
      setCopiedDid(true);
      setTimeout(() => setCopiedDid(false), 2000);
    }
  };

  const handleViewDetails = (cred) => {
    setSelectedCred(cred);
    setIsDetailOpen(true);
  };

  const handleShare = (cred) => {
    setSelectedCred(cred);
    setIsQrOpen(true);
  };

  const handleVerify = (cred) => {
    navigate(`/verifier/verify?id=${encodeURIComponent(cred.id)}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
              Self-Sovereign Identity Wallet
            </span>
            <StatusBadge status="ACTIVE" size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {currentUser?.name || 'Identity Subject'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Your credentials are cryptographically committed to the blockchain. You have complete sovereign control over sharing and verification requests.
          </p>

          {/* User DID snippet */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-mono">DID:</span>
            <span className="font-mono text-slate-300 bg-navy-950 px-2.5 py-1 rounded-lg border border-slate-800 break-all">
              {currentUser?.did || 'did:trustid:0x71C8A9b...49A0'}
            </span>
            <button
              onClick={handleCopyDid}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {copiedDid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDid ? 'Copied' : 'Copy DID'}</span>
            </button>
          </div>
        </div>

        {/* Action quick links */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
          <Link
            to="/holder/share"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Share QR</span>
          </Link>

          <Link
            to="/holder/identity"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Full Identity</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Credentials"
          value={totalCreds}
          icon={Award}
          subtitle="Issued to your DID"
          color="blue"
        />
        <StatCard
          title="Verified Active"
          value={verifiedCreds}
          icon={ShieldCheck}
          subtitle="100% On-Chain Match"
          color="emerald"
        />
        <StatCard
          title="Expired"
          value={expiredCreds}
          icon={Clock}
          subtitle="Validity period ended"
          color="amber"
        />
        <StatCard
          title="Revoked"
          value={revokedCreds}
          icon={ShieldAlert}
          subtitle="On-chain status marked"
          color="rose"
        />
      </div>

      {/* Verification Trends & Interactive Tamper Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Activity Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Verification Activity</h3>
              <p className="text-xs text-slate-400">Monthly 3rd-party verifications across your credentials</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Active Network
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VERIFICATION_ACTIVITY_CHART_DATA}>
                <defs>
                  <linearGradient id="holderColorVer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="verifications"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#holderColorVer)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive Tampering Demo Launcher Banner */}
        <div className="glass-card p-5 rounded-2xl border border-brand-accent/30 flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Tamper Sandbox</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Want to see how the blockchain catches fake degrees? Open the interactive sandbox to edit any credential and watch the cryptographic hash mismatch in real-time.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCred(credentials[0]);
              setIsTamperOpen(true);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Launch Tamper Demo</span>
          </button>
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">My Credentials</h3>
            <p className="text-xs text-slate-400">Verifiable credentials issued by accredited organizations</p>
          </div>
          <Link
            to="/holder/credentials"
            className="text-xs font-semibold text-brand-accent hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View All ({credentials.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {credentials.slice(0, 3).map((cred) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              onViewDetails={handleViewDetails}
              onShare={handleShare}
              onVerify={handleVerify}
            />
          ))}
        </div>
      </div>

      {/* Credential Details Modal */}
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
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
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
          <div className="space-y-5 text-xs">
            {/* Top status banner */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
              <span className="text-slate-400 font-mono">Status:</span>
              <StatusBadge status={selectedCred.status} size="sm" />
            </div>

            {/* Structured Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Credential Type</span>
                <p className="font-semibold text-slate-200">{selectedCred.type}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Awarded Grade / CGPA</span>
                <p className="font-semibold text-emerald-400">{selectedCred.grade || 'First Class'}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Issue Date</span>
                <p className="font-mono text-slate-200">{selectedCred.issueDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Expiration Date</span>
                <p className="font-mono text-slate-200">{selectedCred.expirationDate || 'No Expiration'}</p>
              </div>
            </div>

            {/* Claims list */}
            {selectedCred.claims && (
              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                  Verifiable Claims
                </span>
                <div className="divide-y divide-slate-800/80">
                  {selectedCred.claims.map((claim, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 text-slate-300">
                      <span className="text-slate-400">{claim.key}:</span>
                      <span className="font-medium text-white">{claim.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cryptographic hash */}
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

            {/* Revocation notice if revoked */}
            {selectedCred.status === 'REVOKED' && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" /> Revocation Details
                </span>
                <p className="text-[11px] leading-relaxed">
                  {selectedCred.revocationReason || 'This credential has been revoked on the smart contract registry.'}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* QR Code Modal */}
      <QRModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        credential={selectedCred}
      />

      {/* Tamper Sandbox Modal */}
      <TamperDemoModal
        isOpen={isTamperOpen}
        onClose={() => setIsTamperOpen(false)}
        credential={selectedCred}
      />
    </div>
  );
};
