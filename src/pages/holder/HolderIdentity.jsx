import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import {
  User,
  Copy,
  Check,
  Edit3,
  KeyRound,
  Shield,
  Building,
  Mail,
  Phone,
  FileBadge,
  Sparkles,
  Fingerprint,
} from 'lucide-react';

export const HolderIdentity = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [copiedDid, setCopiedDid] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form edit state
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');

  const simulatedPublicKey = '0x04e84b9c1a2d5f7890123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef1b';

  const handleCopyDid = () => {
    navigator.clipboard.writeText(currentUser?.did || '');
    setCopiedDid(true);
    addToast('DID copied to clipboard', 'info');
    setTimeout(() => setCopiedDid(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(simulatedPublicKey);
    setCopiedKey(true);
    addToast('Public key copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      bio: editBio,
    });
    setIsEditOpen(false);
    addToast('Digital profile updated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Digital Identity</h1>
          <p className="text-xs text-slate-400">
            W3C Decentralized Identifier (DID) and cryptographic profile
          </p>
        </div>
        <button
          onClick={() => {
            setEditName(currentUser?.name || '');
            setEditPhone(currentUser?.phone || '');
            setEditBio(currentUser?.bio || '');
            setIsEditOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition-colors"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-6 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={currentUser?.name}
              className="w-24 h-24 rounded-full border-2 border-brand-accent p-1 object-cover shadow-xl"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-navy-950 flex items-center justify-center text-white" title="Active">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{currentUser?.name}</h2>
            <p className="text-xs text-slate-400">{currentUser?.institution || 'Apex Institute of Technology'}</p>
            <div className="mt-2 flex items-center justify-center">
              <StatusBadge status="ACTIVE" size="sm" />
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic px-2">
            "{currentUser?.bio || 'BCA Final year student focused on blockchain technologies and decentralized identity.'}"
          </p>

          <div className="w-full pt-4 border-t border-slate-800 space-y-3 text-xs text-left">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="truncate">{currentUser?.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span>{currentUser?.phone || '+91 98765 43210'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Building className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span>{currentUser?.institution || 'Apex Institute of Technology'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <FileBadge className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span>Student Roll: {currentUser?.studentId || 'AIT-2021-BCA-104'}</span>
            </div>
          </div>
        </div>

        {/* Cryptographic Specifications & Identity Commitment */}
        <div className="lg:col-span-2 space-y-6">
          {/* DID Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-brand-accent" />
                Decentralized Identifier (DID)
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-navy-950 px-2 py-0.5 rounded border border-slate-800">
                W3C DID v1.0
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Your DID is your globally unique, cryptographically verifiable identifier. It belongs solely to you and does not depend on any centralized authority.
            </p>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-brand-accent break-all select-all">
                {currentUser?.did || 'did:trustid:0x71C8A9b2345091E45F129a83B61cD513A17B49A0'}
              </div>
              <button
                onClick={handleCopyDid}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                title="Copy DID"
              >
                {copiedDid ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Cryptographic Keypair Specs */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-purple-400" />
              Cryptographic Credentials & Public Key
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Algorithm</span>
                <p className="font-mono text-slate-200 mt-1">ECDSA secp256k1</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Registry Network</span>
                <p className="font-mono text-slate-200 mt-1">TrustID EVM Chain #31337</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Identity Status</span>
                <p className="font-mono text-emerald-400 mt-1">Committed On-Chain</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                Public Verification Key
              </span>
              <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] text-slate-400 break-all select-all">
                  {simulatedPublicKey}
                </p>
                <button
                  onClick={handleCopyKey}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                  title="Copy Public Key"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2">
              <Shield className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
              <p>
                Your private signing key is stored in local encrypted browser keystore memory and never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Digital Identity Profile"
        subtitle="Permitted profile fields stored in your sovereign off-chain record"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Bio Summary
            </label>
            <textarea
              rows={3}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-navy-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-brand-accent resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-blue text-white font-bold hover:bg-blue-600"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
