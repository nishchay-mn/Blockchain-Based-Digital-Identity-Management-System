import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, subtitle, color = 'blue' }) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:border-blue-500/40',
      iconBg: 'bg-blue-500/15 text-blue-400',
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:border-amber-500/40',
      iconBg: 'bg-amber-500/15 text-amber-400',
    },
    purple: {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:border-purple-500/40',
      iconBg: 'bg-purple-500/15 text-purple-400',
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:border-rose-500/40',
      iconBg: 'bg-rose-500/15 text-rose-400',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="glass-card group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{value}</h3>
          {(trend || subtitle) && (
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
              {trend && <span className="text-emerald-400 font-semibold">{trend}</span>}
              {subtitle && <span>{subtitle}</span>}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border border-white/5 ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Subtle bottom decorative light line */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
