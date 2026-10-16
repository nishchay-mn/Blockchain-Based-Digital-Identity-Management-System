import React from 'react';
import { DemoRoleBar } from '../components/DemoRoleBar';
import { Navbar } from '../components/Navbar';
import { Shield, Lock, Database, Code, CheckCircle2, AlertTriangle, Layers, Cpu } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 bg-grid-pattern flex flex-col">
      <DemoRoleBar />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-accent">
            Academic Project Overview
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Blockchain-Based Digital Identity Management System
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive BCA major project demonstrating self-sovereign identity (SSI), tamper-proof verifiable credentials, and decentralized trust mechanisms.
          </p>
        </div>

        {/* Existing vs Proposed System Table */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-accent" />
            Comparative Analysis: Existing Centralized vs. Proposed System
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-900/90 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Dimension</th>
                  <th className="p-3 text-rose-400">Traditional Centralized Identity</th>
                  <th className="p-3 text-emerald-400">Proposed TrustID Blockchain System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-white">Storage Architecture</td>
                  <td className="p-3 text-slate-400">Centralized database honeypot (high breach risk).</td>
                  <td className="p-3 text-emerald-300 font-medium">Decentralized: PII stored off-chain; cryptographic hashes on-chain.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Tamper Detection</td>
                  <td className="p-3 text-slate-400">Manual inspection, phone calls, easily modified PDFs.</td>
                  <td className="p-3 text-emerald-300 font-medium">Cryptographic hash comparison (SHA-256) detects 1-bit alteration.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">User Ownership</td>
                  <td className="p-3 text-slate-400">Identity owned and governed by centralized providers.</td>
                  <td className="p-3 text-emerald-300 font-medium">Self-Sovereign Identity (SSI): Holder controls sharing and consent.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Revocation Checking</td>
                  <td className="p-3 text-slate-400">Delayed, often impossible once paper/PDF is distributed.</td>
                  <td className="p-3 text-emerald-300 font-medium">Instant on-chain revocation flag check in milliseconds.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* System Architecture Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-brand-accent flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Smart Contract Registry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Implemented in Solidity (<code className="text-brand-accent font-mono">IdentityRegistry.sol</code>). Maintains authorized issuer mappings, credential hash commitments, and revocation statuses.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Cryptographic Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ECDSA digital signatures, SHA-256 canonical hashing, and decentralized identifiers (DIDs) ensure mathematical integrity without centralized authority.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Privacy-First Storage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conforms strictly to privacy guidelines: zero sensitive PII is ever committed to the public ledger, eliminating GDPR/privacy compliance violations.
            </p>
          </div>
        </div>

        {/* Project Objectives List */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Key Academic Objectives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Demonstrate how blockchain immutability prevents credential forgery.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Provide role-based dashboards for Holders, Issuers, Verifiers, and Admins.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Implement interactive QR code generation and instant verification flows.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>Highlight cryptographic hash mismatch through an interactive tamper sandbox.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
