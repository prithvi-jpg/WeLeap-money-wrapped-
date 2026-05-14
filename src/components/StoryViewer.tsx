import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizData } from '../types';
import IdentityStory from './stories/IdentityStory';
import NumberStory from './stories/NumberStory';
import MirrorStory from './stories/MirrorStory';
import LeapStory from './stories/LeapStory';
import WaitlistStory from './stories/WaitlistStory';

interface Props {
  quizData: QuizData;
  onReset: () => void;
}

  const STORY_DURATION = 15000; // 15 seconds per story

export function StoryViewer({ quizData, onReset }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const startXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const stories = [
    { id: 'identity', component: IdentityStory },
    { id: 'number', component: NumberStory },
    { id: 'mirror', component: MirrorStory },
    { id: 'leap', component: LeapStory },
    { id: 'waitlist', component: WaitlistStory },
  ];

  useEffect(() => {
    // If it's the last story, we stop auto-advance
    if (currentIndex === stories.length - 1) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setProgress(100);
      return;
    }

    if (isPaused) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const prog = ((time - startTimeRef.current) / STORY_DURATION) * 100;
      
      if (prog >= 100) {
        handleNext();
      } else {
        setProgress(prog);
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      startTimeRef.current = undefined;
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      startTimeRef.current = undefined;
    } else {
      setProgress(0);
      startTimeRef.current = undefined;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Disable interaction for the final screen 
    if (currentIndex === stories.length - 1) return;

    startXRef.current = e.clientX;
    setIsPaused(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (currentIndex === stories.length - 1) return;

    const clientX = e.clientX;
    const startX = startXRef.current || 0;
    const diff = clientX - startX;
    
    setIsPaused(false);

    // If swiped significantly
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        // Swipe left -> Next
        handleNext();
      } else {
        // Swipe right -> Prev
        handlePrev();
      }
    } else {
      // Treat as tap
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Check if the tap is in the left third of the container
        const tapX = clientX - rect.left;
        if (tapX < rect.width / 3) {
          handlePrev();
        } else {
          handleNext();
        }
      } else {
        handleNext();
      }
    }
  };

  const handlePointerCancel = () => {
    if (currentIndex === stories.length - 1) return;
    setIsPaused(false);
  };

  const CurrentStory: any = stories[currentIndex].component;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#111] ${currentIndex === stories.length - 1 ? "" : "touch-none"}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2 pt-4 px-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ 
                width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Story Content */}
      <div className="w-full h-full relative cursor-pointer">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full h-full"
          >
            <CurrentStory quizData={quizData} onReset={onReset} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
