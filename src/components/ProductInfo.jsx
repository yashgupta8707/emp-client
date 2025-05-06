// client/src/components/ProductInfo.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductInfo = ({ onViewChange }) => {
  const viewOptions = [
    { id: 'overview', label: 'Overview' },
    { id: 'front', label: 'Front View' },
    { id: 'side', label: 'Side View' },
    { id: 'top', label: 'Top View' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="max-w-xl pointer-events-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            TITAN X
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            The ultimate gaming experience
          </motion.p>
          
          <motion.div
            className="flex space-x-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5 }}
          >
            {viewOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => onViewChange(option.id)}
                className="px-4 py-2 border border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.button
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
          >
            Buy Now - $2,999
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductInfo;