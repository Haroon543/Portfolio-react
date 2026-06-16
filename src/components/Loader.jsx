import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const interval = 20; // refresh rate
    const steps = duration / interval;
    const increment = 100 / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 600); // short delay after hitting 100%
      } else {
        setProgress(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%', 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-9999 flex flex-col justify-between items-center bg-[#030712] text-white p-8 md:p-16"
    >
      {/* Top Section */}
      <div className="w-full flex justify-between items-center">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] font-heading"
        >
          PORTFOLIO EXP.
        </motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] font-heading"
        >
          CREATING VISUAL SYSTEMS
        </motion.span>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col items-center">
        <div className="h-[60px] overflow-hidden mb-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-heading font-bold tracking-widest text-accent-light"
          >
            DESIGN . CODE . INNOVATE
          </motion.div>
        </div>

        {/* Cinematic Progress Numbers */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-[8rem] md:text-[12rem] font-heading font-black leading-none text-slate-800/20 dark:text-slate-800/40 relative flex items-center select-none"
        >
          {progress.toString().padStart(3, '0')}
          <span className="text-3xl md:text-5xl ml-1 font-bold text-accent">%</span>
        </motion.div>

        {/* Interactive Glowing Bar */}
        <div className="w-64 md:w-80 h-1 bg-slate-900 rounded-full overflow-hidden relative mt-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent-light shadow-neon"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs font-heading tracking-widest opacity-40">
          NEXUS ARCHITECTURE ©2026
        </div>
        <div className="text-xs font-heading tracking-widest opacity-40 uppercase">
          MERN STACK & DESIGN SYNERGY
        </div>
      </div>
    </motion.div>
  );
}
