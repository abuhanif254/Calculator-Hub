'use client';

import React, { useState } from 'react';
import { BookOpen, Calculator, ChevronDown, ChevronUp, Check, X, RefreshCw, AlertTriangle } from 'lucide-react';

const flashcards = [
  { term: "Confidence Interval (CI)", def: "A range of values that is likely to contain a population parameter with a certain level of confidence." },
  { term: "Confidence Level", def: "The probability that the CI procedure will produce an interval containing the true parameter (e.g., 95%)." },
  { term: "Margin of Error (MOE)", def: "The maximum expected difference between the true population parameter and the sample estimate." },
  { term: "Point Estimate", def: "A single value (like sample mean x̄ or sample proportion p̂) used to approximate a population parameter." },
  { term: "Standard Error (SE)", def: "The standard deviation of the sampling distribution of a statistic (e.g., SE = s/√n)." },
  { term: "Critical Value", def: "A value from a distribution (like Z* or t*) that defines the boundaries of the confidence region." },
  { term: "Z Distribution", def: "The standard normal distribution. Used for CIs when population standard deviation is known or sample size is large." },
  { term: "T Distribution", def: "A distribution similar to Z but with heavier tails. Used when population standard deviation is unknown and sample is small." },
  { term: "Degrees of Freedom (df)", def: "The number of independent values that can vary. For a single sample T-interval, df = n - 1." },
  { term: "Population Mean (μ)", def: "The true average of the entire population. This is what we usually try to estimate with a CI." },
  { term: "Sample Mean (x̄)", def: "The average of a subset (sample) drawn from the population. The point estimate for μ." },
  { term: "Population Proportion (p)", def: "The true percentage of a population that has a certain characteristic." },
  { term: "Sample Proportion (p̂)", def: "The percentage of a sample that has a certain characteristic. The point estimate for p." }
];

const quizQuestions = [
  {
    q: "If a 95% confidence interval for a mean is [10, 20], which interpretation is correct?",
    opts: [
      "There is a 95% probability that the true mean is between 10 and 20.",
      "95% of the data in the sample falls between 10 and 20.",
      "If we repeat this sampling process many times, about 95% of the resulting intervals will contain the true mean.",
      "The true mean is 15."
    ],
    ans: 2,
    exp: "Confidence levels apply to the procedure, not a single interval. The true mean is fixed; it's either in [10, 20] or it isn't."
  },
  {
    q: "Holding everything else constant, what happens to the width of a CI if the sample size increases?",
    opts: ["It gets wider", "It gets narrower", "It stays the same", "It depends on the mean"],
    ans: 1,
    exp: "Larger sample size decreases the standard error, which makes the margin of error smaller and the interval narrower."
  },
  {
    q: "Which critical value gives the widest confidence interval?",
    opts: ["90% level", "95% level", "99% level", "They all give the same width"],
    ans: 2,
    exp: "Higher confidence requires a wider interval to be more 'sure' it captures the parameter."
  },
  {
    q: "When should you use a T-interval instead of a Z-interval for a mean?",
    opts: [
      "When the sample size is very large (n > 1000)",
      "When the population standard deviation is unknown",
      "When estimating a proportion",
      "When the data is highly skewed"
    ],
    ans: 1,
    exp: "The T-distribution accounts for the extra uncertainty when we have to estimate the population SD using the sample SD."
  },
  {
    q: "What is the Margin of Error for a CI of [40, 60]?",
    opts: ["10", "20", "50", "100"],
    ans: 0,
    exp: "The point estimate is the midpoint (50). The margin of error is the distance from the midpoint to a bound (60 - 50 = 10)."
  },
  {
    q: "A paired T-test/interval is most appropriate for which scenario?",
    opts: [
      "Comparing heights of men vs women",
      "Comparing blood pressure of the same patients before and after a drug",
      "Comparing salaries in New York vs London",
      "Estimating the proportion of voters for a candidate"
    ],
    ans: 1,
    exp: "Paired tests are for dependent samples, like before/after measurements on the exact same subjects."
  },
  {
    q: "The formula x̄ ± t*(s/√n) is used to calculate:",
    opts: ["CI for a proportion", "CI for a difference in means", "CI for a single mean (sigma unknown)", "CI for variance"],
    ans: 2,
    exp: "This is the standard formula for a one-sample T-interval for a mean."
  },
  {
    q: "If a 99% CI for the difference in two means (μ1 - μ2) is [-2.5, 4.1], is there a significant difference at α=0.01?",
    opts: ["Yes, because it contains negative values", "Yes, because the interval is wide", "No, because the interval contains zero", "Cannot be determined"],
    ans: 2,
    exp: "If a confidence interval for a difference contains 0, it means 0 is a plausible value for the difference (i.e., no significant difference)."
  },
  {
    q: "What is the main assumption for using the standard normal (Z) approximation for a proportion CI?",
    opts: [
      "n*p ≥ 10 and n*(1-p) ≥ 10",
      "Sample size n > 30",
      "The population is normally distributed",
      "The sample standard deviation is known"
    ],
    ans: 0,
    exp: "The rule of thumb for the normal approximation to the binomial distribution requires at least 10 expected successes and 10 expected failures."
  },
  {
    q: "Which component of the CI formula represents the Standard Error (SE) for a sample mean?",
    opts: ["x̄", "t*", "s / √n", "t* · (s / √n)"],
    ans: 2,
    exp: "s / √n is the Standard Error. Multiplying it by the critical value (t*) gives the Margin of Error."
  }
];

