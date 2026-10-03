import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Bot, 
  Filter, 
  AlertTriangle,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { MCQQuestion } from '../types';

interface PracticeViewProps {
  questions: MCQQuestion[];
  onOpenAITutorWithQuestion: (q: MCQQuestion, userAnsIndex: number) => void;
  onOpenLesson: (subjectId: string, topicId: string) => void;
  onTrackMistake: (topicName: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  onOpenAITutorWithQuestion,
  onOpenLesson,
  onTrackMistake,
}) => {
  const [activeTab, setActiveTab] = useState<'adaptive' | 'previous'>('adaptive');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  
  // Previous BCS questions filters
  const [filterExam, setFilterExam] = useState<string>('সব বিসিএস');
  const [filterSubject, setFilterSubject] = useState<string>('সব বিষয়');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('সব');

  const filteredQuestions = questions.filter(q => {
    if (activeTab === 'previous') {
      if (filterExam !== 'সব বিসিএস' && q.bcsExamTag && !q.bcsExamTag.includes(filterExam)) return false;
      if (filterSubject !== 'সব বিষয়' && q.subjectName !== filterSubject) return false;
      if (filterDifficulty !== 'সব' && q.difficulty !== filterDifficulty) return false;
    }
    return true;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const totalQ = filteredQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const currentAnswer = userAnswers[currentIndex];
  const isCurrentSubmitted = isSubmitted[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isCurrentSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentIndex]: index });
  };

  const handleSubmitCurrent = () => {
    if (currentAnswer === undefined) return;
    setIsSubmitted({ ...isSubmitted, [currentIndex]: true });

    // Track mistakes
    if (currentAnswer !== currentQ.correctIndex) {
      onTrackMistake(currentQ.topicName);
    }
  };

  const toggleReview = () => {
    setMarkedForReview({
      ...markedForReview,
      [currentIndex]: !markedForReview[currentIndex],
    });
  };

  const toggleBookmark = () => {
    setBookmarked({
      ...bookmarked,
      [currentIndex]: !bookmarked[currentIndex],
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header & Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#FFDCE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">MCQ প্র্যাকটিস ও প্রশ্নব্যাংক</h2>
          <p className="text-xs text-gray-500 mt-0.5">অ্যাডাপ্টিভ অনুশীলন ও বিগত বিসিএস প্রিলিমিনারি প্রশ্ন সমাধান</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#FFF8FB] p-1 rounded-2xl border border-[#FFDCE9] self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveTab('adaptive');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'adaptive'
                ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#EC3B87]'
            }`}
          >
            অ্যাডাপ্টিভ প্র্যাকটিস
          </button>
          <button
            onClick={() => {
              setActiveTab('previous');
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'previous'
                ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#EC3B87]'
            }`}
          >
            বিগত বিসিএস প্রশ্নব্যাংক
          </button>
        </div>
      </div>

      {/* Previous BCS Filters Bar if 'previous' tab */}
      {activeTab === 'previous' && (
        <div className="bg-white rounded-2xl p-3 border border-[#FFDCE9] flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-gray-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#EC3B87]" /> ফিল্টার:
          </span>

          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs font-medium focus:ring-1 focus:ring-[#EC3B87]"
          >
            <option value="সব বিসিএস">সব বিসিএস পরীক্ষা</option>
            <option value="৪৬তম">৪৬তম বিসিএস</option>
            <option value="৪৫তম">৪৫তম বিসিএস</option>
            <option value="৪৪তম">৪৪তম বিসিএস</option>
            <option value="৪৩তম">৪৩তম বিসিএস</option>
            <option value="৪২তম">৪২তম বিসিএস</option>
            <option value="৪১তম">৪১তম বিসিএস</option>
          </select>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs font-medium focus:ring-1 focus:ring-[#EC3B87]"
          >
            <option value="সব বিষয়">সব বিষয়</option>
            <option value="বাংলা">বাংলা</option>
            <option value="English">English</option>
            <option value="গণিত">গণিত</option>
            <option value="বাংলাদেশ বিষয়াবলি">বাংলাদেশ বিষয়াবলি</option>
            <option value="সাধারণ বিজ্ঞান">সাধারণ বিজ্ঞান</option>
            <option value="ICT">ICT</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs font-medium focus:ring-1 focus:ring-[#EC3B87]"
          >
            <option value="সব">সব লেভেল</option>
            <option value="easy">সহজ (Easy)</option>
            <option value="medium">মধ্যম (Medium)</option>
            <option value="hard">কঠিন (Hard)</option>
          </select>

          <span className="text-gray-400 ml-auto">
            পাওয়া গেছে: <span className="font-bold text-[#EC3B87]">{filteredQuestions.length}</span> টি প্রশ্ন
          </span>
        </div>
      )}

      {/* Main MCQ Practice Card */}
      {currentQ ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#FFDCE9] shadow-xs space-y-5">
          
          {/* Top Bar: Topic Name, Question X of Y, Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#EC3B87] bg-[#FFF0F6] px-2.5 py-1 rounded-full">
                  {currentQ.topicName} — Practice
                </span>
                {currentQ.bcsExamTag && (
                  <span className="text-[10px] font-semibold bg-pink-100/70 text-[#EC3B87] px-2 py-0.5 rounded-md">
                    {currentQ.bcsExamTag}
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                  currentQ.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                  currentQ.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {currentQ.difficulty}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#20202A]">
                প্রশ্ন {currentIndex + 1}/{totalQ}
              </span>

              {/* Mark for Review Button */}
              <button
                onClick={toggleReview}
                className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition-colors ${
                  markedForReview[currentIndex]
                    ? 'bg-amber-100 border-amber-300 text-amber-800 font-bold'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-amber-600'
                }`}
                title="Mark for Review"
              >
                <Flag className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">রিভিউ</span>
              </button>

              {/* Bookmark Button */}
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                  bookmarked[currentIndex]
                    ? 'bg-pink-100 border-[#EC3B87] text-[#EC3B87]'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-[#EC3B87]'
                }`}
                title="সেভ / বুকমার্ক"
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-bold text-[#20202A] leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = currentAnswer === optIdx;
              const isCorrect = optIdx === currentQ.correctIndex;
              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

              let optionStyle = 'bg-white border-gray-200 hover:border-[#EC3B87] text-[#20202A]';

              if (isCurrentSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-xs';
                } else {
                  optionStyle = 'bg-gray-50 border-gray-100 text-gray-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#FFF0F6] border-[#EC3B87] text-[#EC3B87] font-semibold ring-2 ring-[#EC3B87]/30';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isCurrentSubmitted}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCurrentSubmitted
                        ? isCorrect
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                        : isSelected
                        ? 'bg-[#EC3B87] text-white'
                        : 'bg-[#FFF8FB] text-gray-600 border border-[#FFDCE9]'
                    }`}>
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCurrentSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row: Submit or Show Result */}
          {!isCurrentSubmitted ? (
            <div className="pt-2">
              <button
                onClick={handleSubmitCurrent}
                disabled={currentAnswer === undefined}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-sm shadow-md shadow-[#EC3B87]/20 hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer"
              >
                উত্তর সাবমিট করুন (Submit Answer)
              </button>
            </div>
          ) : (
            /* Post-Submission Result & Detailed Explanation */
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div className={`p-4 rounded-2xl border ${
                currentAnswer === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {currentAnswer === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-bold text-sm">সঠিক উত্তর! (Correct)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span className="font-bold text-sm">ভুল উত্তর! (Wrong)</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold">
                    সঠিক উত্তর: ({String.fromCharCode(65 + currentQ.correctIndex)}) {currentQ.options[currentQ.correctIndex]}
                  </span>
                </div>

                <div className="mt-2 text-xs leading-relaxed space-y-1">
                  <p className="font-bold">ব্যাখ্যা (Explanation):</p>
                  <p className="whitespace-pre-line">{currentQ.explanation}</p>
                </div>
              </div>

              {/* Adaptive Recommendation if user made mistake */}
              {currentAnswer !== currentQ.correctIndex && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">অ্যাডাপ্টিভ সুপারিশ (Adaptive Recommendation):</p>
                      <p className="text-[11px] mt-0.5">
                        আপনি এই প্রশ্নে ভুল করেছেন। সিস্টেম আপনার জন্য <span className="font-bold text-red-600">{currentQ.topicName}</span> টপিকটি Weak হিসেবে চিহ্নিত করেছে।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenLesson(currentQ.subjectId, currentQ.topicId)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 font-bold text-xs text-amber-800 hover:bg-amber-100 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> রিভাইজ করুন
                    </button>
                    <button
                      onClick={() => onOpenAITutorWithQuestion(currentQ, currentAnswer)}
                      className="px-3 py-1.5 rounded-xl bg-[#EC3B87] text-white font-bold text-xs hover:bg-pink-600 flex items-center gap-1 shadow-xs"
                    >
                      <Bot className="w-3.5 h-3.5" /> ভুলটা বুঝাও
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls: Previous / Next */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-[#FFDCE9] text-gray-700 text-xs font-bold hover:bg-[#FFF8FB] disabled:opacity-40 flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-gray-400">
              {currentIndex + 1} / {totalQ}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === totalQ - 1}
              className="px-5 py-2.5 rounded-xl bg-[#20202A] text-white text-xs font-bold hover:bg-gray-800 disabled:opacity-40 flex items-center gap-1 shadow-xs transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-[#FFDCE9] text-center">
          <p className="text-gray-500 text-sm">কোনো প্রশ্ন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </div>
      )}

      {/* Question Quick Palette Grid */}
      <div className="bg-white rounded-3xl p-4 border border-[#FFDCE9] shadow-xs">
        <h4 className="text-xs font-bold text-gray-600 mb-3">প্রশ্ন নেভিগেটর প্যালেট (Question Navigator)</h4>
        <div className="flex flex-wrap gap-2">
          {filteredQuestions.map((q, idx) => {
            const isAnswered = isSubmitted[idx];
            const isReview = markedForReview[idx];
            const isCurrent = idx === currentIndex;

            let badgeColor = 'bg-gray-100 text-gray-600 border border-gray-200';
            if (isCurrent) {
              badgeColor = 'ring-2 ring-[#EC3B87] font-bold';
            }
            if (isAnswered) {
              const wasCorrect = userAnswers[idx] === q.correctIndex;
              badgeColor += wasCorrect ? ' bg-emerald-100 text-emerald-800' : ' bg-rose-100 text-rose-800';
            }
            if (isReview) {
              badgeColor += ' border-2 border-amber-500';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${badgeColor}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
