// client/src/components/SpecsPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SpecsPanel = () => {
  const specs = [
    { label: 'Processor', value: 'AMD Ryzen 9 7950X3D' },
    { label: 'Graphics', value: 'NVIDIA RTX 4090' },
    { label: 'Memory', value: '64GB DDR5' },
    { label: 'Storage', value: '2TB PCIe Gen 5 SSD' },
    { label: 'Cooling', value: 'Liquid Cooling 360mm' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 4 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 w-64">
        <h3 className="text-lg font-bold mb-4">Specifications</h3>
        {specs.map((spec, index) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5 + index * 0.1 }}
            className="mb-3"
          >
            <div className="text-sm text-gray-400">{spec.label}</div>
            <div className="text-white">{spec.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SpecsPanel;