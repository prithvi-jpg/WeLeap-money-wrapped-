import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizData } from '../../types';

import { LogoFrog, LogoText } from '../Logo';

interface Props {
  quizData: QuizData;
  onReset: () => void;
}

export default function WaitlistStory({ quizData, onReset }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const ans = quizData.answers.q6 || "A";
  let actionTitle = "";
  if (ans === "A") actionTitle = "Cancel 1 sub.";
  else if (ans === "B") actionTitle = "$25 transfer";
  else if (ans === "C") actionTitle = "Check balance";
  else actionTitle = "Index fund: $50";

  const handleClaim = () => {
    window.open('https://dub.sh/Money-Personality', '_blank');
    setSubmitted(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'WeLeap: Money Personality',
      url: 'https://prithvi-jpg.github.io/WeLeap-money-wrapped/'
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied!");
      }
    } catch(err) {
      // ignore
    }
  };

  return (
    <div className="w-full h-full min-h-full bg-[#F7F5F0] bg-subtle-grid flex flex-col justify-between p-6 relative overflow-y-auto overflow-x-hidden text-[#2C2C2C]">
      
      {/* Background Motifs */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-40 text-[#5E705B] z-10">
        <LogoFrog className="w-3 h-3" />
        <span className="text-[12px] font-mono font-bold tracking-widest uppercase">
          WeLeap
        </span>
      </div>
      <div className="absolute top-24 left-6 z-10 opacity-20 pointer-events-none w-3/4">
        <h2 className="text-[32px] font-serif font-bold text-[#2C2C2C] leading-[1] uppercase">{actionTitle}</h2>
      </div>

      {/* The Frosted Panel Overlay */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mt-auto -mx-6 -mb-6 bg-white/90 backdrop-blur-xl rounded-t-[32px] border-t border-[#2C2C2C]/5 z-20 flex flex-col p-8 items-center shadow-[0_-10px_40px_rgba(0,0,0,0.03)] min-h-[65vh]"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
             <motion.div
               key="form"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, transition: { duration: 0.3 } }}
               className="w-full h-full flex flex-col items-center pt-2"
             >
                {/* Logo SVGs */}
                <div className="flex gap-4 items-center justify-center mb-6">
                  <LogoFrog className="text-[#386641] w-[40px] h-[31px]" />
                  <LogoText className="text-[#386641] w-[140px] h-[32px]" />
                </div>
                
                <p className="text-[#2C2C2C]/80 text-[16px] font-sans text-center mb-8 max-w-[280px] leading-[1.4]">
                  Your personalized financial OS AI sidekick. One clear move for you, right now.
                </p>

                <button 
                  onClick={handleClaim}
                  className="w-full h-[52px] bg-[#2C2C2C] text-[#F7F5F0] rounded-full font-sans font-medium text-[16px] transition-transform active:scale-95 flex items-center justify-center shadow-lg"
                >
                  Claim your spot
                </button>
                <p className="text-[#2C2C2C]/50 text-[12px] font-sans text-center mt-6">First access when WeLeap launches.</p>

             </motion.div>
          ) : (
             <motion.div 
               key="success"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="w-full h-full flex flex-col items-center justify-center pt-2"
             >
               <motion.div
                 initial={{ y: -50, scale: 0.8 }}
                 animate={{ y: 0, scale: 1 }}
                 transition={{ type: "spring", stiffness: 300, damping: 15 }}
                 className="mb-6 flex items-center justify-center"
               >
                 <LogoFrog className="text-[#386641] w-16 h-[50px]" />
               </motion.div>
               
               <h2 className="text-[28px] font-serif font-bold text-[#2C2C2C] mb-2 leading-[1.1]">You are on the waitlist.</h2>
               
               <p className="text-[#2C2C2C]/70 text-[15px] font-sans text-center mb-8 leading-[1.5]">
                 We will be in touch when we launch.
               </p>

               <div className="flex flex-col gap-3 w-full">
                 <button onClick={handleShare} className="w-full h-[46px] bg-[#2C2C2C]/5 border border-[#2C2C2C]/10 rounded flex items-center justify-center text-[#2C2C2C] font-sans font-medium text-[14px] transition-colors hover:bg-[#2C2C2C]/10">
                   Share money personality test
                 </button>
               </div>
               
               <button onClick={onReset} className="absolute bottom-6 right-6 opacity-40 hover:opacity-100 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
               </button>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
