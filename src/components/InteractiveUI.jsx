// client/src/components/InteractiveUI.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveUI = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const features = [
    { id: 'cpu', position: { x: '20%', y: '30%' }, label: 'CPU', info: 'AMD Ryzen 9 7950X3D' },
    { id: 'gpu', position: { x: '40%', y: '60%' }, label: 'GPU', info: 'NVIDIA RTX 4090' },
    { id: 'ram', position: { x: '60%', y: '40%' }, label: 'RAM', info: '64GB DDR5' },
    { id: 'cooling', position: { x: '50%', y: '20%' }, label: 'Cooling', info: 'Liquid Metal' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {features.map((feature) => (
        <motion.div
          key={feature.id}
          className="absolute"
          style={{ left: feature.position.x, top: feature.position.y }}
          onHoverStart={() => setHoveredFeature(feature.id)}
          onHoverEnd={() => setHoveredFeature(null)}
          style={{ pointerEvents: 'auto' }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
            animate={{
              scale: hoveredFeature === feature.id ? 1.2 : 1,
              boxShadow: hoveredFeature === feature.id ? 
                '0 0 20px rgba(59, 130, 246, 0.5)' : 
                '0 0 0 rgba(0, 0, 0, 0)'
            }}
          >
            +
          </motion.div>
          
          <motion.div
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-3 whitespace-nowrap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: hoveredFeature === feature.id ? 1 : 0,
              x: hoveredFeature === feature.id ? 0 : -20 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-semibold">{feature.label}</div>
            <div className="text-xs text-gray-400">{feature.info}</div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveUI;