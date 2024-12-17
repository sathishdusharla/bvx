import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  // Redirect to login if the user is not logged in
  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    if (!email) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1000); // Simulate a delay for the loading animation
  };

  const handleAddAdminClick = () => {
    handleNavigation('/admin/add-admin');
  };

  const handleConductElectionsClick = () => {
    handleNavigation('/admin/conduct-elections');
  };

  const handleResultsClick = () => {
    handleNavigation('/results');
  };

  const handleLogoutClick = () => {
    setLoading(true);
    localStorage.removeItem('adminEmail'); // Clear the admin session
    setTimeout(() => {
      setLoading(false);
      navigate('/admin-login'); // Redirect to login page
    }, 1000); // Simulate a delay for the loading animation
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-8 py-12">
      <motion.div
        className="bg-slate-800 rounded-lg p-8 shadow-xl w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-center mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="w-8 h-8 text-blue-500" />
          <h2 className="ml-3 text-3xl font-bold text-white">Admin Dashboard</h2>
        </motion.div>

        <div className="flex justify-between items-center">
          {/* Left Section: Buttons */}
          <motion.div
            className="flex flex-col gap-4 w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={handleAddAdminClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Admin
            </motion.button>

            <motion.button
              onClick={handleConductElectionsClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conduct Elections
            </motion.button>

            <motion.button
              onClick={handleResultsClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Results
            </motion.button>
          </motion.div>

          {/* Center Section: Image */}
          <motion.div
            className="flex justify-center items-center w-1/3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="Admindashimg.png" alt="Admin Dashboard Illustration" className="max-w-xs" />
          </motion.div>
        </div>

        {/* Logout Button */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={handleLogoutClick}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Restricted Access Text */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400">
            Access restricted to authorized administrators only.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;