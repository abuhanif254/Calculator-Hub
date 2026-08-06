'use client';

import React, { useState } from 'react';
import { Layers, ChevronRight, ChevronLeft, RotateCw } from 'lucide-react';

const FLASHCARDS = [
  {
    id: 1,
    front: "What is Standard Deviation?",
    back: "A statistical measure of the amount of variation or dispersion in a set of values. It shows how much the members of a group differ from the mean."
  },
  {
    id: 2,
    front: "What is Variance?",
    back: "The average of the squared differences from the mean. Standard Deviation is the square root of Variance."
  },
  {
    id: 3,
    front: "What is Bessel's Correction?",
    back: "The use of (N-1) instead of N in the denominator when calculating sample variance and sample standard deviation to correct bias in the estimation."
  },
  {
    id: 4,
    front: "What is the 68-95-99.7 Rule?",
    back: "An empirical rule stating that for a normal distribution, ~68% of data falls within 1 SD, ~95% within 2 SD, and ~99.7% within 3 SD of the mean."
  },
  {
    id: 5,
    front: "What is the Coefficient of Variation (CV)?",
    back: "The ratio of the standard deviation to the mean (SD / Mean). It is used to compare the relative dispersion of two different datasets."
  }
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
    }, 150);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-400">
        <Layers className="w-5 h-5" />
        <span className="font-semibold uppercase tracking-wider text-sm">Concept Flashcards</span>
      </div>

      {/* Flashcard Container */}
      <div 
        className="relative w-full max-w-md h-64 perspective-1000 cursor-pointer mb-6"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 flex flex-col items-center justify-center text-white shadow-lg border border-emerald-400/30">
            <h3 className="text-2xl font-bold text-center leading-tight">
              {FLASHCARDS[currentIndex].front}
            </h3>
            <div className="absolute bottom-4 text-emerald-200/60 text-sm flex items-center gap-1">
              <RotateCw className="w-4 h-4" /> Click to flip
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-900 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-800 dark:text-gray-200 shadow-lg border-2 border-emerald-500/20 rotate-y-180 overflow-y-auto">
            <p className="text-lg text-center font-medium leading-relaxed">
              {FLASHCARDS[currentIndex].back}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={prevCard}
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="font-medium text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {FLASHCARDS.length}
        </div>
        <button 
          onClick={nextCard}
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Global CSS for 3D flip effect since Tailwind doesn't have it natively built-in without plugins in some versions */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