function Accordion({ title, icon, children, defaultOpen = false }: { title: string, icon: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm">
      <button 
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#518231]">{icon}</span>
          <span className="font-bold text-slate-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {open && <div className="p-6 border-t border-slate-200">{children}</div>}
    </div>
  );
}

export function CILearningSuite() {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'flashcards'>('learn');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAns, setQuizAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardIdx, setFlashcardIdx] = useState(0);

  const handleQuizAnswer = (idx: number) => {
    if (quizAns !== null) return;
    setQuizAns(idx);
    if (idx === quizQuestions[quizIdx].ans) setScore(s => s + 1);
  };

  const nextQuiz = () => {
    setQuizIdx(i => i + 1);
    setQuizAns(null);
  };

  const nextCard = () => {
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIdx(i => (i + 1) % flashcards.length);
    }, 150);
  };
  
  const prevCard = () => {
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIdx(i => (i - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        <button 
          onClick={() => setActiveTab('learn')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors \${activeTab === 'learn' ? 'bg-white text-[#518231] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <BookOpen className="w-4 h-4" /> Theory & Examples
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors \${activeTab === 'quiz' ? 'bg-white text-[#518231] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <Check className="w-4 h-4" /> Practice Quiz
        </button>
        <button 
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors \${activeTab === 'flashcards' ? 'bg-white text-[#518231] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <RefreshCw className="w-4 h-4" /> Flashcards
        </button>
      </div>

      {activeTab === 'learn' && (
        <div className="space-y-2">
          <Accordion title="What Is a Confidence Interval?" icon={<BookOpen className="w-5 h-5" />} defaultOpen>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>A <strong>Confidence Interval (CI)</strong> is a range of values, derived from sample statistics, that is likely to contain the value of an unknown population parameter.</p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 my-4">
                <h4 className="font-bold text-blue-900 mb-2">The Frequentist Interpretation</h4>
                <p className="text-blue-800">
                  If we were to take 100 different samples and compute a 95% confidence interval for each sample, approximately 95 of the 100 intervals will contain the true population parameter.
                </p>
              </div>
              <p><strong>What it is NOT:</strong> It is incorrect to say "There is a 95% probability that the true mean falls within this specific interval." Once the interval is calculated, the true mean is either in it or it isn't (probability is 1 or 0).</p>
            </div>
          </Accordion>

          <Accordion title="Formula Reference" icon={<Calculator className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Single Mean (Z-Interval)</h4>
                <code className="block bg-white p-2 rounded border border-slate-200 font-mono text-sm mb-2 text-center text-blue-700">
                  x̄ ± z* · (σ / √n)
                </code>
                <p className="text-xs text-slate-600">Use when: Population SD (σ) is known and population is normal (or n &gt; 30).</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Single Mean (T-Interval)</h4>
                <code className="block bg-white p-2 rounded border border-slate-200 font-mono text-sm mb-2 text-center text-blue-700">
                  x̄ ± t* · (s / √n)
                </code>
                <p className="text-xs text-slate-600">Use when: Population SD is unknown. df = n - 1.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Single Proportion</h4>
                <code className="block bg-white p-2 rounded border border-slate-200 font-mono text-sm mb-2 text-center text-blue-700">
                  p̂ ± z* · √(p̂(1-p̂) / n)
                </code>
                <p className="text-xs text-slate-600">Use when: Estimating a percentage/proportion. Assumes np &ge; 10 and n(1-p) &ge; 10.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Two Means (Unpooled Welch T)</h4>
                <code className="block bg-white p-2 rounded border border-slate-200 font-mono text-xs mb-2 text-center text-blue-700">
                  (x̄₁ - x̄₂) ± t* · √(s₁²/n₁ + s₂²/n₂)
                </code>
                <p className="text-xs text-slate-600">Use when: Comparing means of two independent groups.</p>
              </div>
            </div>
          </Accordion>

          <Accordion title="Common Mistakes" icon={<AlertTriangle className="w-5 h-5" />}>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Wrong:</strong> "There is 95% probability the parameter is in this interval."<br/>
                  <span className="text-sm text-slate-600 flex items-center gap-1 mt-1"><Check className="w-4 h-4 text-green-500" /> <strong>Correct:</strong> "We are 95% confident the procedure captured the true parameter."</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Wrong:</strong> Using Z-distribution when sample SD (s) is used instead of population SD (σ).<br/>
                  <span className="text-sm text-slate-600 flex items-center gap-1 mt-1"><Check className="w-4 h-4 text-green-500" /> <strong>Correct:</strong> Always use T-distribution when σ is unknown.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Wrong:</strong> Confusing a Confidence Interval with a Prediction Interval.<br/>
                  <span className="text-sm text-slate-600 flex items-center gap-1 mt-1"><Check className="w-4 h-4 text-green-500" /> <strong>Correct:</strong> CI estimates a parameter (like the mean). PI predicts a single future observation.</span>
                </div>
              </li>
            </ul>
          </Accordion>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
          {quizIdx < quizQuestions.length ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-400">Question {quizIdx + 1} of {quizQuestions.length}</span>
                <span className="text-sm font-bold text-[#518231]">Score: {score}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">{quizQuestions[quizIdx].q}</h3>
              
              <div className="space-y-3">
                {quizQuestions[quizIdx].opts.map((opt, i) => {
                  let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
                  if (quizAns === null) {
                    btnClass += "border-slate-200 hover:border-[#518231] hover:bg-green-50 text-slate-700";
                  } else if (i === quizQuestions[quizIdx].ans) {
                    btnClass += "border-green-500 bg-green-50 text-green-800 font-semibold";
                  } else if (i === quizAns) {
                    btnClass += "border-red-500 bg-red-50 text-red-800";
                  } else {
                    btnClass += "border-slate-200 opacity-50 text-slate-500";
                  }
                  
                  return (
                    <button key={i} onClick={() => handleQuizAnswer(i)} disabled={quizAns !== null} className={btnClass}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              
              {quizAns !== null && (
                <div className={`mt-6 p-4 rounded-xl border \${quizAns === quizQuestions[quizIdx].ans ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h4 className={`font-bold flex items-center gap-2 mb-2 \${quizAns === quizQuestions[quizIdx].ans ? 'text-green-800' : 'text-red-800'}`}>
                    {quizAns === quizQuestions[quizIdx].ans ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    {quizAns === quizQuestions[quizIdx].ans ? 'Correct!' : 'Incorrect.'}
                  </h4>
                  <p className="text-sm text-slate-700">{quizQuestions[quizIdx].exp}</p>
                  <button onClick={nextQuiz} className="mt-4 px-6 py-2 bg-[#518231] text-white rounded-lg font-semibold hover:bg-[#426a27] transition-colors">
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 text-[#518231] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold">{Math.round((score / quizQuestions.length) * 100)}%</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
              <p className="text-slate-600 mb-8">You got {score} out of {quizQuestions.length} questions correct.</p>
              <button 
                onClick={() => { setQuizIdx(0); setScore(0); setQuizAns(null); }}
                className="px-6 py-3 bg-[#518231] text-white rounded-xl font-semibold hover:bg-[#426a27] transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto py-8">
          <div className="text-center mb-6">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Card {flashcardIdx + 1} of {flashcards.length}</span>
          </div>
          
          <div className="relative w-full h-80 perspective-1000" style={{ perspective: '1000px' }}>
            <div 
              className={`w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer \${flashcardFlipped ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d', transform: flashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white border-2 border-slate-200 rounded-3xl shadow-sm flex items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden' }}>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{flashcards[flashcardIdx].term}</h2>
                  <p className="text-slate-400 mt-6 text-sm flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Click to flip
                  </p>
                </div>
              </div>
              
              {/* Back */}
              <div className="absolute w-full h-full backface-hidden bg-[#518231] text-white border-2 border-[#518231] rounded-3xl shadow-lg flex items-center justify-center p-10 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <div>
                  <p className="text-xl font-medium leading-relaxed">{flashcards[flashcardIdx].def}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevCard} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
              Previous
            </button>
            <button onClick={nextCard} className="px-6 py-3 bg-[#518231] hover:bg-[#426a27] text-white font-semibold rounded-xl transition-colors">
              Next Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
