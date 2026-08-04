"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, HelpCircle, CheckCircle2, RefreshCcw, ArrowRight, ArrowLeft } from "lucide-react";

type LearningMode = "flashcards" | "quiz" | "solver";

// Example Flashcard Data
const flashcardsData = [
  { term: "Z-Score", definition: "A standard score that indicates how many standard deviations a raw score is above or below the mean." },
  { term: "Normal Distribution", definition: "A probability distribution that is symmetric about the mean, showing that data near the mean are more frequent in occurrence." },
  { term: "Mean (μ)", definition: "The mathematical average of a set of numbers." },
  { term: "Standard Deviation (σ)", definition: "A measure of the amount of variation or dispersion of a set of values." },
  { term: "Percentile", definition: "A measure indicating the value below which a given percentage of observations in a group of observations falls." },
  { term: "Confidence Interval", definition: "A range of values, derived from sample statistics, that is likely to contain the value of an unknown population parameter." },
  { term: "Outlier", definition: "An observation that lies an abnormal distance from other values in a random sample from a population." },
  { term: "Empirical Rule", definition: "Also known as the 68-95-99.7 rule. States that for a normal distribution, nearly all data falls within 3 standard deviations of the mean." }
];

// Example Quiz Data
const quizData = [
  {
    question: "What does a Z-score of 0 indicate?",
    options: ["The raw score is exactly average (equal to the mean).", "The score is an extreme outlier.", "The standard deviation is zero.", "The raw score is zero."],
    correctIndex: 0,
    explanation: "A Z-score of 0 means there is zero distance between the raw score and the mean. Therefore, the raw score equals the mean."
  },
  {
    question: "If a student scores a Z-score of +2.0 on a test, where do they stand relative to the class?",
    options: ["They scored 2 points above average.", "They are exactly at the 50th percentile.", "They scored 2 standard deviations above the class average.", "They failed the test."],
    correctIndex: 2,
    explanation: "Z-scores measure distance in units of standard deviation. A score of +2.0 means the student is 2 standard deviations above the mean."
  },
  {
    question: "Which of the following Z-scores would most likely be considered an extreme outlier?",
    options: ["0.5", "-1.2", "2.1", "4.5"],
    correctIndex: 3,
    explanation: "Z-scores with an absolute value greater than 3 or 4 are typically considered extreme outliers in a normal distribution."
  },
  {
    question: "In a standard normal distribution, what percentage of data falls between Z = -1 and Z = 1?",
    options: ["50%", "68%", "95%", "99.7%"],
    correctIndex: 1,
    explanation: "According to the Empirical Rule (68-95-99.7 rule), approximately 68% of data falls within exactly one standard deviation of the mean."
  }
];

