// client/src/components/PerformanceMetrics.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PerformanceMetrics = () => {
  const metrics = [
    { label: '3DMark Score', value: '45,678', color: '#3b82f6' },
    { label: 'FPS in 4K', value: '165+', color: '#10b981' },
    { label: 'Render Time', value: '2.5s', color: '#f59e0b' },
    { label: 'Power Efficiency', value: '98%', color: '#8b5cf6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 7, duration: 0.8 }}
      className="fixed bottom-24 left-8 z-40"
    >
      <div className="flex space-x-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 7.2 + index * 0.1 }}
            className="bg-black/70 backdrop-blur-sm rounded-lg p-4 min-w-[120px]"
          >
            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
            <motion.div 
              className="text-2xl font-bold" 
              style={{ color: metric.color }}
              animate={{ 
                textShadow: [`0 0 10px ${metric.color}50`, `0 0 20px ${metric.color}80`, `0 0 10px ${metric.color}50`]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              {metric.value}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;