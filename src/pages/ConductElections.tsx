import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConductElections = () => {
  const [numContestants, setNumContestants] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleNumContestantsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumContestants(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new URLSearchParams(new FormData(form) as any).toString();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxiaDFhVpBuhdArjmdCgkIW55SKs_EubAZ-TvERGIeuLYhIqKkpFIfnkhYr-JcbYbk7/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
        startElectionMonitoring((form.elements.namedItem('start-date') as HTMLInputElement).value, (form.elements.namedItem('end-date') as HTMLInputElement).value);
      } else {
        alert("There was an error submitting the data.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error!', error.message);
      } else {
        console.error('Error!', error);
      }
    }
  };

  const startElectionMonitoring = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now >= start && now <= end) {
      console.log("Election is currently ongoing.");
    } else {
      console.log("Election has ended.");
    }

    setInterval(() => {
      const currentTime = new Date();
      if (currentTime >= end) {
        console.log("Election has ended automatically.");
        // You can trigger an action here, like notifying admins
      }
    }, 60000); // Check every minute
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Conduct Elections</h1>
        </motion.div>

        {showSuccessMessage && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-white">Success</h3>
              </div>
              <p className="text-gray-400 mb-6 text-center">Election Started!</p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-slate-800 rounded-lg p-6 border border-blue-500/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/Admindashimg.png" alt="Conduct Election Illustration" className="w-full rounded-lg shadow-xl" />
          </motion.div>

          <motion.div
            className="bg-slate-800 rounded-lg p-6 border border-blue-500/20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Conduct Elections</h2>
            <form id="electionForm" onSubmit={handleSubmit}>
              <label htmlFor="election-name" className="block text-sm font-medium text-gray-300">Name of the Election:</label>
              <input type="text" id="election-name" name="election-name" required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-lg py-3" />

              <label htmlFor="start-date" className="block text-sm font-medium text-gray-300">Start Date:</label>
              <input type="date" id="start-date" name="start-date" required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-lg py-3" />

              <label htmlFor="end-date" className="block text-sm font-medium text-gray-300">End Date:</label>
              <input type="date" id="end-date" name="end-date" required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-lg py-3" />

              <label htmlFor="num-contestants" className="block text-sm font-medium text-gray-300">Number of Contestants:</label>
              <input type="number" id="num-contestants" name="num-contestants" min="1" value={numContestants} onChange={handleNumContestantsChange} required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4 text-lg py-3" />

              <div id="contestants-section">
                {Array.from({ length: numContestants }).map((_, i) => (
                  <div key={i} className="mb-4">
                    <label htmlFor={`contestant-name-${i + 1}`} className="block text-sm font-medium text-gray-300">Contestant {i + 1} Name:</label>
                    <input type="text" id={`contestant-name-${i + 1}`} name={`contestant-name-${i + 1}`} required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2 text-lg py-3" />

                    <label htmlFor={`contestant-bio-${i + 1}`} className="block text-sm font-medium text-gray-300">Contestant {i + 1} Bio:</label>
                    <input type="text" id={`contestant-bio-${i + 1}`} name={`contestant-bio-${i + 1}`} required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2 text-lg py-3" />

                    <label htmlFor={`contestant-party-${i + 1}`} className="block text-sm font-medium text-gray-300">Contestant {i + 1} Party:</label>
                    <input type="text" id={`contestant-party-${i + 1}`} name={`contestant-party-${i + 1}`} required className="mt-1 block w-full rounded-md bg-slate-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg py-3" />
                  </div>
                ))}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conduct Election
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ConductElections;