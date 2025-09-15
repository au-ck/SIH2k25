import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#132A13] to-[#4F772D] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="w-32 h-32 bg-[#90A955] rounded-full flex items-center justify-center shadow-2xl">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl"
          >
            🙏
          </motion.div>
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-4xl font-bold text-white mb-4 text-center"
      >
        Namaste Transit
      </motion.h1>
      
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-[#ECF39E] text-lg text-center px-8"
      >
        Your Journey, Our Priority
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-8"
      >
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#90A955] rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-[#90A955] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-[#90A955] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;