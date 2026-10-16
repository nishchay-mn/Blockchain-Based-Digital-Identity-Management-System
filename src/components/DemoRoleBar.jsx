import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { UserCheck, Building2, ShieldCheck, UserCog, RotateCcw, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoRoleBar = () => {
  const { currentUser, role, switchRole } = useAuth();
  const { resetToDemoDefaults } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const roles = [
    { id: 'holder', label: 'Identity Holder', icon: UserCheck, path: '/holder' },
    { id: 'issuer', label: 'Credential Issuer', icon: Building2, path: '/issuer' },
    { id: 'verifier', label: 'Verifier Portal', icon: ShieldCheck, path: '/verifier' },
    { id: 'admin', label: 'Governance Admin', icon: UserCog, path: '/admin' },
  ];

  const handleRoleChange = (roleId, path) => {
    switchRole(roleId);
    navigate(path);
    addToast(`Switched active persona to ${roles.find(r => r.id === roleId)?.label}`, 'info', 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo credentials, issuers, and verification history to fresh academic defaults?')) {
      resetToDemoDefaults();
      addToast('Reset completed! All demo data restored.', 'success', 3000);
    }
  };

  return (
    <div className="bg-navy-950 border-b border-brand-accent/20 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between text-xs">
        {/* Left: Project Branding / Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 hidden sm:inline">
            TrustID Project Sandbox
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            Simulated Web3 Network
          </span>
        </div>

        {/* Right: Role Switcher Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-slate-400 text-[11px] hidden md:inline mr-1">Switch Role:</span>
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRoleChange(r.id, r.path)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-sm ring-1 ring-brand-accent/50'
                    : 'bg-navy-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white'
                }`}
                title={`Switch to ${r.label}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            );
          })}

          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-navy-900 border border-transparent hover:border-slate-800 transition-colors ml-1"
            title="Reset All Mock Data to Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
