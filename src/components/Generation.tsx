import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizData } from '../types';

interface Props {
  onComplete: () => void;
}

export function Generation({ onComplete }: Props) {
  const [lineIdx, setLineIdx] = useState(0);

  const lines = [
    "Reading your money patterns...",
    "Synthesizing financial personality...",
    "Building your portrait..."
  ];

  useEffect(() => {
    // line updates
    const interval = setInterval(() => {
      setLineIdx(prev => {
        if (prev < lines.length) return prev + 1;
        return prev;
      });
    }, 1200);

    const timeout = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete, lines.length]);

  return (
    <div className="w-full h-full min-h-full bg-[#F7F5F0] bg-subtle-grid flex flex-col items-center justify-center p-6 relative overflow-y-auto overflow-x-hidden">
      
      {/* Background breathing */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5E705B]/10 via-transparent to-transparent"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="z-10 w-full max-w-[390px] flex flex-col items-center justify-center text-center">
        {/* Minimal geometric illustration */}
        <motion.div className="w-24 h-24 relative mb-12 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-4 h-4 bg-[#5E705B] rounded-full"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 w-[2px] bg-[#2C2C2C]"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute top-0 w-8 h-8 rounded-full border border-[#2C2C2C]"
          />
        </motion.div>

        <div className="h-16 relative w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {lineIdx < lines.length ? (
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="text-[15px] font-sans text-[#2C2C2C] absolute"
              >
                {lines[lineIdx]}
              </motion.p>
            ) : (
              <motion.p
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-[20px] font-serif font-medium text-[#2C2C2C] absolute"
              >
                Your results are ready.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
