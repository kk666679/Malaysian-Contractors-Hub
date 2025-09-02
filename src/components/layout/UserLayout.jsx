import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActionButton from './FloatingActionButton';
import { motion } from 'framer-motion';

const UserLayout = () => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <p className="text-blue-100 mt-1">
                    Welcome back, {user?.name || 'User'} • Role: {role}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">Active Projects</div>
                  <div className="text-lg font-semibold">3 Projects</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Content */}
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

export default UserLayout;
