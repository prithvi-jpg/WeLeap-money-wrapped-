import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestionDef {
  id: string;
  text: string;
  options: { id: string; text: string }[];
}

const questions: QuestionDef[] = [
  {
    id: "q1",
    text: "It is Friday. You just got paid. What actually happens to that money in the next 48 hours?",
    options: [
      { id: "A", text: "I move a fixed amount to savings before I spend anything" },
      { id: "B", text: "I pay what I owe and whatever is left is mine" },
      { id: "C", text: "I spend on what I need and figure the rest out" },
      { id: "D", text: "It is mostly accounted for by Sunday honestly" }
    ]
  },
  {
    id: "q2",
    text: "You check your bank account and it is $200 lower than you expected. Your gut reaction is:",
    options: [
      { id: "A", text: "Immediate anxiety, I need to find out where it went right now" },
      { id: "B", text: "Low level dread, I kind of wish I had not checked" },
      { id: "C", text: "Mild concern, I will sort it out at some point" },
      { id: "D", text: "Genuine curiosity, interesting, where did that go" }
    ]
  },
  {
    id: "q3",
    text: "Your group goes to dinner. The bill arrives. Which version of you shows up?",
    options: [
      { id: "A", text: "Split it equally, it is simpler and the difference is not worth the awkwardness" },
      { id: "B", text: "I calculate my exact share and pay that" },
      { id: "C", text: "I offer to cover it and sort it out later, I hate the moment" },
      { id: "D", text: "I feel low level stress until the bill situation is resolved" }
    ]
  },
  {
    id: "q4",
    text: "Finish this sentence honestly: money is...",
    options: [
      { id: "A", text: "Something I never seem to have enough of regardless of how much I make" },
      { id: "B", text: "A tool, nothing more, nothing less" },
      { id: "C", text: "The thing that determines whether I am doing well in life" },
      { id: "D", text: "Something I absorbed a complicated relationship with from my family" }
    ]
  },
  {
    id: "q5",
    text: "Someone tells you that moving $50 a month into a specific index fund will leave you with $40,000 in 20 years. You:",
    options: [
      { id: "A", text: "Are immediately interested and want to know exactly how" },
      { id: "B", text: "Believe them and have been meaning to do it" },
      { id: "C", text: "Feel vaguely overwhelmed and change the subject" },
      { id: "D", text: "Already do something like this" }
    ]
  },
  {
    id: "q6",
    text: "The one money thing you keep telling yourself you will sort out one day:",
    options: [
      { id: "A", text: "My subscriptions, I know I am paying for things I do not use" },
      { id: "B", text: "My savings, I keep meaning to automate it but I have not" },
      { id: "C", text: "My credit card, I am not completely sure what I owe right now" },
      { id: "D", text: "Investing, I know I should start but I do not know where" }
    ]
  }
];

interface Props {
  onComplete: (answers: Record<string, string>) => void;
}

import { LogoFrog, LogoText } from './Logo';

export function Quiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentIdx];

  const handleSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: optionId }));
  };

  const handleContinue = () => {
    if (currentIdx < questions.length - 1) {
      setDirection(1);
      setCurrentIdx(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(prev => prev - 1);
    }
  };

  const currentAnswer = answers[question.id];

  return (
    <div className="w-full h-full bg-[#F7F5F0] bg-subtle-grid flex flex-col p-6 overflow-y-auto overflow-x-hidden relative text-[#2C2C2C]">
      
      <div className="absolute top-6 left-6 z-20">
        <button onClick={handleBack} className="p-2 text-[#2C2C2C] hover:opacity-70 transition-opacity" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <LogoFrog className="text-[#5E705B]" />
        <LogoText className="text-[#5E705B] opacity-80" />
      </div>

      <div className="z-10 w-full max-w-[390px] mx-auto pt-20 md:pt-24 pb-6 md:pb-12 flex-1 flex flex-col justify-between items-center min-h-0">
        
        {/* Progress indicator */}
        <div className="flex gap-[6px] mb-8 w-full justify-center">
          {questions.map((q, idx) => (
            <div key={q.id} className="w-8 h-1 overflow-hidden" style={{ backgroundColor: 'rgba(94, 112, 91, 0.15)' }}>
              {idx < currentIdx ? (
                <div className="w-full h-full bg-[#5E705B]" />
              ) : idx === currentIdx ? (
                <motion.div 
                  className="h-full bg-[#5E705B]" 
                  initial={{ width: "0%" }} 
                  animate={{ width: currentAnswer ? "100%" : "30%" }} 
                  transition={{ duration: 0.4 }} 
                />
              ) : null}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIdx}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full flex flex-col"
          >
            <h2 className="text-[22px] md:text-[28px] leading-[1.3] font-serif font-medium text-[#2C2C2C] mb-6 md:mb-8 h-auto min-h-[100px] md:min-h-[140px] flex items-center">
              {question.text}
            </h2>

            <div className="flex flex-col gap-2 md:gap-3">
              {question.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full text-left p-3.5 md:p-5 rounded-none border transition-all duration-200 relative ${
                      isSelected 
                        ? 'border-[#5E705B] bg-[rgba(94,112,91,0.05)] text-[#2C2C2C]' 
                        : 'border-[#2C2C2C]/10 hover:border-[#2C2C2C]/30 text-[#2C2C2C]/80'
                    } ${currentAnswer && !isSelected ? 'opacity-40' : 'opacity-100'}`}
                  >
                    <span className="text-[15px] font-sans font-medium leading-[1.5] pr-8 block">{opt.text}</span>
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-5 top-1/2 -translate-y-1/2"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#5E705B]" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Continue button space */}
        <div className="h-16 w-full mt-auto flex justify-center items-end">
          <AnimatePresence>
            {currentAnswer && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                onClick={handleContinue}
                className="w-full h-[52px] bg-transparent border border-[#2C2C2C] text-[#2C2C2C] rounded-full font-serif font-medium text-[16px] hover:bg-[#2C2C2C] hover:text-[#F7F5F0] transition-colors"
              >
                Continue
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
