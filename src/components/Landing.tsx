import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { LogoFrog, LogoText } from './Logo';

interface Props {
  onStart: () => void;
}

export function Landing({ onStart }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full bg-[#F7F5F0] bg-subtle-grid flex flex-col items-center justify-center p-6 relative overflow-y-auto overflow-x-hidden text-[#2C2C2C]">
      
      {/* Brand signature */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
        <LogoFrog className="text-[#5E705B]" />
        <LogoText className="text-[#5E705B] opacity-80" />
      </div>

      <div className="z-10 w-full max-w-[390px] flex flex-col items-center justify-center text-center">
        {mounted && (
          <>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[36px] md:text-[42px] leading-[1.1] font-serif font-medium text-[#2C2C2C] tracking-tight mb-3"
            >
              You earn it. You spend it.
            </motion.h1>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-[36px] md:text-[42px] leading-[1.1] font-serif font-medium text-[#5E705B] tracking-tight"
            >
              But do you actually know who you are with money?
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-[15px] max-w-[280px] font-sans font-light tracking-wide text-[#2C2C2C]"
            >
              6 questions. 4 insights. Your money personality in 3 minutes.
            </motion.p>

            <motion.button 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={onStart}
              className="mt-12 w-[220px] h-[52px] bg-transparent border border-[#2C2C2C] text-[#2C2C2C] rounded-full font-sans font-medium text-[15px] transition-colors hover:bg-[#2C2C2C] hover:text-[#F7F5F0] active:scale-95"
            >
              Find out now
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="mt-8 text-[12px] font-mono tracking-wider uppercase text-[#2C2C2C]"
            >
              No bank linking. Just honesty.
            </motion.p>
          </>
        )}
      </div>
    </div>
  );
}
