"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, Info, Play, RotateCcw } from "lucide-react";

type LearningTab = "theory" | "assumptions" | "quiz";

const QUIZ_QUESTIONS = [
  {
    question: "What is the primary purpose of a t-test?",
    options: [
      "To compare variances between two groups",
      "To compare means between groups",
      "To measure correlation between variables",
      "To predict future outcomes"
    ],
    answer: 1,
    explanation: "A t-test is used to compare the means of one or two groups to see if they are significantly different from each other."
  },
  {
    question: "When should you use Welch's t-test instead of Student's t-test?",
    options: [
      "When sample sizes are small (n < 30)",
      "When data is not normally distributed",
      "When the two groups have unequal variances",
      "When you have more than two groups"
    ],
    answer: 2,
    explanation: "Welch's t-test is specifically designed to handle independent samples that have unequal variances, making it more robust than Student's t-test in such scenarios."
  },
  {
    question: "What does the p-value represent in a t-test?",
    options: [
      "The probability that the alternative hypothesis is true",
      "The probability of observing the data given the null hypothesis is true",
      "The probability of making a Type I error",
      "The exact magnitude of difference between groups"
    ],
    answer: 1,
    explanation: "The p-value is the probability of observing a test statistic as extreme as, or more extreme than, the one calculated from your sample data, assuming the null hypothesis is true."
  },
  {
    question: "Which of these is NOT an assumption of the independent two-sample t-test?",
    options: [
      "Normality of data",
      "Independence of observations",
      "Equal sample sizes",
      "Homogeneity of variance (if using Student's version)"
    ],
    answer: 2,
    explanation: "While equal sample sizes maximize statistical power, they are NOT a strict assumption of the independent t-test."
  },
  {
    question: "What does Cohen's d measure?",
    options: [
      "Statistical significance",
      "The standardized effect size",
      "The degrees of freedom",
      "The probability of a Type II error"
    ],
    answer: 1,
    explanation: "Cohen's d measures the standardized effect size, indicating the magnitude of the difference between means relative to the standard deviation."
  }
];

