import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { QuizData } from '../../types';

interface Props {
  quizData: QuizData;
}

import { LogoFrog } from '../Logo';

const SplitFlapText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState(text.split('').map(() => ' '));

  useEffect(() => {
    const target = text.split('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const iterations = target.map(() => 0);
    const maxIterations = 15;

    const interval = setInterval(() => {
      let allDone = true;
      setDisplayed(prev => prev.map((char, i) => {
        if (iterations[i] >= maxIterations + i * 2) {
          return target[i];
        }
        allDone = false;
        iterations[i]++;
        if (target[i] === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }));

      if (allDone) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex flex-wrap gap-[2px]">
      {displayed.map((char, i) => (
        <span 
          key={i} 
          className="inline-flex items-center justify-center min-w-[24px] h-[32px] bg-[#0c4a6e] text-white font-mono text-[20px] font-bold rounded-[2px] shadow-sm uppercase overflow-hidden relative"
        >
          {/* Add a subtle line in the middle to simulate the split */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40 z-10" />
          {char}
        </span>
      ))}
    </div>
  );
};

export default function LeapStory({ quizData }: Props) {
  const ans = quizData.answers.q6 || "A";
  
  let actionTitle = "";
  let actionDesc = "";

  if (ans === "A") { // Subscriptions
    actionTitle = "Cancel 1 sub.";
    actionDesc = "Open your bank app. Search the word subscription in your transactions. Find the one service you have not used this month. Cancel it before you close this screen. That is your next leap. One action. Real money saved.";
  } else if (ans === "B") { // Savings
    actionTitle = "$25 transfer";
    actionDesc = "Set up a $25 automatic transfer to a separate savings account on your next pay date. Not because $25 will make you rich. Because the automation habit is worth ten times the amount. Start small. The system is the point.";
  } else if (ans === "C") { // Credit card
    actionTitle = "Check balance";
    actionDesc = "Open your credit card app right now and find your current balance and next statement date. Write both numbers down somewhere. Awareness is the first action. WeLeap handles the rest.";
  } else { // Investing
    actionTitle = "Index fund: $50";
    actionDesc = "Choose one index fund — a total market fund or an S&P 500 fund. Put $50 in it. Do not research further. Do not wait for the right moment. The first investment is the one that matters. Everything else compounds from there.";
  }

  return (
    <div className="w-full h-full min-h-full bg-[#f0f9ff] flex flex-col justify-center p-6 relative overflow-y-auto overflow-x-hidden">
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[#0ea5e9] z-20"
      >
        <LogoFrog className="w-4 h-4" />
        <p className="text-[12px] font-sans font-bold tracking-widest uppercase">
          WeLeap
        </p>
      </motion.div>

      <div className="z-10 w-full flex flex-col mt-8">
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[#0c4a6e] text-[11px] tracking-[0.15em] font-bold uppercase mb-4 opacity-50"
        >
          Your Next Leap
        </motion.p>
        
        <div className="mb-8 min-h-[80px]">
          <SplitFlapText text={actionTitle} />
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2 }}
           className="bg-white rounded-2xl p-6 shadow-sm border border-[#e0f2fe]"
        >
          <p className="text-[16px] leading-[1.6] text-[#0c4a6e] font-sans">
            {actionDesc}
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2.2 }}
           className="mt-6 flex gap-3 items-start p-4 bg-white/50 rounded-xl"
        >
          <div className="w-4 h-4 rounded-full bg-[#0ea5e9] flex-shrink-0 mt-1" />
          <p className="text-[12px] text-[#0c4a6e] opacity-80 font-medium">
            Micro-actions have a 3x higher completion rate than comprehensive financial plans.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
