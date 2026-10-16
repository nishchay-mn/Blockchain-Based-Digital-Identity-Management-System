import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Camera, Upload, ShieldCheck, Sparkles, Clock, ShieldAlert } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const VerifierScanner = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [scanning, setScanning] = useState(false);

  const simulateScan = (credentialId) => {
    setScanning(true);
    addToast('QR Code Detected! Decrypting verification token...', 'info', 1500);

    setTimeout(() => {
      setScanning(false);
      navigate(`/verifier/verify?id=${encodeURIComponent(credentialId)}`);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">QR Code Scanner</h1>
        <p className="text-xs text-slate-400">
          Point camera at a TrustID verifiable credential QR code or trigger simulated scan
        </p>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 flex flex-col items-center space-y-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-navy-950 border-2 border-slate-700/80 overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Corner target reticles */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-brand-accent" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-brand-accent" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-brand-accent" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-brand-accent" />

          {/* Animated Scan Line */}
          <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent shadow-[0_0_15px_#38BDF8] animate-pulse" />

          <div className="text-center space-y-2 p-4 text-slate-500">
            <Camera className="w-10 h-10 mx-auto text-slate-600 stroke-[1.5]" />
            <p className="text-xs font-mono text-slate-400">
              {scanning ? 'Decoding Token...' : 'Align QR Code within Frame'}
            </p>
          </div>
        </div>

        {/* 1-Click Scan Simulation Triggers */}
        <div className="w-full space-y-3 pt-2 text-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Simulate Instant Camera QR Scans:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => simulateScan('CRED-AIT-2025-089')}
              disabled={scanning}
              className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Scan Valid Degree</span>
            </button>

            <button
              onClick={() => simulateScan('CRED-CAMPUS-2024-41')}
              disabled={scanning}
              className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Scan Expired Pass</span>
            </button>

            <button
              onClick={() => simulateScan('CRED-INTERN-2024-082')}
              disabled={scanning}
              className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Scan Revoked Cert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
