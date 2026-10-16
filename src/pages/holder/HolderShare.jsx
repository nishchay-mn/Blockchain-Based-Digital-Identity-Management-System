import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  Share2,
  CheckSquare,
  Square,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const HolderShare = () => {
  const { credentials } = useData();
  const { addToast } = useToast();

  const [selectedCredId, setSelectedCredId] = useState(credentials[0]?.id || '');
  const [selectedClaims, setSelectedClaims] = useState({});
  const [hasConsented, setHasConsented] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const selectedCred = credentials.find((c) => c.id === selectedCredId) || credentials[0];

  // Initialize selected claims when credential changes
  React.useEffect(() => {
    if (selectedCred?.claims) {
      const initial = {};
      selectedCred.claims.forEach((c) => {
        initial[c.key] = true;
      });
      setSelectedClaims(initial);
    }
  }, [selectedCredId]);

  const toggleClaim = (key) => {
    setSelectedClaims((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const verificationUrl = `${window.location.origin}${window.location.pathname}#/verifier/verify?id=${encodeURIComponent(selectedCred?.id || '')}`;

  const handleCopyLink = () => {
    if (!hasConsented) {
      addToast('Please confirm your sharing consent first.', 'warning');
      return;
    }
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    addToast('Selective verification link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Share Verifiable Credential</h1>
        <p className="text-xs text-slate-400">
          Selective disclosure: Share only the information required for verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Selective Disclosure Controls */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-5">
          {/* Step 1: Select Credential */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              1. Select Credential to Share
            </label>
            <select
              value={selectedCredId}
              onChange={(e) => setSelectedCredId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
            >
              {credentials.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} — {c.issuerName} ({c.id})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Selective Disclosure Claim Toggles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                2. Choose Permitted Claims (Minimal Disclosure)
              </label>
              <span className="text-[10px] text-brand-accent font-mono">
                Zero-Knowledge Friendly
              </span>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-navy-950 border border-slate-800">
              {selectedCred?.claims ? (
                selectedCred.claims.map((claim) => {
                  const isChecked = selectedClaims[claim.key] !== false;
                  return (
                    <div
                      key={claim.key}
                      onClick={() => toggleClaim(claim.key)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-brand-accent" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )}
                        <span className="font-medium text-slate-300">{claim.key}</span>
                      </div>
                      <span className="font-mono text-slate-400">{claim.value}</span>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-500">No modular claims available</p>
              )}
            </div>
          </div>

          {/* Step 3: Sovereign User Consent */}
          <div className="pt-2">
            <label
              onClick={() => setHasConsented(!hasConsented)}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-navy-950/70 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
            >
              {hasConsented ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
              )}
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">
                  I Consent to Cryptographic Disclosure
                </span>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                  I authorize generating a verifiable cryptographic presentation containing only the checked claims. The recipient will verify authenticity against the on-chain smart contract hash.
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopyLink}
              disabled={!hasConsented}
              className="flex-1 py-3 px-4 rounded-xl bg-brand-blue hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Verification Link'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live QR Code Generation Card */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent">
            Dynamic Verification QR
          </span>

          {/* QR Container */}
          <div className="p-4 rounded-2xl bg-white shadow-2xl border-4 border-slate-800">
            <QRCodeSVG
              value={verificationUrl}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">{selectedCred?.title}</h4>
            <p className="text-xs text-slate-400">{selectedCred?.issuerName}</p>
          </div>

          <div className="w-full p-3 rounded-xl bg-navy-950 border border-slate-800 font-mono text-[11px] text-brand-accent break-all text-left">
            Token: {selectedCred?.id}
          </div>

          <div className="w-full p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left flex items-start gap-2.5 text-xs text-blue-200">
            <Lock className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Zero-Knowledge Security:</strong> Scanning this QR verifies authenticity via on-chain hash matching without exposing any unselected private claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
