// client/src/components/ColorPicker.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ColorPicker = ({ onColorChange }) => {
  const colors = [
    { name: 'Midnight Black', value: '#1a1a1a' },
    { name: 'Cosmic Blue', value: '#1a3d5c' },
    { name: 'Galaxy Purple', value: '#3a1a5c' },
    { name: 'Steel Gray', value: '#2c3e50' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 5.5 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <h3 className="text-sm text-gray-400 mb-2">Choose Color</h3>
      <div className="flex space-x-4">
        {colors.map((color) => (
          <motion.button
            key={color.name}
            onClick={() => onColorChange(color.value)}
            className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
            style={{ backgroundColor: color.value }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={color.name}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ColorPicker;