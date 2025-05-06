// client/src/components/PriceUpdater.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PriceUpdater = ({ basePrice, priceModifiers }) => {
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  
  useEffect(() => {
    const totalPrice = basePrice + Object.values(priceModifiers).reduce((acc, curr) => acc + curr, 0);
    setCurrentPrice(totalPrice);
  }, [priceModifiers]);

  return (
    <motion.div
      className="fixed top-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 7 }}
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 min-w-[200px]">
        <h3 className="text-sm text-gray-400 mb-2">Current Price</h3>
        <motion.div
          className="text-3xl font-bold"
          animate={{ 
            opacity: [1, 0.7, 1],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 0.3,
            times: [0, 0.5, 1]
          }}
          key={currentPrice}
        >
          ${currentPrice.toLocaleString()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PriceUpdater;