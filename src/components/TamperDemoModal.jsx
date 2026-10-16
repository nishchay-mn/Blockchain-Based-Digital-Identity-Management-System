import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, RefreshCw, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';
import { generateSimulatedHash } from '../data/mockData';

export const TamperDemoModal = ({ isOpen, onClose, credential }) => {
  if (!credential) return null;

  const [tamperedTitle, setTamperedTitle] = useState(credential.title);
  const [tamperedGrade, setTamperedGrade] = useState(credential.grade || 'First Class');

  // Recalculate hash on the fly based on tampered values
  const originalHash = credential.credentialHash;
  const isModified = tamperedTitle !== credential.title || tamperedGrade !== (credential.grade || 'First Class');
  
  const currentCalculatedHash = isModified
    ? generateSimulatedHash(`${credential.id}:${tamperedTitle}:${tamperedGrade}`)
    : originalHash;

  const handleReset = () => {
    setTamperedTitle(credential.title);
    setTamperedGrade(credential.grade || 'First Class');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive Blockchain Tamper-Proof Demonstration"
      subtitle="Edit any field below to simulate how blockchain cryptographic commitments immediately detect document tampering."
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Instruction Alert */}
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            In traditional systems, modifying a PDF or digital record is easy. In our blockchain architecture, only the cryptographic hash is committed to the smart contract. Changing even 1 character drastically shifts the calculated hash, immediately failing verification!
          </p>
        </div>

        {/* Editable Fields Sandbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-navy-950/80 border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Credential Title (Editable)
            </label>
            <input
              type="text"
              value={tamperedTitle}
              onChange={(e) => setTamperedTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-navy-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Awarded Grade / Score (Editable)
            </label>
            <input
              type="text"
              value={tamperedGrade}
              onChange={(e) => setTamperedGrade(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-navy-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        {/* Live Hash Comparison Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Cryptographic Verification Check
            </h4>
            {isModified && (
              <button
                onClick={handleReset}
                className="text-xs font-medium text-brand-accent hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset to Original Data
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* On-Chain Immutable Hash */}
            <div className="p-4 rounded-xl border border-slate-800 bg-navy-900/60">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> On-Chain Smart Contract Hash
              </span>
              <p className="font-mono text-xs text-slate-300 break-all bg-navy-950/70 p-2.5 rounded-lg border border-slate-800/80">
                {originalHash}
              </p>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Recorded at Block #{credential.blockNumber || 124102} (Immutable)
              </span>
            </div>

            {/* Recalculated Hash */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                isModified
                  ? 'border-rose-500/40 bg-rose-950/20'
                  : 'border-emerald-500/40 bg-emerald-950/20'
              }`}
            >
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 mb-1 ${
                  isModified ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {isModified ? (
                  <>
                    <AlertCircle className="w-3.5 h-3.5" /> Tampered Recalculated Hash
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" /> Unaltered Recalculated Hash
                  </>
                )}
              </span>
              <p className="font-mono text-xs text-slate-300 break-all bg-navy-950/70 p-2.5 rounded-lg border border-slate-800/80">
                {currentCalculatedHash}
              </p>
              <span
                className={`text-[10px] mt-1 block font-medium ${
                  isModified ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {isModified ? 'HASH MISMATCH! (Verification REJECTED)' : 'Hashes Match 100%'}
              </span>
            </div>
          </div>
        </div>

        {/* Live Verification Verdict */}
        <div
          className={`p-4 rounded-xl border flex items-center justify-between ${
            isModified
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {isModified ? (
              <ShieldAlert className="w-6 h-6 text-rose-400 flex-shrink-0" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold text-sm">
                Verdict: {isModified ? 'FAILED — TAMPERING DETECTED' : 'PASSED — 100% GENUINE'}
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                {isModified
                  ? 'The submitted data differs from the blockchain registry. The credential cannot be forged.'
                  : 'The presented credential strictly matches the cryptographic fingerprint registered on-chain.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
