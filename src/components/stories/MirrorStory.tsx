import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QuizData } from '../../types';

interface Props {
  quizData: QuizData;
}

import { LogoFrog } from '../Logo';

export default function MirrorStory({ quizData }: Props) {
  const p = quizData.personality;
  let text = "Money is just numbers on a screen until you give it purpose.";
  
  if (p === "THE_ALMOST_INVESTOR") {
    text = "You have bookmarked three articles about index funds. You have not opened them since. This is the gap between knowing and doing.";
  } else if (p === "THE_INVISIBLE_SPENDER") {
    text = "You spend freely and check the account rarely. Not because you do not care, but because caring feels heavy.";
  } else if (p === "THE_FORTRESS") {
    text = "Your emergency fund is fully stocked. And somewhere in the back of your mind you wonder if you are being too cautious.";
  } else if (p === "THE_SOCIAL_BANKER") {
    text = "You have covered the bill more times than you can count. Using money for connection comes naturally.";
  } else if (p === "THE_ANALYST") {
    text = "You have the spreadsheet. You have the knowledge. What you do not have yet is the moment where the plan actually starts.";
  } else if (p === "THE_LEAP_OF_FAITH") {
    text = "You live in the present and hope for the best. Sometimes the universe provides, sometimes you just need a budget.";
  } else if (p === "THE_INHERITED_SCRIPT") {
    text = "You are carrying financial baggage that isn't even yours. It is time to write your own script.";
  } else if (p === "THE_OPTIMIZER") {
    text = "You have got the points, the miles, the optimized cash flow. But remember to actually enjoy the life you are funding.";
  }

  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="w-full h-full min-h-full bg-[#0f172a] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex flex-col p-6 relative overflow-y-auto overflow-x-hidden">
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-dark-grid opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-70 text-[#22d3ee]"
      >
        <LogoFrog className="w-3 h-3" />
        <p className="text-[12px] font-mono tracking-widest uppercase">
          WeLeap
        </p>
      </motion.div>

      <div className="z-10 w-full flex-1 flex flex-col justify-center mt-10">
        
        <div className="w-full bg-[#1e293b]/50 border border-[#22d3ee]/20 rounded-xl p-6 shadow-[inset_0_2px_20px_rgba(34,211,238,0.05)] relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />
          
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#22d3ee] opacity-60 mb-6">Terminal // Reflection</p>

          <p className="text-[26px] font-mono font-medium leading-[1.4] text-white">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-[#22d3ee] ml-1 shadow-[0_0_8px_#22d3ee]"
            >
              _
            </motion.span>
          </p>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 px-4 flex items-start gap-4"
        >
          <div className="w-1 h-full bg-[#22d3ee] opacity-50 mt-1" />
          <p className="text-[14px] text-[#94a3b8] font-sans leading-[1.6]">
            Self-awareness is the strongest predictor of financial change. You are already halfway there.
          </p>
        </motion.div>

      </div>
      
    </div>
  );
}
