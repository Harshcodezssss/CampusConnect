import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ToastNotification from './ToastNotification';
import { useApp } from '../context/AppContext';

const AppLayout = () => {
  const { toast, hideToast } = useApp();

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastNotification toast={toast} onClose={hideToast} />
    </div>
  );
};

export default AppLayout;

