import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { DemoRoleBar } from '../components/DemoRoleBar';
import { Navbar } from '../components/Navbar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 bg-grid-pattern text-slate-100">
      <DemoRoleBar />
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
