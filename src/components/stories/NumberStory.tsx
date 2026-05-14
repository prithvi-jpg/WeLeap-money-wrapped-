import React from 'react';
import { motion } from 'motion/react';
import { QuizData } from '../../types';

interface Props {
  quizData: QuizData;
}

import { LogoFrog } from '../Logo';

export default function NumberStory({ quizData }: Props) {
  const ans = quizData.answers.q6 || "A";
  
  let numberStr = "";
  let message = "";
  let highlight = "";

  if (ans === "A") { // Subscriptions
    numberStr = "$13k";
    message = "That is what your current hidden subscriptions could cost you over the next 10 years.";
    highlight = "The average person pays $91/month for unutilized subs. You could be ahead.";
  } else if (ans === "B") { // Savings
    numberStr = "23%";
    message = "Only 23% of millennials have set up automated savings for a rainy day.";
    highlight = "Automation removes the friction of willpower. The simple act of setting it up puts you in the top quartile.";
  } else if (ans === "C") { // Credit card
    numberStr = "$1.1k";
    message = "The average interest paid per year when you do not know your exact balance.";
    highlight = "Ignorance is not bliss here. Checking your balance actively reduces the urge to spend unconsciously.";
  } else { // Investing
    numberStr = "$19k";
    message = "The amount you miss out on by waiting just 3 years to invest that $50 a month.";
    highlight = "Compound interest heavily favors those who start early, not those who wait for the perfect moment.";
  }

  return (
    <div className="w-full h-full min-h-full bg-[#f8f9fa] flex flex-col p-6 relative overflow-y-auto overflow-x-hidden text-[#111827]">
      
      <div className="flex justify-between items-center mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1 opacity-40 text-[#111827]"
        >
          <LogoFrog className="w-3 h-3" />
          <p className="text-[12px] font-sans font-semibold tracking-widest uppercase">
            WeLeap // 02
          </p>
        </motion.div>
        <div className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
      </div>

      <div className="z-10 w-full flex flex-col flex-1 mt-12">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 flex flex-col items-center justify-center min-h-[50%]"
        >
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#2563eb] mb-6">Insight Parameter</p>
          
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="text-[80px] leading-none font-headline font-bold text-[#111827] tracking-tighter"
          >
            {numberStr}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full px-2"
        >
          <p className="text-[22px] font-sans font-medium leading-[1.3] text-[#111827] mb-6 tracking-tight">
            {message}
          </p>

          <div className="w-full p-5 bg-[#2563eb]/[0.03] rounded-2xl border border-[#2563eb]/10">
            <p className="text-[14px] font-sans text-[#111827] opacity-80 leading-[1.6]">
              {highlight}
            </p>
          </div>
        </motion.div>

      </div>
      
    </div>
  );
}
