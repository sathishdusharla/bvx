// src/pages/VoterDashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Vote, Users } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';
import { motion } from 'framer-motion';

const VoterDashboard = () => {
  const [voterData, setVoterData] = useState({
    name: 'Loading...',
    email: 'Loading...',
    validID: 'Loading...',
    uniqueID: 'Loading...',
    mobile: 'Loading...',
    qrCode: ''
  });
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  useEffect(() => {
    const email = localStorage.getItem('voterEmail');
    if (email) {
      fetchVoterData(email);
    } else {
      alert('No email provided. Please log in again.');
      navigate('/voter-login');
    }
  }, [navigate]);

  const fetchVoterData = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbwmyVk0E_apJzK-bgzWWWk-BEgxfCFBl_b1aXnwQfwsUtYvXkKksSl7DGH3uy2LzQ-zLw/exec?email=${email}`);
      const data = await response.json();
      if (data.error) {
        alert('Voter not found!');
        navigate('/voter-login');
      } else {
        setVoterData(data);
      }
    } catch (error) {
      console.error('Error fetching voter data:', error);
      alert('An error occurred while fetching voter data.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoteClick = () => {
    navigate('/voting');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <motion.div
            className="space-y-8 lg:col-span-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Welcome, {voterData.name}
              </span>
              <br />
              <span className="text-white">
              </span>
            </h1>
            
            <p className="text-xl text-gray-400">
              Here you can view profile and cast your vote securely.
            </p>

            <motion.button
              onClick={handleVoteClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cast Your Vote
            </motion.button>
          </motion.div>

          <motion.div
            className="bg-slate-800 p-8 rounded-lg shadow-xl border border-blue-500/20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Profile</h2>
            <div className="space-y-6">
              <div>
                <p className="block text-sm font-medium text-gray-300">
                  <strong>Name:</strong> {voterData.name}
                </p>
                <p className="block text-sm font-medium text-gray-300">
                  <strong>Email:</strong> {voterData.email}
                </p>
                <p className="block text-sm font-medium text-gray-300">
                  <strong>Valid ID:</strong> {voterData.validID}
                </p>
                <p className="block text-sm font-medium text-gray-300">
                  <strong>Unique ID:</strong> {voterData.uniqueID}
                </p>
                <p className="block text-sm font-medium text-gray-300">
                  <strong>Mobile:</strong> {voterData.mobile}
                </p>
                <p className="block text-sm font-medium text-gray-300">
                  <strong></strong>
                </p>
                {/* qr image space */}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Vote className="w-8 h-8 text-purple-500" />}
            title="Your Right to Vote"
            description="Every vote counts. Exercise your right to vote and make a difference."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="Motivation to Vote"
            description="Voting is a powerful way to influence the future. Your vote matters."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Secure Voting"
            description="Our platform ensures your vote is confidential and tamper-proof."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800 hover:bg-white/5 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

export default VoterDashboard;