export function ZScoreLearningSuite() {
  const [activeMode, setActiveMode] = useState<LearningMode>("flashcards");

  // Flashcard State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load progress on mount
  useEffect(() => {
    try {
      const savedMastered = localStorage.getItem("zscore_mastered_cards");
      if (savedMastered) setMasteredCards(JSON.parse(savedMastered));
    } catch (e) {
      console.error("Could not load local storage", e);
    }
  }, []);

  // Save progress
  const handleMasterCard = () => {
    if (!masteredCards.includes(cardIndex)) {
      const newMastered = [...masteredCards, cardIndex];
      setMasteredCards(newMastered);
      localStorage.setItem("zscore_mastered_cards", JSON.stringify(newMastered));
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % flashcardsData.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
  };

  // Quiz Handlers
  const handleAnswerSelect = (idx: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === quizData[quizIndex].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < quizData.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveMode("flashcards")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
            activeMode === "flashcards" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <BookOpen size={20} />
          Flashcards
        </button>
        <button
          onClick={() => setActiveMode("quiz")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
            activeMode === "quiz" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <HelpCircle size={20} />
          Quiz Mode
        </button>
        <button
          onClick={() => setActiveMode("solver")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${
            activeMode === "solver" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <CheckCircle2 size={20} />
          Step-by-Step Concepts
        </button>
      </div>

      {/* FLASHCARDS MODE */}
      {activeMode === "flashcards" && (
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <span className="text-slate-500 font-semibold">Card {cardIndex + 1} of {flashcardsData.length}</span>
            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
              {masteredCards.length} Mastered
            </span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 perspective-1000 cursor-pointer group"
          >
            <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white border-2 border-blue-100 rounded-3xl shadow-xl flex items-center justify-center p-10 text-center">
                <h3 className="text-4xl font-bold text-slate-800">{flashcardsData[cardIndex].term}</h3>
                <p className="absolute bottom-6 text-slate-400 text-sm font-medium uppercase tracking-wider">Tap to flip</p>
              </div>
              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-600 text-white rounded-3xl shadow-xl flex items-center justify-center p-10 text-center">
                <p className="text-2xl font-medium leading-relaxed">{flashcardsData[cardIndex].definition}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={prevCard} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
              <ArrowLeft size={24} />
            </button>
            <button onClick={handleMasterCard} className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors shadow-lg shadow-green-500/20">
              Got It!
            </button>
            <button onClick={nextCard} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODE */}
      {activeMode === "quiz" && (
        <div className="max-w-3xl mx-auto">
          {!quizCompleted ? (
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-500 font-semibold">Question {quizIndex + 1} of {quizData.length}</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm">
                  Score: {score}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
                {quizData[quizIndex].question}
              </h3>

              <div className="space-y-4">
                {quizData[quizIndex].options.map((option, idx) => {
                  let btnClass = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700";
                  if (selectedAnswer !== null) {
                    if (idx === quizData[quizIndex].correctIndex) {
                      btnClass = "bg-green-500 text-white border-green-600";
                    } else if (idx === selectedAnswer) {
                      btnClass = "bg-red-500 text-white border-red-600";
                    } else {
                      btnClass = "bg-slate-50 opacity-50 border-slate-200 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-5 text-left rounded-xl border-2 font-medium text-lg transition-all ${btnClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                  <h4 className="font-bold text-blue-900 mb-2">Explanation</h4>
                  <p className="text-blue-800 leading-relaxed">{quizData[quizIndex].explanation}</p>
                  <button
                    onClick={nextQuestion}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    {quizIndex < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 text-white p-12 rounded-3xl text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <CheckCircle2 size={64} className="mx-auto text-green-400 mb-6" />
                <h3 className="text-4xl font-bold mb-4">Quiz Completed!</h3>
                <p className="text-xl text-slate-300 mb-8">
                  You scored <strong className="text-white">{score}</strong> out of <strong className="text-white">{quizData.length}</strong>
                </p>
                <button
                  onClick={restartQuiz}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <RefreshCcw size={20} />
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SOLVER MODE */}
      {activeMode === "solver" && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Step-by-Step: How to Calculate a Z-Score</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">1</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow-sm bg-white">
                  <h4 className="font-bold text-slate-800 mb-1">Identify Variables</h4>
                  <p className="text-slate-600 text-sm">Determine your raw score (x), the population mean (μ), and the standard deviation (σ).</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">2</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow-sm bg-white">
                  <h4 className="font-bold text-slate-800 mb-1">Apply Formula</h4>
                  <p className="text-slate-600 text-sm">Set up the standard formula: <strong>z = (x - μ) / σ</strong></p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">3</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow-sm bg-white">
                  <h4 className="font-bold text-slate-800 mb-1">Calculate Difference</h4>
                  <p className="text-slate-600 text-sm">Subtract the mean from the raw score (x - μ). This tells you the absolute distance from the mean.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">4</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 shadow-sm bg-white">
                  <h4 className="font-bold text-slate-800 mb-1">Standardize</h4>
                  <p className="text-slate-600 text-sm">Divide the difference by the standard deviation. This scales your distance into standard units (Z).</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
