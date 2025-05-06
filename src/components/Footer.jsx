// client/src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 9 }}
      className="fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-400"
    >
      <p>© 2025 TITAN Gaming Systems. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;