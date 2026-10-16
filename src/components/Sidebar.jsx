import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  UserCheck,
  Award,
  QrCode,
  History,
  Settings,
  Building2,
  FilePlus,
  Files,
  ShieldCheck,
  Search,
  ScanLine,
  UserCog,
  CheckSquare,
  Users,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  Layers,
} from 'lucide-react';

export const Sidebar = () => {
  const { currentUser, role, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Navigation Links mapped by Role
  const holderLinks = [
    { name: 'Overview', path: '/holder', icon: LayoutDashboard, exact: true },
    { name: 'My Digital Identity', path: '/holder/identity', icon: UserCheck },
    { name: 'My Credentials', path: '/holder/credentials', icon: Award },
    { name: 'Share Credential', path: '/holder/share', icon: QrCode },
    { name: 'Verification History', path: '/holder/history', icon: History },
    { name: 'Account Settings', path: '/holder/settings', icon: Settings },
  ];

  const issuerLinks = [
    { name: 'Issuer Overview', path: '/issuer', icon: LayoutDashboard, exact: true },
    { name: 'Issue New Credential', path: '/issuer/issue', icon: FilePlus },
    { name: 'Issued Credentials', path: '/issuer/credentials', icon: Files },
    { name: 'Institution Profile', path: '/issuer/profile', icon: Building2 },
  ];

  const verifierLinks = [
    { name: 'Verifier Overview', path: '/verifier', icon: LayoutDashboard, exact: true },
    { name: 'Verify by ID', path: '/verifier/verify', icon: Search },
    { name: 'Scan QR Code', path: '/verifier/scanner', icon: ScanLine },
    { name: 'Verification History', path: '/verifier/history', icon: History },
  ];

  const adminLinks = [
    { name: 'Governance Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Issuer Approvals', path: '/admin/issuers', icon: CheckSquare },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Credential Ledger', path: '/admin/credentials', icon: Layers },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText },
  ];

  const getLinks = () => {
    switch (role) {
      case 'issuer':
        return issuerLinks;
      case 'verifier':
        return verifierLinks;
      case 'admin':
        return adminLinks;
      default:
        return holderLinks;
    }
  };

  const currentLinks = getLinks();

  const getRoleLabel = () => {
    switch (role) {
      case 'issuer':
        return 'Issuing Authority';
      case 'verifier':
        return 'Verifier Node';
      case 'admin':
        return 'Governance Admin';
      default:
        return 'Identity Holder';
    }
  };

  return (
    <aside
      className={`glass-panel border-r border-slate-800/80 bg-navy-950/95 flex flex-col justify-between transition-all duration-300 z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-accent flex-shrink-0" />
              <div className="truncate">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Console
                </span>
                <p className="text-xs font-semibold text-white truncate">{getRoleLabel()}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1">
          {currentLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-navy-900/40">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full border border-slate-700 object-cover flex-shrink-0"
            />
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
