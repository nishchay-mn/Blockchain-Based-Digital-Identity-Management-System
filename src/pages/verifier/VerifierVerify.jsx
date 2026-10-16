import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { TamperDemoModal } from '../../components/TamperDemoModal';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  XCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ArrowLeft,
  Terminal,
} from 'lucide-react';

export const VerifierVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyCredential, credentials } = useData();

  const [inputQuery, setInputQuery] = useState(searchParams.get('id') || 'CRED-AIT-2025-089');
  const [report, setReport] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTamperOpen, setIsTamperOpen] = useState(false);

  const runVerification = (idToTest) => {
    if (!idToTest) return;
    setIsVerifying(true);
    setTimeout(() => {
      const res = verifyCredential(idToTest);
      setReport(res);
      setIsVerifying(false);
    }, 400);
  };

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setInputQuery(idFromUrl);
      runVerification(idFromUrl);
    } else {
      runVerification('CRED-AIT-2025-089');
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      runVerification(inputQuery.trim());
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header and Lookup Bar */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Verify Credential</h1>
        <p className="text-xs text-slate-400">
          Query the smart contract registry and compare cryptographic proof commitments
        </p>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            required
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Enter Credential ID..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white font-mono focus:outline-none focus:border-brand-accent"
          />
        </div>
        <button
          type="submit"
          disabled={isVerifying}
          className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'Verifying...' : 'Verify Now'}</span>
        </button>
      </form>

      {/* Verification Report Card */}
      {report && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Status Hero Banner */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              report.status === 'VERIFIED'
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : report.status === 'REVOKED'
                ? 'bg-rose-950/20 border-rose-500/40'
                : report.status === 'EXPIRED'
                ? 'bg-amber-950/20 border-amber-500/40'
                : 'bg-red-950/20 border-red-500/40'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {report.status === 'VERIFIED' && (
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                )}
                {report.status === 'REVOKED' && (
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                )}
                {report.status === 'EXPIRED' && (
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Clock className="w-7 h-7" />
                  </div>
                )}
                {report.status === 'INVALID' && (
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                    <XCircle className="w-7 h-7" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-white">
                      VERIFICATION RESULT: {report.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    ID: <span className="font-mono text-brand-accent">{report.credentialId}</span>
                  </p>
                </div>
              </div>

              <StatusBadge status={report.status} size="lg" />
            </div>

            {/* Why it passed/failed statement */}
            <div className="pt-4 text-xs text-slate-200 leading-relaxed">
              <strong className="text-white block mb-1">Forensic Analysis:</strong>
              <p className="p-3 rounded-xl bg-navy-950/70 border border-slate-800 text-slate-300">
                {report.reason}
              </p>
            </div>
          </div>

          {/* 6-Stage Security Verification Pipeline Checklist */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-accent" />
              Cryptographic Integrity Pipeline (6/6 Checks)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>1. Registry Existence Check</span>
                {report.checks?.idExists ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Found
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Missing
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>2. Recalculated Hash Match</span>
                {report.checks?.hashMatched ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Match
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Hash Mismatch
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>3. ECDSA Digital Signature</span>
                {report.checks?.signatureValid ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographically Valid
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Invalid Signature
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>4. Authorized Issuer Authority</span>
                {report.checks?.issuerAuthorized ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Accredited Node
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Unauthorized
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>5. Smart Contract Revocation Status</span>
                {report.checks?.notRevoked ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active (Not Revoked)
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Revoked on-chain
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between">
                <span>6. Expiration Period Check</span>
                {report.checks?.notExpired ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Validity Window
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Lapsed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Credential Data Presentation */}
          {report.credential && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Verified Credential Details</h3>
                <button
                  onClick={() => setIsTamperOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-brand-accent text-xs font-semibold border border-blue-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Test Tampering
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px]">Title</span>
                  <p className="font-bold text-white">{report.credential.title}</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px]">Issuing Authority</span>
                  <p className="font-semibold text-slate-200">{report.credential.issuerName}</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px]">Recipient Subject</span>
                  <p className="font-semibold text-slate-200">{report.credential.recipientName}</p>
                </div>
                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-0.5">
                  <span className="text-slate-500 text-[10px]">Awarded Grade / Score</span>
                  <p className="font-semibold text-emerald-400">{report.credential.grade || 'Satisfactory'}</p>
                </div>
              </div>

              {/* On-Chain Proof */}
              <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-wider block">
                  Smart Contract Fingerprint Commitment
                </span>
                <p className="font-mono text-[11px] text-brand-accent break-all select-all">
                  {report.credential.credentialHash}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Block #{report.credential.blockNumber || 124102}</span>
                  <span>Tx: {report.credential.transactionHash?.substring(0, 18)}...</span>
                </div>
              </div>
            </div>
          )}

          {/* Tamper Sandbox Modal */}
          {report.credential && (
            <TamperDemoModal
              isOpen={isTamperOpen}
              onClose={() => setIsTamperOpen(false)}
              credential={report.credential}
            />
          )}
        </div>
      )}
    </div>
  );
};
