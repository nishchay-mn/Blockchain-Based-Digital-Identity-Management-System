import React from 'react';
import { DemoRoleBar } from '../components/DemoRoleBar';
import { Navbar } from '../components/Navbar';
import { KeyRound, PenTool, Hash, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksPage = () => {
  const steps = [
    {
      num: '01',
      title: 'Digital Identity Creation (DID)',
      icon: KeyRound,
      badge: 'Subject Phase',
      desc: 'The user creates an account and generates a unique Decentralized Identifier (DID) representing their self-sovereign cryptographic identity. The DID is derived from an asymmetric cryptographic keypair.',
      code: 'did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0',
    },
    {
      num: '02',
      title: 'Issuance & Digital Signing',
      icon: PenTool,
      badge: 'Issuer Authority',
      desc: 'An accredited authority (e.g. University) verifies student records, creates a canonical credential payload (degree, major, CGPA), and signs it using the institution’s private signing key.',
      code: 'Signature: 0x98124bdf89e1a23c4d5e6f7890123456789abcdef...1b',
    },
    {
      num: '03',
      title: 'Blockchain Commitment Hash',
      icon: Hash,
      badge: 'Smart Contract',
      desc: 'The backend calculates the SHA-256 / Keccak-256 hash of the canonical credential. This 32-byte cryptographic fingerprint is committed on-chain via the IdentityRegistry smart contract. No private PII is stored on-chain.',
      code: 'registerCredential(bytes32 credentialId, bytes32 credentialHash, uint64 validUntil)',
    },
    {
      num: '04',
      title: 'Independent Verification',
      icon: ShieldCheck,
      badge: 'Verifier Phase',
      desc: 'When the holder presents a QR code or ID, the verifier recalculates the payload hash and compares it directly against the blockchain contract. If a single character was altered, the check fails instantly.',
      code: 'verifyCredential(credentialId, checkHash) => (isValid, hashMatches, isRevoked)',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 bg-grid-pattern flex flex-col">
      <DemoRoleBar />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
            Workflow Architecture
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            How TrustID Operates Under The Hood
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Understanding the end-to-end cryptographic lifecycle from issuance to mathematical verification.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="space-y-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-black text-brand-accent/50">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {s.badge}
                      </span>
                      <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{s.desc}</p>

                <div className="p-3 rounded-xl bg-navy-950 border border-slate-800/80 font-mono text-xs text-brand-accent break-all">
                  {s.code}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-850 border border-brand-accent/30 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Ready to test the verification pipeline?</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Try verifying an existing student credential or tamper with the payload to see the detection in action.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/verifier"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <span>Launch Verifier Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
