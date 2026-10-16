import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, Download, Lock, KeyRound, Check, Bell, UserCheck } from 'lucide-react';

export const HolderSettings = () => {
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const [requireConsentPrompt, setRequireConsentPrompt] = useState(true);
  const [notifyOnVerification, setNotifyOnVerification] = useState(true);
  const [logIpAddress, setLogIpAddress] = useState(false);

  const handleExportKeystore = () => {
    const keystore = {
      did: currentUser?.did,
      version: "1.0",
      algorithm: "ECDSA_SECP256K1",
      publicKey: "0x04e84b9c1a2d5f7890123456789abcdef...",
      exportedAt: new Date().toISOString(),
      note: "TrustID Sovereign Encrypted Identity Keystore (Simulation)",
    };

    const blob = new Blob([JSON.stringify(keystore, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustid-keystore-${currentUser?.id || 'identity'}.json`;
    a.click();
    addToast('Encrypted keystore backup exported!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Identity Settings</h1>
        <p className="text-xs text-slate-400">
          Manage privacy consent, cryptographic backup, and notifications
        </p>
      </div>

      {/* Privacy & Consent Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-accent" />
          Zero-Knowledge & Consent Preferences
        </h3>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div>
              <span className="font-semibold text-xs text-white block">
                Require Explicit Consent Prompt
              </span>
              <p className="text-[11px] text-slate-400">
                Always prompt for signature confirmation before generating a verification presentation.
              </p>
            </div>
            <button
              onClick={() => setRequireConsentPrompt(!requireConsentPrompt)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                requireConsentPrompt ? 'bg-brand-blue' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  requireConsentPrompt ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-navy-950 border border-slate-800">
            <div>
              <span className="font-semibold text-xs text-white block">
                Real-Time Verification Alerts
              </span>
              <p className="text-[11px] text-slate-400">
                Receive browser notifications whenever a verifier scans or verifies any of your credentials.
              </p>
            </div>
            <button
              onClick={() => setNotifyOnVerification(!notifyOnVerification)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notifyOnVerification ? 'bg-brand-blue' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notifyOnVerification ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cryptographic Keystore Backup */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-purple-400" />
          Cryptographic Keystore Backup
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed">
          Download your sovereign cryptographic identity profile and public key bundle as a JSON keystore file. You can restore this on any compatible DID wallet.
        </p>

        <button
          onClick={handleExportKeystore}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700/60 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4 text-brand-accent" />
          <span>Export Encrypted Identity Keystore</span>
        </button>
      </div>
    </div>
  );
};
