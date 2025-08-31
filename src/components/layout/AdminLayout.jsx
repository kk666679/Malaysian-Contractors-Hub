import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActionButton from './FloatingActionButton';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Admin Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Admin Panel</h1>
                  <p className="text-red-100 mt-1">
                    Welcome back, {user?.name || 'Admin'} • Role: {role}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-red-100">System Status</div>
                  <div className="text-lg font-semibold">All Systems Operational</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Admin Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default AdminLayout;
