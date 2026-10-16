import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const normStatus = (status || '').toUpperCase();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm',
  };

  let config = {
    bg: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    icon: Clock,
    label: normStatus || 'UNKNOWN',
    dot: 'bg-slate-400',
  };

  if (normStatus === 'VERIFIED' || normStatus === 'APPROVED' || normStatus === 'ACTIVE') {
    config = {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: CheckCircle2,
      label: normStatus === 'APPROVED' ? 'Approved Authority' : normStatus === 'ACTIVE' ? 'Active Identity' : 'Blockchain Verified',
      dot: 'bg-emerald-400 animate-pulse',
    };
  } else if (normStatus === 'REVOKED') {
    config = {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: ShieldAlert,
      label: 'Revoked on-chain',
      dot: 'bg-rose-400',
    };
  } else if (normStatus === 'EXPIRED') {
    config = {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: Clock,
      label: 'Expired Credential',
      dot: 'bg-amber-400',
    };
  } else if (normStatus === 'INVALID') {
    config = {
      bg: 'bg-red-500/15 text-red-400 border-red-500/40',
      icon: XCircle,
      label: 'Invalid / Tampered',
      dot: 'bg-red-500',
    };
  } else if (normStatus === 'PENDING') {
    config = {
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: AlertTriangle,
      label: 'Pending Approval',
      dot: 'bg-blue-400 animate-pulse',
    };
  }

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm backdrop-blur-sm ${config.bg} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};
