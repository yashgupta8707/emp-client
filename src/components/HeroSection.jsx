// client/src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6"
            animate={{ 
              textShadow: ["0 0 10px #3b82f6", "0 0 20px #3b82f6", "0 0 10px #3b82f6"],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            Next Generation
            <br />
            Gaming Rigs
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experience ultimate performance with our cutting-edge gaming systems
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Explore Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;