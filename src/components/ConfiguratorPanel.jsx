// client/src/components/ConfiguratorPanel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ConfiguratorPanel = ({ onConfigurationChange }) => {
  const [activePanel, setActivePanel] = useState('cpu');
  
  const configurations = {
    cpu: [
      { id: 'ryzen9', name: 'AMD Ryzen 9 7950X3D', price: 0 },
      { id: 'i9', name: 'Intel Core i9-13900K', price: -200 },
      { id: 'ryzen7', name: 'AMD Ryzen 7 7800X3D', price: -300 },
    ],
    gpu: [
      { id: 'rtx4090', name: 'NVIDIA RTX 4090', price: 0 },
      { id: 'rtx4080', name: 'NVIDIA RTX 4080', price: -800 },
      { id: 'amd7900', name: 'AMD RX 7900 XTX', price: -600 },
    ],
    ram: [
      { id: '64gb', name: '64GB DDR5', price: 0 },
      { id: '32gb', name: '32GB DDR5', price: -200 },
      { id: '128gb', name: '128GB DDR5', price: 400 },
    ],
    storage: [
      { id: '2tb', name: '2TB NVMe SSD', price: 0 },
      { id: '4tb', name: '4TB NVMe SSD', price: 300 },
      { id: '8tb', name: '8TB NVMe SSD', price: 800 },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 6.5 }}
      className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50"
    >
      <div className="container mx-auto p-6">
        <div className="flex space-x-8 mb-4">
          {Object.keys(configurations).map((panel) => (
            <motion.button
              key={panel}
              onClick={() => setActivePanel(panel)}
              className={`px-6 py-2 rounded-full text-sm ${
                activePanel === panel 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {panel.toUpperCase()}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {configurations[activePanel].map((option) => (
            <motion.div
              key={option.id}
              className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => onConfigurationChange(activePanel, option)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="text-white font-semibold">{option.name}</h4>
              <p className="text-sm text-gray-400">
                {option.price > 0 ? `+$${option.price}` : option.price < 0 ? `-$${Math.abs(option.price)}` : 'Included'}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ConfiguratorPanel;