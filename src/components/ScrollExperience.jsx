// client/src/components/ScrollExperience.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollExperience = ({ onScroll }) => {
  const sectionsRef = useRef([]);
  
  useEffect(() => {
    // Create scroll-triggered animations for camera movements
    sectionsRef.current.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const views = ['overview', 'front', 'side', 'top', 'closeup'];
          onScroll(views[index]);
        },
        onEnterBack: () => {
          const views = ['overview', 'front', 'side', 'top', 'closeup'];
          onScroll(views[index]);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onScroll]);

  const sections = [
    {
      title: 'Ultimate Performance',
      content: 'Experience next-level gaming with the most powerful components on the market.',
      animation: 'overview'
    },
    {
      title: 'Stunning Design',
      content: 'Premium materials and meticulous craftsmanship define our aesthetic.',
      animation: 'front'
    },
    {
      title: 'Advanced Cooling',
      content: 'Liquid cooling technology keeps your system at optimal temperatures.',
      animation: 'side'
    },
    {
      title: 'Customizable RGB',
      content: 'Personalize your setup with infinite lighting possibilities.',
      animation: 'top'
    },
    {
      title: 'Premium Craftsmanship',
      content: 'Every detail is meticulously designed for perfection.',
      animation: 'closeup'
    }
  ];

  return (
    <div className="absolute right-0 top-0 w-1/3 h-full overflow-y-auto z-10">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          ref={el => sectionsRef.current[index] = el}
          className="h-screen flex items-center px-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: '-100px' }}
        >
          <div>
            <motion.h2 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {section.title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {section.content}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollExperience;