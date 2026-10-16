import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import {
  FilePlus,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Lock,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { generateSimulatedHash } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export const IssuerNewCredential = () => {
  const { currentUser } = useAuth();
  const { issueCredential } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState('Aarav Mehta');
  const [recipientDid, setRecipientDid] = useState('did:trustid:0x55B901C42e89B450A192B45F34E891C023B41199');
  const [title, setTitle] = useState('Bachelor of Computer Applications (BCA)');
  const [type, setType] = useState('Degree Certificate');
  const [grade, setGrade] = useState('First Class with Distinction (CGPA: 9.40)');
  const [major, setMajor] = useState('Information Security & Distributed Systems');
  const [expirationDate, setExpirationDate] = useState('2035-06-30');
  const [description, setDescription] = useState('Conferred upon satisfactory completion of degree curriculum requirements and final project submission.');
  const [claims, setClaims] = useState([
    { key: 'Faculty', value: 'School of Computing Sciences' },
    { key: 'CGPA', value: '9.40 / 10.0' },
    { key: 'Graduation Year', value: '2026' },
  ]);

  const [loading, setLoading] = useState(false);
  const [issuedResult, setIssuedResult] = useState(null);

  // Live calculated hash for preview
  const previewPayload = {
    title,
    type,
    recipientName,
    recipientDid,
    grade,
    issuer: currentUser?.organization || 'Apex Institute of Technology',
  };
  const liveHash = generateSimulatedHash(previewPayload);

  const handleAddClaim = () => {
    setClaims([...claims, { key: '', value: '' }]);
  };

  const handleRemoveClaim = (index) => {
    setClaims(claims.filter((_, i) => i !== index));
  };

  const handleClaimChange = (index, field, val) => {
    const updated = [...claims];
    updated[index][field] = val;
    setClaims(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipientName || !title) {
      addToast('Recipient name and credential title are required', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newCred = issueCredential(
        {
          recipientName,
          recipientDid,
          title,
          type,
          grade,
          major,
          expirationDate,
          description,
          claims: claims.filter((c) => c.key && c.value),
        },
        currentUser
      );

      setLoading(false);
      setIssuedResult(newCred);
      addToast(`Credential minted on-chain! Block #${newCred.blockNumber}`, 'success', 4000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Issue New Credential</h1>
        <p className="text-xs text-slate-400">
          Sign and commit cryptographic verifiable credentials to the smart contract registry
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800/80">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Rohan Sharma"
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Recipient DID / Public Key *
                </label>
                <input
                  type="text"
                  required
                  value={recipientDid}
                  onChange={(e) => setRecipientDid(e.target.value)}
                  placeholder="did:trustid:0x..."
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white font-mono focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Credential Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Bachelor of Computer Applications"
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Credential Classification
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="Degree Certificate">Degree Certificate</option>
                  <option value="Professional Certification">Professional Certification</option>
                  <option value="Course Completion">Course Completion</option>
                  <option value="Student ID Card">Student ID Card</option>
                  <option value="Employment Certificate">Employment Certificate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Awarded Grade / CGPA / Score
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. CGPA: 9.40 or Grade A+"
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Official Credential Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-brand-accent resize-none"
              />
            </div>

            {/* Custom Claims Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-300 uppercase tracking-wider">
                  Verifiable Custom Claims
                </span>
                <button
                  type="button"
                  onClick={handleAddClaim}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Claim
                </button>
              </div>

              <div className="space-y-2">
                {claims.map((claim, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Claim Key (e.g. Honors)"
                      value={claim.key}
                      onChange={(e) => handleClaimChange(idx, 'key', e.target.value)}
                      className="w-1/2 px-3 py-1.5 text-xs bg-navy-950 border border-slate-700 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="Claim Value (e.g. Dean's List)"
                      value={claim.value}
                      onChange={(e) => handleClaimChange(idx, 'value', e.target.value)}
                      className="w-1/2 px-3 py-1.5 text-xs bg-navy-950 border border-slate-700 rounded-lg text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveClaim(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              <span>{loading ? 'Minting On-Chain...' : 'Sign & Issue Credential'}</span>
            </button>
          </form>
        </div>

        {/* Right Live Cryptographic Preview */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-accent">
              Live Cryptographic Pipeline
            </span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready to Sign
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                Calculated Canonical SHA-256 Hash
              </span>
              <p className="font-mono text-[11px] text-brand-accent break-all">
                {liveHash}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">
                Issuing Authority Node
              </span>
              <p className="font-semibold text-white">{currentUser?.organization || 'Apex Institute of Technology'}</p>
              <span className="font-mono text-[10px] text-slate-400 block truncate">
                DID: {currentUser?.did || 'did:trustid:0x89B45C02a4...3F12'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 space-y-1 text-xs">
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <Cpu className="w-3.5 h-3.5" /> Smart Contract Execution Specs
              </span>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Calling <code className="text-brand-accent font-mono">registerCredential(id, hash, validUntil)</code>. Emits <code className="text-purple-300 font-mono">CredentialRegistered</code> event.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {issuedResult && (
        <Modal
          isOpen={true}
          onClose={() => setIssuedResult(null)}
          title="Credential Successfully Issued On-Chain"
          subtitle="Cryptographic fingerprint committed to the IdentityRegistry smart contract"
          maxWidth="max-w-md"
          footer={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIssuedResult(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Issue Another
              </button>
              <button
                onClick={() => navigate('/issuer/credentials')}
                className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-blue-600"
              >
                View Issued List
              </button>
            </div>
          }
        >
          <div className="text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{issuedResult.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Recipient: {issuedResult.recipientName}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Credential ID:</span>
                <span className="font-mono text-brand-accent font-bold">{issuedResult.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Confirmed Block:</span>
                <span className="font-mono text-emerald-400">#{issuedResult.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Tx Hash:</span>
                <span className="font-mono text-slate-400">{issuedResult.transactionHash?.substring(0, 18)}...</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
