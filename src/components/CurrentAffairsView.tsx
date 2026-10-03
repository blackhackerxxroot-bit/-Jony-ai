import React, { useState } from 'react';
import { Newspaper, Calendar, CheckCircle2, XCircle, Sparkles, HelpCircle, ChevronRight, Globe, Bookmark } from 'lucide-react';
import { CurrentAffairsItem } from '../types';

interface CurrentAffairsViewProps {
  items: CurrentAffairsItem[];
  onOpenAITutorWithTopic: (subject: string, topic: string) => void;
}

export const CurrentAffairsView: React.FC<CurrentAffairsViewProps> = ({
  items,
  onOpenAITutorWithTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'quiz'>('daily');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const filteredItems = items.filter(item => {
    if (activeTab === 'quiz') return !!item.quiz;
    return item.category === activeTab;
  });

  const handleSelectQuizOption = (itemId: string, optIdx: number) => {
    setQuizAnswers({ ...quizAnswers, [itemId]: optIdx });
    setQuizSubmitted({ ...quizSubmitted, [itemId]: true });
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">সাম্প্রতিক বিষয়াবলি (Current Affairs)</h2>
            <span className="bg-[#FFF0F6] text-[#EC3B87] text-xs font-bold px-2 py-0.5 rounded-full">
              নিয়মিত আপডেট
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            বিসিএস প্রিলিমিনারি ও ভাইভার উপযোগী জাতীয় ও আন্তর্জাতিক সমসাময়িক ঘটনাবলি
          </p>
        </div>

        {/* 4 Tabs: Daily, Weekly, Monthly, Quiz */}
        <div className="flex bg-[#FFF8FB] p-1 rounded-2xl border border-[#FFDCE9] self-start sm:self-auto">
          {[
            { id: 'daily', label: 'দৈনিক' },
            { id: 'weekly', label: 'সাপ্তাহিক' },
            { id: 'monthly', label: 'মাসিক' },
            { id: 'quiz', label: 'কুইজ (Quiz)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#EC3B87]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs hover:border-[#EC3B87]/40 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-[#EC3B87]" />
                <span className="font-semibold text-gray-700">{item.date}</span>
                <span>•</span>
                <span>উৎস: {item.source}</span>
              </div>
              <button
                onClick={() => onOpenAITutorWithTopic('সাম্প্রতিক বিষয়াবলি', item.title)}
                className="text-[11px] text-[#EC3B87] font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <Sparkles className="w-3 h-3" /> এআই বিশ্লেষণ জানুন
              </button>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#20202A] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Key Facts List */}
            {item.keyFacts && item.keyFacts.length > 0 && (
              <div className="p-3.5 bg-[#FFF8FB] rounded-2xl border border-[#FFDCE9] space-y-1.5">
                <span className="text-[11px] font-bold text-[#EC3B87] uppercase tracking-wider block">
                  গুরুত্বপূর্ণ বিসিএস ফ্যাক্টস (Important Facts):
                </span>
                <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc">
                  {item.keyFacts.map((fact, fIdx) => (
                    <li key={fIdx} className="leading-relaxed">{fact}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive MCQ if present */}
            {item.quiz && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <span className="text-xs font-bold text-[#20202A] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#EC3B87]" /> দ্রুত কুইজ: {item.quiz.question}
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {item.quiz.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[item.id] === oIdx;
                    const isSubmitted = quizSubmitted[item.id];
                    const isCorrect = oIdx === item.quiz?.correctIndex;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(item.id, oIdx)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                              : isSelected
                              ? 'bg-red-100 border-red-400 text-red-800'
                              : 'bg-white border-gray-200 text-gray-500'
                            : 'bg-white border-gray-200 hover:border-[#EC3B87] hover:bg-[#FFF0F6]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted[item.id] && (
                  <p className="text-[11px] text-gray-600 bg-white p-2 rounded-xl border border-gray-100">
                    💡 <strong>ব্যাখ্যা:</strong> {item.quiz.explanation}
                  </p>
                )}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
