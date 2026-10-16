import React, { useState } from 'react';
import { Award, Calendar, Check, Copy, ExternalLink, QrCode, Shield, Sparkles } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useToast } from '../context/ToastContext';

export const CredentialCard = ({ credential, onViewDetails, onShare, onVerify }) => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(credential.id);
    setCopied(true);
    addToast(`Credential ID ${credential.id} copied to clipboard!`, 'info', 2500);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card group relative rounded-2xl p-5 border border-slate-800/80 hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-brand-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-accent/90">
                {credential.type}
              </span>
              <h4 className="text-base font-bold text-white leading-tight mt-0.5 line-clamp-1 group-hover:text-brand-accent transition-colors">
                {credential.title}
              </h4>
            </div>
          </div>
          <StatusBadge status={credential.status} size="sm" />
        </div>

        {/* Issuer and Details */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Issuing Authority</span>
            <span className="font-medium text-slate-200 line-clamp-1 text-right max-w-[180px]">
              {credential.issuerName}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Recipient</span>
            <span className="font-medium text-slate-200">{credential.recipientName}</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Issued / Expiry
            </span>
            <span className="font-mono text-slate-300">
              {credential.issueDate} → {credential.expirationDate || 'Never'}
            </span>
          </div>

          {/* Credential ID badge with Copy */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500 font-mono text-[11px]">ID:</span>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              title="Click to copy ID"
            >
              <span>{credential.id}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewDetails && onViewDetails(credential)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition-all border border-slate-700/50"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Details
        </button>

        {onShare && (
          <button
            onClick={() => onShare(credential)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-navy-950/70 hover:bg-slate-800 text-brand-accent text-xs font-semibold transition-all border border-brand-accent/20 hover:border-brand-accent/40"
            title="Generate Shareable QR"
          >
            <QrCode className="w-3.5 h-3.5" /> Share
          </button>
        )}

        {onVerify && (
          <button
            onClick={() => onVerify(credential)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold transition-all border border-blue-500/30"
            title="Test Blockchain Verification"
          >
            <Shield className="w-3.5 h-3.5" /> Verify
          </button>
        )}
      </div>
    </div>
  );
};
