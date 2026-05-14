import React from 'react';
import { QuizData } from '../../types';
import { motion } from 'motion/react';

interface Props {
  quizData: QuizData;
}

const statements: Record<string, string> = {
  "THE_LEAP_OF_FAITH": "You believe it will all work out. Sometimes it does.",
  "THE_FORTRESS": "You are building a wall. The question is what you are keeping out.",
  "THE_INVISIBLE_SPENDER": "You spend freely and check the account rarely.",
  "THE_ANALYST": "You have the spreadsheet. The perfectionism is the trap.",
  "THE_SOCIAL_BANKER": "Money is for connection. You buy the round.",
  "THE_INHERITED_SCRIPT": "You are running someone else's financial software.",
  "THE_ALMOST_INVESTOR": "You know the theory. The portfolio just does not exist yet.",
  "THE_OPTIMIZER": "Every dollar has a job. You are winning the game."
};

const descriptions: Record<string, string> = {
  "THE_LEAP_OF_FAITH": "You treat money as a flowing resource rather than a finite bucket. This gives you freedom from stress, but often leaves you vulnerable to surprises.",
  "THE_FORTRESS": "Security is your primary financial goal. You save aggressively and avoid debt, but might be sacrificing current joy for future certainty.",
  "THE_INVISIBLE_SPENDER": "You prefer not to look too closely at the numbers. Money causes low level anxiety, so you avoid the topic, which ironically creates more anxiety.",
  "THE_ANALYST": "You want the mathematically perfect answer before acting. This leads to great plans that sometimes never get executed.",
  "THE_SOCIAL_BANKER": "You use money to nurture relationships. You are generous and egalitarian, but might be putting others financial comfort ahead of your own.",
  "THE_INHERITED_SCRIPT": "Your money behaviors are largely unconscious patterns learned in early life. You are replicating (or violently rebelling against) how your family handled finances.",
  "THE_ALMOST_INVESTOR": "You are educated on the basics of personal finance but stuck in observation mode. The barrier isn't knowledge, it is action.",
  "THE_OPTIMIZER": "You actively manage and direct your resources. You understand leverage, compound interest, and systemic thinking."
};

import { LogoFrog } from '../Logo';

export default function IdentityStory({ quizData }: Props) {
  const statement = statements[quizData.personality] || statements["THE_ALMOST_INVESTOR"];
  
  let desc = descriptions[quizData.personality] || descriptions["THE_ALMOST_INVESTOR"];
  
  if (quizData.modifiers.includes("intention_action_gap")) {
    desc += " This is the gap between knowing what to do and actually doing it.";
  }
  if (quizData.modifiers.includes("avoidance")) {
    desc += " Clarity removes the need to avoid. It is time to look.";
  }

  const nameFormatted = quizData.personality.replace(/_/g, " ");

  return (
    <div className="w-full h-full min-h-full bg-[#f2eee3] bg-dark-grid flex flex-col p-6 relative overflow-y-auto overflow-x-hidden text-[#1a1a1a] shadow-[inset_0_0_0_8px_#1a1a1a]">
      
      {/* Header border */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
        className="w-full border-b-[3px] border-[#1a1a1a] pb-4 mt-6 flex justify-between items-end origin-left"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1"
        >
          <LogoFrog className="text-[#1a1a1a] w-3 h-3" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
            WeLeap // 01
          </span>
        </motion.div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]"
        >
          Profile
        </motion.span>
      </motion.div>
      
      <div className="flex-1 flex flex-col justify-center min-h-[300px]">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="font-editorial text-[62px] md:text-[72px] leading-[0.9] font-bold text-[#1a1a1a] uppercase break-words w-full"
        >
          {nameFormatted}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 border-l-[4px] border-[#1a1a1a] pl-4"
        >
          <p className="font-serif text-[24px] md:text-[28px] italic text-[#1a1a1a] leading-tight">
            "{statement}"
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-auto border-t-[3px] border-[#1a1a1a] pt-5 pb-8"
      >
        <p className="font-sans text-[14px] text-[#1a1a1a] leading-[1.6]">
          <strong className="font-bold uppercase tracking-wide mr-2">Analysis:</strong>
          {desc}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 2.5, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-4 right-6 font-mono text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]"
      >
        Tap right →
      </motion.p>
    </div>
  );
}
