'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Brain, RefreshCw } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "If every value in a dataset is exactly the same, what is the standard deviation?",
    options: ["1", "0", "Cannot be calculated", "The value itself"],
    correctAnswer: 1,
    explanation: "Standard deviation measures dispersion. If all values are identical, there is no variation, so the standard deviation is 0."
  },
  {
    id: 2,
    question: "According to the Empirical Rule for normal distributions, what percentage of data falls within ONE standard deviation of the mean?",
    options: ["50%", "95%", "99.7%", "68%"],
    correctAnswer: 3,
    explanation: "The 68-95-99.7 rule states that 68% of data falls within 1 standard deviation of the mean."
  },
  {
    id: 3,
    question: "Why do we divide by (N-1) instead of N when calculating Sample Variance?",
    options: ["To make the math easier", "To account for Bessel's Correction and un-bias the estimate", "Because samples always have one less item", "To increase the mean"],
    correctAnswer: 1,
    explanation: "Dividing by N-1 (Bessel's Correction) corrects the bias in the estimation of the population variance from a sample."
  },
  {
    id: 4,
    question: "What is the relationship between Variance and Standard Deviation?",
    options: ["They are the same thing", "Variance is the square root of Standard Deviation", "Standard Deviation is the square root of Variance", "They are inversely proportional"],
    correctAnswer: 2,
    explanation: "Standard Deviation is simply the principal square root of the Variance."
  },
  {
    id: 5,
    question: "Which of the following would NOT result in a negative standard deviation?",
    options: ["A dataset with all negative numbers", "A dataset with very large numbers", "A dataset with outliers", "All of the above (Standard Deviation can never be negative)"],
    correctAnswer: 3,
    explanation: "Standard deviation involves squaring differences (which makes them positive) and taking the principal square root, so it can NEVER be negative."
  }
];

export default function QuizEngine() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (currentQuestion >= QUIZ_QUESTIONS.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
        <Brain className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Completed!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You scored {score} out of {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
        </p>
        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Retake Quiz
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-emerald-500 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold">
          <Brain className="w-5 h-5" /> Test Your Knowledge
        </div>
        <div className="text-emerald-100 text-sm font-medium">
          Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {q.question}
        </h4>
        
        <div className="space-y-3">
          {q.options.map((option, index) => {
            let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
            if (!showResult) {
              btnClass += "border-gray-100 dark:border-gray-700 hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-gray-700 dark:text-gray-300";
            } else {
              if (index === q.correctAnswer) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-500";
              } else if (index === selectedAnswer) {
                btnClass += "border-red-500 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500";
              } else {
                btnClass += "border-gray-100 dark:border-gray-700 opacity-50 text-gray-700 dark:text-gray-300 cursor-not-allowed";
              }
            }
            
            return (
              <button 
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={btnClass}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>
                  {showResult && index === q.correctAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  {showResult && index === selectedAnswer && index !== q.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>
        
        {showResult && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg animate-in fade-in slide-in-from-left-4">
            <h5 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Explanation</h5>
            <p className="text-blue-800 dark:text-blue-400 text-sm">{q.explanation}</p>
            <button 
              onClick={nextQuestion}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