export function TTestLearningSuite() {
  const [activeTab, setActiveTab] = useState<LearningTab>("theory");
  
  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ttest_quiz_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const handleAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);
    
    if (index === QUIZ_QUESTIONS[currentQ].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setShowResult(true);
      if (score + (selectedOption === QUIZ_QUESTIONS[currentQ].answer ? 1 : 0) > highScore) {
        const newScore = score + (selectedOption === QUIZ_QUESTIONS[currentQ].answer ? 1 : 0);
        setHighScore(newScore);
        localStorage.setItem("ttest_quiz_highscore", newScore.toString());
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <div className="bg-white">
      <div className="flex gap-2 border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar pb-2">
        <button
          onClick={() => setActiveTab("theory")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "theory" ? "bg-blue-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen size={16} /> Theory Guide
        </button>
        <button
          onClick={() => setActiveTab("assumptions")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "assumptions" ? "bg-amber-100 text-amber-700" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <AlertTriangle size={16} /> Assumptions
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === "quiz" ? "bg-emerald-100 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <HelpCircle size={16} /> Quiz & Practice
        </button>
      </div>

      {activeTab === "theory" && (
        <div className="space-y-8 animate-fade-in">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-slate-800">Understanding the T-Test</h3>
            <p>
              The t-test is an inferential statistic used to determine if there is a significant difference between the means of two groups, 
              which may be related in certain features. It is mostly used when the data sets, like the set of data recorded as outcome 
              from flipping a coin a 100 times, would follow a normal distribution and may have unknown variances.
            </p>
            
            <h4 className="text-xl font-bold text-slate-800 mt-6">Types of T-Tests</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-2">One-Sample T-Test</h5>
                <p className="text-sm text-slate-600">Tests whether the mean of a single population is equal to a known or hypothesized value.</p>
                <div className="mt-3 text-xs bg-white p-2 rounded border border-slate-200 font-mono text-center">
                  t = (x̄ - μ) / (s / √n)
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-2">Independent Two-Sample</h5>
                <p className="text-sm text-slate-600">Compares the means of two independent or unrelated groups to determine if there is a statistical difference.</p>
                <div className="mt-3 text-xs bg-white p-2 rounded border border-slate-200 font-mono text-center">
                  t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂)
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-2">Paired T-Test</h5>
                <p className="text-sm text-slate-600">Compares means from the same group at different times (e.g., pre-test vs. post-test).</p>
                <div className="mt-3 text-xs bg-white p-2 rounded border border-slate-200 font-mono text-center">
                  t = d̄ / (s_d / √n)
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-slate-800 mt-8">Effect Size (Cohen's d)</h4>
            <p>
              While a p-value tells you if there is a statistically significant difference, it doesn't tell you the <strong>size</strong> of that difference. 
              Cohen's d measures the standardized difference between two means.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>d ≈ 0.2:</strong> Small effect (differences are subtle)</li>
              <li><strong>d ≈ 0.5:</strong> Medium effect (differences are noticeable)</li>
              <li><strong>d ≈ 0.8+:</strong> Large effect (differences are obvious)</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "assumptions" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} /> Critical Assumptions
            </h3>
            <p className="text-amber-700 text-sm">
              T-tests are parametric tests. If these assumptions are severely violated, the results (p-values) may be invalid, 
              and you should consider non-parametric alternatives (like the Mann-Whitney U test or Wilcoxon signed-rank test).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 p-5 rounded-2xl">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</div>
                Normality
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                The data (or differences, for a paired test) should be approximately normally distributed. 
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                <strong>Exception:</strong> By the Central Limit Theorem, if your sample size is large enough (n &gt; 30), the t-test is highly robust to non-normality.
              </div>
            </div>

            <div className="border border-slate-200 p-5 rounded-2xl">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</div>
                Independence
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Observations within each sample must be independent of one another.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                <strong>Crucial:</strong> This is an experimental design issue. You cannot "fix" a violation of independence with math.
              </div>
            </div>

            <div className="border border-slate-200 p-5 rounded-2xl">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</div>
                Homogeneity of Variance
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                (Independent Two-Sample Only) The variances of the two populations should be approximately equal.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                <strong>Solution:</strong> Use Welch's t-test (uncheck "Assume Equal Variance") if standard deviations are drastically different.
              </div>
            </div>

            <div className="border border-slate-200 p-5 rounded-2xl">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">4</div>
                Scale of Measurement
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                The dependent variable should be measured on a continuous (interval or ratio) scale.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700 border border-slate-100">
                <strong>Note:</strong> T-tests shouldn't be used for ordinal (ranking) or categorical data.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto py-8 animate-fade-in">
          
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800">Knowledge Check</h3>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm border border-emerald-200 shadow-sm">
              High Score: {highScore} / {QUIZ_QUESTIONS.length}
            </div>
          </div>

          {!showResult ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50">
              <div className="flex justify-between items-center mb-6 text-sm font-semibold text-slate-500">
                <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>
              
              <h4 className="text-xl font-bold text-slate-800 mb-6 leading-relaxed">
                {QUIZ_QUESTIONS[currentQ].question}
              </h4>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQ].options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === QUIZ_QUESTIONS[currentQ].answer;
                  
                  let btnClass = "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300";
                  if (hasAnswered) {
                    if (isCorrect) btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
                    else if (isSelected) btnClass = "border-red-500 bg-red-50 text-red-800";
                    else btnClass = "border-slate-200 text-slate-400 opacity-50";
                  } else if (isSelected) {
                    btnClass = "border-blue-500 bg-blue-50 text-blue-800";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${btnClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                          hasAnswered && isCorrect ? 'bg-emerald-500 border-emerald-500 text-white' :
                          hasAnswered && isSelected && !isCorrect ? 'bg-red-500 border-red-500 text-white' :
                          'border-slate-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {opt}
                      </div>
                    </button>
                  );
                })}
              </div>

              {hasAnswered && (
                <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="flex gap-3">
                    <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h5 className="font-bold text-blue-900 mb-1">Explanation</h5>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        {QUIZ_QUESTIONS[currentQ].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {hasAnswered && (
                <button
                  onClick={nextQuestion}
                  className="mt-6 w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {currentQ < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "View Results"} <Play size={18} />
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-slate-200/50 text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h3>
              <p className="text-slate-600 mb-8">You scored {score} out of {QUIZ_QUESTIONS.length}.</p>
              
              <div className="p-6 bg-slate-50 rounded-2xl mb-8">
                <div className="text-4xl font-black text-slate-800">
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
                </div>
              </div>

              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw size={18} /> Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
