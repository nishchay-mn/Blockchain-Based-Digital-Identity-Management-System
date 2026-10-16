import React from 'react';
import { Link } from 'react-router-dom';
import { DemoRoleBar } from '../components/DemoRoleBar';
import { Navbar } from '../components/Navbar';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Briefcase,
  UserCheck,
  Terminal,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 bg-grid-pattern flex flex-col">
      <DemoRoleBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-brand-accent text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>BCA Major Project — Web3 Verifiable Credentials</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Your Identity.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-blue-400 to-indigo-400">
                  Your Control.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Secure, user-controlled digital identity verification powered by decentralized blockchain concepts. Authorized institutions issue cryptographically signed credentials, while zero sensitive personal information is stored on-chain.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/holder"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 transition-all"
                >
                  <span>Explore Dashboard</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <Link
                  to="/verifier"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-slate-800 text-brand-accent font-semibold text-sm border border-brand-accent/30 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </Link>
              </div>

              {/* Feature Pill Tags */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zero PII On-Chain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tamper Detection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Selective Disclosure</span>
                </div>
              </div>
            </div>

            {/* Right Hero: Live Interactive Digital Identity Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Decorative border glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-accent to-blue-600 opacity-30 blur-lg" />

                <div className="relative glass-card rounded-2xl border border-slate-700/80 p-6 shadow-2xl space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-brand-accent">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-brand-accent uppercase tracking-wider">
                          Digital Credential
                        </span>
                        <h4 className="text-sm font-bold text-white">Bachelor of Computer Applications</h4>
                      </div>
                    </div>
                    <StatusBadge status="VERIFIED" size="sm" />
                  </div>

                  {/* Claims List */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400">
                      <span>Subject:</span>
                      <span className="text-white font-medium">Rohan Sharma</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400">
                      <span>Authority:</span>
                      <span className="text-brand-accent font-medium">Apex Institute of Technology</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40 text-slate-400">
                      <span>Grade:</span>
                      <span className="text-emerald-400 font-semibold">First Class with Distinction</span>
                    </div>
                  </div>

                  {/* Blockchain Commitment Hash Box */}
                  <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-brand-accent" /> On-Chain Hash Commitment
                    </span>
                    <p className="font-mono text-[11px] text-slate-300 break-all select-all">
                      0xa4f89d123e89bc5612f04e789a12c345d678e901f23456789abcdef012345678
                    </p>
                  </div>

                  {/* Verification Status Banner */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Smart Contract Verification
                    </span>
                    <span className="font-mono text-[11px]">Block #124102</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section (Clearly Identified Illustrative Figures) */}
      <section className="py-12 border-y border-slate-800/80 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Illustrative Demonstration Metrics
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
              <h3 className="text-3xl font-extrabold text-white">10,000+</h3>
              <p className="text-xs text-slate-400 mt-1">Credentials Issued</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
              <h3 className="text-3xl font-extrabold text-brand-accent">0%</h3>
              <p className="text-xs text-slate-400 mt-1">Tamper Tolerance</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
              <h3 className="text-3xl font-extrabold text-emerald-400">&lt; 1.8s</h3>
              <p className="text-xs text-slate-400 mt-1">Instant Verification</p>
            </div>
            <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800">
              <h3 className="text-3xl font-extrabold text-indigo-400">100%</h3>
              <p className="text-xs text-slate-400 mt-1">Privacy Preserved Off-Chain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
              Core Security Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Decentralized Identity Matters
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Eliminating forged degrees, fake employment records, and centralized data honeypots through public-key cryptography and on-chain immutability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-accent/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-brand-accent flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Zero PII On-Chain</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Personal names, grades, and private records are stored safely off-chain. Only cryptographic SHA-256 commitments reside on the blockchain.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-accent/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Tamper Detection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modifying even a single character in a credential changes its cryptographic hash, immediately triggering verification rejection.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-accent/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Cryptographic Signatures</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Issuers sign credentials with an ECDSA private key. Verifiers check the signature against the issuer's public Ethereum address.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-accent/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Instant Revocation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Issuing authorities can revoke a credential on-chain in real time. Verifiers immediately detect revoked credentials worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (4 Steps) */}
      <section className="py-20 bg-navy-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
              Workflow Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How TrustID Works in 4 Steps
            </h2>
            <p className="text-sm text-slate-400">
              From cryptographic issuance to tamper-proof verification in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-accent flex items-center justify-center font-mono font-bold text-sm">
                1
              </span>
              <h3 className="text-base font-bold text-white">Create Digital Identity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The user generates a decentralized identifier (DID) representing their self-sovereign cryptographic identity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-accent flex items-center justify-center font-mono font-bold text-sm">
                2
              </span>
              <h3 className="text-base font-bold text-white">Credential Issuance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An authorized institution issues a degree or certificate, signs it digitally, and computes its canonical hash.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-accent flex items-center justify-center font-mono font-bold text-sm">
                3
              </span>
              <h3 className="text-base font-bold text-white">Blockchain Commitment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The smart contract commits the credential hash, issuer address, and expiration date on-chain.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-brand-blue/20 text-brand-accent flex items-center justify-center font-mono font-bold text-sm">
                4
              </span>
              <h3 className="text-base font-bold text-white">Instant Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verifiers scan a QR code or ID to compare signatures and blockchain hashes, ensuring absolute validity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Use Cases */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
              Real-World Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built for Academic & Enterprise Ecosystems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Universities & Colleges</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly issue verifiable graduation certificates, transcripts, and diplomas. Eliminate manual verification phone calls and transcript forgery completely.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Employers & Recruiters</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify candidates' educational degrees and professional certifications in seconds via QR code or ID lookup without hiring third-party background check agencies.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Identity Holders / Students</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Store all academic achievements in a single self-sovereign digital wallet. Share credentials with selective disclosure without exposing unrelated private details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-navy-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            <span className="font-bold text-slate-200">TrustID System</span>
            <span>— BCA Final Year Major Project Demonstration</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Project Architecture
            </Link>
            <Link to="/how-it-works" className="hover:text-white transition-colors">
              Workflow Guide
            </Link>
            <Link to="/verifier" className="hover:text-white transition-colors">
              Public Verification
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
