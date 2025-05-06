// client/src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="container mx-auto flex justify-between items-center backdrop-blur-sm">
        <motion.h1 
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
        >
          TITAN
        </motion.h1>
        <div className="flex space-x-8">
          <motion.a 
            href="#home" 
            className="hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#products" 
            className="hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Products
          </motion.a>
          <motion.a 
            href="#about" 
            className="hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            About
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;