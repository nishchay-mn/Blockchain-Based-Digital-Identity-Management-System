import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Building2, Award, ShieldCheck, KeyRound, Mail, CheckCircle2 } from 'lucide-react';

export const IssuerProfile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Institution Profile</h1>
        <p className="text-xs text-slate-400">
          Decentralized issuing authority identity & governance accreditation
        </p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentUser?.organization || 'Apex Institute of Technology'}
              </h2>
              <p className="text-xs text-slate-400">Accredited Higher Education Institution</p>
            </div>
          </div>
          <StatusBadge status="APPROVED" size="md" />
        </div>

        {/* Accreditation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">
              Accreditation Proof
            </span>
            <p className="font-semibold text-white">Government Education Board ID: NAAC-A-GRADE-2023-891</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">
              Administrator Contact
            </span>
            <p className="font-semibold text-white">{currentUser?.email || 'registrar@apex.edu'}</p>
          </div>
        </div>

        {/* Blockchain Authority Keys */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-brand-accent" />
            Blockchain Signing Node Specifications
          </h3>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 text-xs font-mono text-slate-300 break-all space-y-2">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Issuer Ethereum Address</span>
              <span className="text-emerald-400">
                {currentUser?.walletAddress || '0x89B45C02a45B789C12E354F1023a94B68c3F12C1'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Issuer DID</span>
              <span className="text-brand-accent">
                {currentUser?.did || 'did:trustid:0x89B45C02a45B789C12E354F1023a94B68c3F12C1'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Smart Contract Authorization:</strong> This institution address is registered in the <code className="text-white font-mono">issuers</code> mapping of the IdentityRegistry smart contract. Credentials signed by this key are mathematically verified by any verifier node.
          </p>
        </div>
      </div>
    </div>
  );
};
