import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Holder Pages
import { HolderOverview } from './pages/holder/HolderOverview';
import { HolderIdentity } from './pages/holder/HolderIdentity';
import { HolderCredentials } from './pages/holder/HolderCredentials';
import { HolderShare } from './pages/holder/HolderShare';
import { HolderHistory } from './pages/holder/HolderHistory';
import { HolderSettings } from './pages/holder/HolderSettings';

// Issuer Pages
import { IssuerOverview } from './pages/issuer/IssuerOverview';
import { IssuerNewCredential } from './pages/issuer/IssuerNewCredential';
import { IssuerIssuedList } from './pages/issuer/IssuerIssuedList';
import { IssuerProfile } from './pages/issuer/IssuerProfile';

// Verifier Pages
import { VerifierOverview } from './pages/verifier/VerifierOverview';
import { VerifierVerify } from './pages/verifier/VerifierVerify';
import { VerifierScanner } from './pages/verifier/VerifierScanner';
import { VerifierHistory } from './pages/verifier/VerifierHistory';

// Admin Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminIssuers } from './pages/admin/AdminIssuers';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminCredentials } from './pages/admin/AdminCredentials';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Identity Holder Dashboard */}
              <Route path="/holder" element={<DashboardLayout />}>
                <Route index element={<HolderOverview />} />
                <Route path="identity" element={<HolderIdentity />} />
                <Route path="credentials" element={<HolderCredentials />} />
                <Route path="share" element={<HolderShare />} />
                <Route path="history" element={<HolderHistory />} />
                <Route path="settings" element={<HolderSettings />} />
              </Route>

              {/* Credential Issuer Dashboard */}
              <Route path="/issuer" element={<DashboardLayout />}>
                <Route index element={<IssuerOverview />} />
                <Route path="issue" element={<IssuerNewCredential />} />
                <Route path="credentials" element={<IssuerIssuedList />} />
                <Route path="profile" element={<IssuerProfile />} />
              </Route>

              {/* Verifier Dashboard */}
              <Route path="/verifier" element={<DashboardLayout />}>
                <Route index element={<VerifierOverview />} />
                <Route path="verify" element={<VerifierVerify />} />
                <Route path="scanner" element={<VerifierScanner />} />
                <Route path="history" element={<VerifierHistory />} />
              </Route>

              {/* Administrator Dashboard */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="issuers" element={<AdminIssuers />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="credentials" element={<AdminCredentials />} />
                <Route path="audit-logs" element={<AdminAuditLogs />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
