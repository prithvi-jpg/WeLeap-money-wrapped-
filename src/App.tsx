/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppState, QuizData } from './types';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Generation } from './components/Generation';
import { StoryViewer } from './components/StoryViewer';
import { calculateQuizData } from './lib/scoring';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [state, setState] = useState<AppState>({
    step: 'landing',
    quizData: null
  });

  const handleStart = () => {
    setState({ ...state, step: 'quiz' });
  };

  const handleQuizComplete = (answers: Record<string, string>) => {
    const quizData = calculateQuizData(answers);
    setState({ step: 'generation', quizData });
  };

  const handleGenerationComplete = () => {
    setState({ ...state, step: 'stories' });
  };

  const handleReset = () => {
    setState({ step: 'landing', quizData: null });
  };

  return (
    <div className="fixed inset-0 bg-[#111] overflow-hidden font-sans">
        <AnimatePresence mode="wait">
          {state.step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full relative"
            >
              <Landing onStart={handleStart} />
            </motion.div>
          )}

          {state.step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full relative"
            >
              <Quiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {state.step === 'generation' && (
            <motion.div
              key="generation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full relative"
            >
              <Generation onComplete={handleGenerationComplete} />
            </motion.div>
          )}

          {state.step === 'stories' && state.quizData && (
            <motion.div
              key="stories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full relative"
            >
              <StoryViewer 
                quizData={state.quizData} 
                onReset={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
