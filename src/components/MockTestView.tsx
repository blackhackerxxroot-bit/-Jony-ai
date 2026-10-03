import React, { useState, useEffect } from 'react';
import { 
  Timer as TimerIcon, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  Bot, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { MCQQuestion, MockTestResult, SystemId } from '../types';

interface MockTestViewProps {
  questions: MCQQuestion[];
  onNavigateToPlan: () => void;
  onOpenLesson: (subjectId: string, topicId: string) => void;
  onOpenAITutorWithWeakTopics: (recommendation: string) => void;
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  questions,
  onNavigateToPlan,
  onOpenLesson,
  onOpenAITutorWithWeakTopics,
}) => {
  const [testState, setTestState] = useState<'intro' | 'running' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes for demo test
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [resultData, setResultData] = useState<MockTestResult | null>(null);

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (testState === 'running' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCalculateResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestState('running');
    setTimeLeft(15 * 60);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
  };

  const handleSelectOption = (optIndex: number) => {
    setUserAnswers({
      ...userAnswers,
      [currentIndex]: optIndex,
    });
  };

  const toggleReview = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentIndex]: !markedForReview[currentIndex],
    });
  };

  const handleCalculateResult = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    questions.forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (ans === undefined) {
        skipped++;
      } else if (ans === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const negativeMarks = wrong * 0.5; // standard BCS 0.50 negative mark
    const netScore = Math.max(0, correct - negativeMarks);
    const percentage = Math.round((netScore / questions.length) * 100);

    const calculatedResult: MockTestResult = {
      testId: 'mock-' + Date.now(),
      testTitle: 'BCS Preliminary Mock Test #03 (প্রিলিমিনারি পূর্ণাঙ্গ প্রস্তুতি)',
      date: 'আজকের পরীক্ষা',
      totalQuestions: questions.length,
      score: netScore,
      percentage: percentage,
      correct: correct,
      wrong: wrong,
      skipped: skipped,
      negativeMarks: negativeMarks,
      timeTaken: formatTime(15 * 60 - timeLeft),
      subjectPerformance: [
        { subject: 'বাংলা', scorePercent: 85, correct: 2, total: 2 },
        { subject: 'English', scorePercent: 61, correct: 1, total: 1 },
        { subject: 'গণিত', scorePercent: 48, correct: 1, total: 3 },
        { subject: 'বাংলাদেশ বিষয়াবলি', scorePercent: 76, correct: 2, total: 2 },
        { subject: 'ICT', scorePercent: 82, correct: 1, total: 1 },
      ],
      weakTopicsIdentified: ['গণিত — শতকরা (Percentage)', 'গণিত — অনুপাত (Ratio)', 'English — Grammar'],
      aiRecommendation: 'গণিতের Percentage এবং Ratio topic আবার revise করুন। সূত্রের পাশাপাশি শর্টকাট ভগ্নাংশ মানগুলো মুখস্থ রাখলে পরীক্ষার সময় অনেক বাঁচবে।',
    };

    setResultData(calculatedResult);
    setTestState('result');
    setShowSubmitConfirm(false);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-5 pb-20">
      
      {/* 1. INTRO STATE */}
      {testState === 'intro' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#FFDCE9] shadow-xs max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#EC3B87]/25">
            <TimerIcon className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#EC3B87] uppercase tracking-wider bg-[#FFF0F6] px-3 py-1 rounded-full">
              অফিসিয়াল সিলেবাস অনুযায়ী
            </span>
            <h2 className="text-2xl font-bold text-[#20202A] mt-2">
              BCS Preliminary Mock Test
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              বিসিএস প্রিলিমিনারি মডেল টেস্ট • ২০২৪-২৫ সংস্করণ
            </p>
          </div>

          {/* Test Guidelines */}
          <div className="bg-[#FFF8FB] rounded-2xl p-4 border border-[#FFDCE9] text-left text-xs space-y-2 text-gray-700">
            <h4 className="font-bold text-[#20202A] text-sm mb-1">পরীক্ষার নিয়মাবলি ও নির্দেশিকা:</h4>
            <p>• প্রতিটি প্রশ্নের মান ১ নম্বর।</p>
            <p>• প্রতিটি ভুল উত্তরের জন্য <strong className="text-red-600">০.৫০ নম্বর</strong> কর্তন করা হবে (Negative Marking)।</p>
            <p>• সময় শেষ হওয়ার আগে টেস্ট সাবমিট করতে পারবেন।</p>
            <p>• কোনো প্রশ্ন নিয়ে দ্বিধা থাকলে 'Mark for Review' দিয়ে রাখতে পারেন।</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 block">মোট প্রশ্ন</span>
              <span className="text-base font-bold text-[#20202A]">{questions.length} টি</span>
            </div>
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 block">মোট সময়</span>
              <span className="text-base font-bold text-[#20202A]">১৫ মিনিট</span>
            </div>
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-xs text-gray-400 block">নেগেটিভ মার্ক</span>
              <span className="text-base font-bold text-red-500">-০.৫০</span>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#EC3B87] via-[#FF5E9D] to-[#FF72A9] text-white font-bold text-base shadow-xl shadow-[#EC3B87]/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            Start Test (মক টেস্ট শুরু করুন)
          </button>
        </div>
      )}

      {/* 2. RUNNING STATE */}
      {testState === 'running' && currentQ && (
        <div className="space-y-4">
          
          {/* Top Running Bar: Timer, Progress, Submit CTA */}
          <div className="bg-white rounded-3xl p-4 border border-[#FFDCE9] shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 border border-[#FFDCE9] text-[#EC3B87] font-mono text-sm font-bold">
                <TimerIcon className="w-4 h-4 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                উত্তর প্রদান: {Object.keys(userAnswers).length}/{questions.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleReview}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  markedForReview[currentIndex]
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-white border-gray-200 text-gray-600 hover:text-amber-600'
                }`}
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                <span>Mark for Review</span>
              </button>

              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-4 py-1.5 rounded-xl bg-[#20202A] hover:bg-gray-800 text-white font-bold text-xs shadow-xs transition-all"
              >
                Submit Test
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#FFDCE9] shadow-xs space-y-5">
            <div className="flex items-center justify-between text-xs text-gray-500 pb-3 border-b border-gray-100">
              <span className="font-bold text-[#EC3B87] bg-[#FFF0F6] px-2.5 py-1 rounded-full">
                {currentQ.subjectName} • {currentQ.topicName}
              </span>
              <span className="font-bold text-[#20202A]">
                প্রশ্ন {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#20202A] leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF0F6] border-[#EC3B87] text-[#EC3B87] ring-2 ring-[#EC3B87]/30 font-bold'
                        : 'bg-white border-gray-200 hover:border-[#EC3B87] text-gray-800'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-[#EC3B87] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === questions.length - 1}
                className="px-5 py-2 rounded-xl bg-[#EC3B87] text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1 shadow-xs"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Navigator Palette */}
          <div className="bg-white rounded-3xl p-4 border border-[#FFDCE9] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-gray-600">Question Palette</span>
              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EC3B87]"></span> উত্তর দেওয়া
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> রিভিউ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span> অনুত্তর
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isReview = markedForReview[idx];
                const isCurrent = idx === currentIndex;

                let color = 'bg-gray-100 text-gray-600';
                if (isCurrent) color = 'ring-2 ring-[#EC3B87] font-bold';
                if (isAnswered) color = 'bg-[#EC3B87] text-white';
                if (isReview) color += ' border-2 border-amber-400';

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${color}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Confirmation Modal */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#FFDCE9] text-center space-y-4">
                <h3 className="font-bold text-base text-[#20202A]">টেস্ট জমা দিতে নিশ্চিত?</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>মোট প্রশ্ন: <strong className="text-[#20202A]">{questions.length}</strong></p>
                  <p>উত্তর দিয়েছেন: <strong className="text-[#EC3B87]">{Object.keys(userAnswers).length}</strong></p>
                  <p>বাকি রয়েছে: <strong className="text-gray-500">{questions.length - Object.keys(userAnswers).length}</strong></p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    ফিরে যান
                  </button>
                  <button
                    onClick={handleCalculateResult}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white text-xs font-bold shadow-md shadow-[#EC3B87]/20"
                  >
                    হ্যাঁ, সাবমিট করুন
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. RESULT ANALYSIS STATE (Prompt Section 16) */}
      {testState === 'result' && resultData && (
        <div className="space-y-5 animate-in fade-in duration-300">
          
          {/* Result Banner */}
          <div className="bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#EC3B87]/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full uppercase">
                  ফলাফল পর্যালোচনা (Result Analysis)
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                  Overall Score: {resultData.percentage}%
                </h2>
                <p className="text-xs sm:text-sm text-pink-100 mt-1">
                  মোট সময় ব্যয়: {resultData.timeTaken} • নেগেটিভ মার্ক কর্তন: -{resultData.negativeMarks}
                </p>
              </div>

              <button
                onClick={handleStartTest}
                className="px-5 py-2.5 rounded-2xl bg-white text-[#EC3B87] font-bold text-xs shadow-md hover:bg-pink-50 transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় পরীক্ষা দিন</span>
              </button>
            </div>

            {/* Score Breakdown Counters: Correct, Wrong, Skipped */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/20">
              <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-bold text-emerald-300">{resultData.correct}</span>
                <p className="text-xs text-pink-100 mt-0.5">Correct (সঠিক)</p>
              </div>
              <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-bold text-rose-300">{resultData.wrong}</span>
                <p className="text-xs text-pink-100 mt-0.5">Wrong (ভুল)</p>
              </div>
              <div className="bg-white/15 backdrop-blur-xs p-3 rounded-2xl text-center">
                <span className="text-xl sm:text-2xl font-bold text-yellow-200">{resultData.skipped}</span>
                <p className="text-xs text-pink-100 mt-0.5">Skipped (বাদ)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Subject Performance Bars */}
            <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#20202A]">Subject Performance (বিষয়ভিত্তিক ফলাফল)</h3>
              <div className="space-y-3">
                {resultData.subjectPerformance.map((sp) => (
                  <div key={sp.subject}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-[#20202A]">{sp.subject}</span>
                      <span className={sp.scorePercent < 50 ? 'text-red-500 font-bold' : 'text-gray-700'}>
                        {sp.scorePercent}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          sp.scorePercent >= 75 ? 'bg-emerald-500' : sp.scorePercent >= 60 ? 'bg-[#EC3B87]' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sp.scorePercent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics & AI Recommendation Card */}
            <div className="bg-gradient-to-br from-[#FFF5F8] to-white rounded-3xl p-5 border border-pink-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-600 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-bold text-base text-[#20202A]">চিহ্নিত দুর্বল টপিক (Weak Topics)</h3>
                </div>

                <div className="flex flex-wrap gap-2 my-3">
                  {resultData.weakTopicsIdentified.map((topic, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-xl bg-white border border-pink-200 text-xs font-bold text-red-600 shadow-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* AI Recommendation Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#FFDCE9] shadow-xs space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#EC3B87]">
                    <Bot className="w-4 h-4" />
                    <span>AI Recommendation (টিউটরের পরামর্শ):</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    "{resultData.aiRecommendation}"
                  </p>
                </div>
              </div>

              {/* View Study Plan Button */}
              <div className="mt-5 pt-4 border-t border-pink-100 flex items-center gap-3">
                <button
                  onClick={onNavigateToPlan}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#EC3B87]/25 hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Study Plan (পড়াশোনার পরিকল্পনা দেখুন)</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
