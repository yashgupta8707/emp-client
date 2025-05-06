// client/src/components/ProductShowcase.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductShowcase = () => {
  const features = [
    {
      title: "AI-Enhanced Performance",
      description: "DLSS 3.0 and Ray Tracing for unmatched visual fidelity",
      icon: "🚀"
    },
    {
      title: "Liquid Metal Cooling",
      description: "Revolutionary thermal management for peak performance",
      icon: "❄️"
    },
    {
      title: "Future-Proof Architecture",
      description: "PCIe 5.0 and DDR5 ready for next-gen upgrades",
      icon: "⚡"
    },
    {
      title: "Silent Operation",
      description: "Acoustic dampening for whisper-quiet gaming",
      icon: "🔇"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 8, duration: 1 }}
      className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50"
    >
      <div className="flex space-x-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 8.2 + index * 0.1 }}
            className="bg-black/60 backdrop-blur-md rounded-lg p-6 w-64 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductShowcase;