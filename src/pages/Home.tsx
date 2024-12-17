import { Link } from 'react-router-dom';
import { Shield, Vote, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background SVG with floating animation */}
      <motion.div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"
        animate={{
          y: [0, 10, 0], // Floating up and down
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
      ></motion.div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Heading and Buttons */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Secure. Transparent.
              </span>
              <br />
              <span className="text-white">
                Reliable Voting for Everyone
              </span>
            </h1>

            <motion.p
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Experience the future of democratic participation with our
              blockchain-powered voting platform.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/voter-login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300"
                >
                  Voter Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/voter-registration"
                  className="bg-transparent border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full hover:bg-blue-500/20 transition-all duration-300"
                >
                  Register Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Section - Feature Cards */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
            ></motion.div>

            <div className="relative bg-slate-800 rounded-2xl p-8 border border-blue-500/30">
              <div className="grid gap-6">
                <FeatureCard
                  icon={<Shield className="w-8 h-8 text-blue-500" />}
                  title="Secure Blockchain"
                  description="Military-grade encryption ensures your vote remains confidential and tamper-proof."
                />
                <FeatureCard
                  icon={<Vote className="w-8 h-8 text-purple-500" />}
                  title="Transparent Process"
                  description="Track your vote in real-time with our innovative blockchain technology."
                />
                <FeatureCard
                  icon={<Users className="w-8 h-8 text-blue-500" />}
                  title="Universal Access"
                  description="Vote from anywhere, anytime with our user-friendly platform."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
    whileHover={{ scale: 1.1, rotate: 2 }}
    animate={{
      y: [0, -2, 2, 0], // Multi-directional float
      x: [0, 1, -1, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </motion.div>
);

export default Home;
