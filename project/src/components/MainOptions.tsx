import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search, User, Bus } from 'lucide-react';

interface MainOptionsProps {
  isLoggedIn: boolean;
}

const MainOptions: React.FC<MainOptionsProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleOptionClick = (route: string) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF39E] px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#132A13] mb-2">
            Namaste Transit
          </h1>
          <p className="text-[#31572C] text-lg">
            Where are you headed today?
          </p>
        </div>
        <button
          onClick={() => handleOptionClick('/profile')}
          className="w-12 h-12 bg-[#90A955] rounded-full flex items-center justify-center shadow-lg"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      </motion.div>

      <div className="space-y-6">
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOptionClick('/track-bus')}
          className="w-full bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#90A955] transition-all duration-300"
        >
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#90A955] to-[#4F772D] rounded-xl flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold text-[#132A13] mb-2">
                Track Bus
              </h3>
              <p className="text-[#31572C] text-lg">
                Real-time tracking of your bus location
              </p>
            </div>
            <Bus className="w-8 h-8 text-[#4F772D]" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOptionClick('/find-bus')}
          className="w-full bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#90A955] transition-all duration-300"
        >
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#90A955] to-[#4F772D] rounded-xl flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-bold text-[#132A13] mb-2">
                Find Bus
              </h3>
              <p className="text-[#31572C] text-lg">
                Search for buses on your route
              </p>
            </div>
            <Bus className="w-8 h-8 text-[#4F772D]" />
          </div>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 bg-white rounded-2xl p-6 shadow-lg"
      >
        <h4 className="text-xl font-bold text-[#132A13] mb-4">
          Quick Tips
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-[#90A955] rounded-full mt-2"></div>
            <p className="text-[#31572C]">Use voice commands for hands-free navigation</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-[#90A955] rounded-full mt-2"></div>
            <p className="text-[#31572C]">Track multiple buses simultaneously</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-[#90A955] rounded-full mt-2"></div>
            <p className="text-[#31572C]">Save your frequent routes for quick access</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainOptions;