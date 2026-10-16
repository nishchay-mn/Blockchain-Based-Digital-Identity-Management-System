import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';

export const QRModal = ({ isOpen, onClose, credential }) => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  if (!credential) return null;

  // The verification URL containing only the non-sensitive public ID/token
  const verificationUrl = `${window.location.origin}/verify?id=${encodeURIComponent(credential.id)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    addToast('Verification link copied to clipboard!', 'success', 2500);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Verifiable Credential"
      subtitle="Generate non-sensitive verification token for instant verifier scanning"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center">
        {/* QR Code Container with sleek border and glow */}
        <div className="relative p-4 rounded-2xl bg-white shadow-2xl border-4 border-slate-700/80 my-2 group">
          <QRCodeSVG
            value={verificationUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Credential summary */}
        <h4 className="text-base font-bold text-white mt-4">{credential.title}</h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Issued by: <span className="text-slate-200 font-medium">{credential.issuerName}</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-950 font-mono text-xs text-brand-accent border border-slate-800">
          ID: {credential.id}
        </span>

        {/* Verification Link Copy Box */}
        <div className="w-full mt-5 p-3 rounded-xl bg-navy-950/80 border border-slate-800 flex items-center justify-between gap-2 text-left">
          <div className="truncate flex-1 font-mono text-xs text-slate-400">
            {verificationUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-blue hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left flex items-start gap-2.5 text-xs text-blue-200">
          <Lock className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-brand-accent font-semibold">Privacy Notice:</strong> This QR code contains only a random cryptographic token reference. Zero personally identifiable information (PII) is encoded in the QR.
          </p>
        </div>
      </div>
    </Modal>
  );
};
