import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Bot, 
  CheckCircle, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  Clock, 
  Check, 
  HelpCircle,
  Bookmark
} from 'lucide-react';
import { Subject, Topic, Lesson } from '../types';

interface StudyViewProps {
  subjects: Subject[];
  initialSubjectId?: string;
  initialTopicId?: string;
  onOpenAITutorWithContext: (subject: string, topic: string, lessonTitle?: string) => void;
  onNavigateToPracticeTopic: (topicId: string, topicName: string) => void;
}

export const StudyView: React.FC<StudyViewProps> = ({
  subjects,
  initialSubjectId,
  initialTopicId,
  onOpenAITutorWithContext,
  onNavigateToPracticeTopic,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 'math');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(initialTopicId || 'percentage');
  const [practiceAnswer, setPracticeAnswer] = useState<number | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[2]; // default math
  const currentTopic = currentSubject.topics.find(t => t.id === selectedTopicId) || currentSubject.topics[0];
  const currentLesson = currentTopic?.lessons && currentTopic.lessons.length > 0 ? currentTopic.lessons[0] : null;

  // Handler for practice question
  const handlePracticeSubmit = (index: number) => {
    setPracticeAnswer(index);
    setPracticeSubmitted(true);
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Subject Filter Tabs Bar */}
      <div className="bg-white rounded-3xl p-3 border border-[#FFDCE9] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setSelectedTopicId(sub.topics[0]?.id || null);
                  setPracticeSubmitted(false);
                  setPracticeAnswer(null);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-md shadow-[#EC3B87]/20'
                    : 'bg-[#FFF8FB] text-gray-700 hover:bg-[#FFF0F6] hover:text-[#EC3B87] border border-[#FFDCE9]'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {sub.totalMarks}M
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Topics List (4 columns) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-[#FFDCE9] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-sm text-[#20202A]">{currentSubject.name} অধ্যায়সমূহ</h3>
                <p className="text-[11px] text-gray-500">{currentSubject.englishName}</p>
              </div>
              <span className="text-xs bg-[#FFF0F6] text-[#EC3B87] font-bold px-2 py-0.5 rounded-full">
                {currentSubject.topics.length} টপিক
              </span>
            </div>

            <div className="divide-y divide-gray-50 mt-2">
              {currentSubject.topics.map((topic) => {
                const isActive = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      setPracticeSubmitted(false);
                      setPracticeAnswer(null);
                    }}
                    className={`w-full p-3 rounded-2xl text-left transition-all my-1 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FFF0F6] border border-[#FFDCE9] text-[#EC3B87]'
                        : 'hover:bg-[#FFF8FB] text-gray-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">{topic.name}</span>
                        {topic.isWeak && (
                          <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.2 rounded font-bold">
                            দুর্বল
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{topic.englishName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{topic.lessonsCount} পাঠ</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#EC3B87]' : 'text-gray-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Main Lesson Detail View (8 columns) */}
        <div className="lg:col-span-8">
          {currentLesson ? (
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#FFDCE9] shadow-xs space-y-6">
              
              {/* Header: শতকরা (Percentage), Progress: 3/10 */}
              <div className="pb-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span>{currentSubject.name}</span>
                    <span>•</span>
                    <span className="text-[#EC3B87] font-semibold">{currentTopic.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {currentLesson.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#20202A] tracking-tight">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-[#FFF8FB] border border-[#FFDCE9] px-3 py-1.5 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-500 block">অগ্রগতি</span>
                    <span className="text-xs font-bold text-[#EC3B87]">৩/১০ সম্পন্ন</span>
                  </div>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2.5 rounded-2xl border transition-colors ${
                      isBookmarked
                        ? 'bg-pink-100 border-[#EC3B87] text-[#EC3B87]'
                        : 'bg-white border-gray-200 text-gray-500 hover:text-[#EC3B87]'
                    }`}
                    title="বুকমার্ক করুন"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Introduction */}
              <div className="p-4 rounded-2xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs sm:text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-[#EC3B87] block mb-1">পাঠ পরিচিতি:</span>
                {currentLesson.content.introduction}
              </div>

              {/* শতকরা কী? (Bengali Explanation) */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#20202A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EC3B87]"></span>
                  শতকরা কী? (মৌলিক ধারণা)
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-4 border-l-2 border-[#FFDCE9]">
                  {currentLesson.content.definition}
                </p>
              </div>

              {/* Formula Card: Percentage = (part / total) × 100 */}
              {currentLesson.content.formula && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EC3B87]/10 via-[#FF72A9]/10 to-pink-50 p-5 border-2 border-[#EC3B87]/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#EC3B87] uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>গোল্ডেন ফর্মুলা কার্ড (Formula)</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-pink-200 shadow-xs inline-block my-1 font-mono text-sm sm:text-base font-bold text-[#EC3B87]">
                    {currentLesson.content.formula}
                  </div>

                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {currentLesson.content.formulaExplanation}
                  </p>
                </div>
              )}

              {/* মনে রাখবে (Key Points & Tips) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>মনে রাখবে (বিসিএস পরীক্ষায় সময়ের সাশ্রয়):</span>
                </div>
                <ul className="text-xs text-amber-900 space-y-1.5 pl-5 list-disc">
                  {currentLesson.content.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
                <p className="text-xs font-medium text-amber-950 pt-1 italic">
                  💡 {currentLesson.content.rememberTip}
                </p>
              </div>

              {/* উদাহরণ (Worked Examples) */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#20202A] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#EC3B87]" />
                  <span>বাছাইকৃত উদাহরণ ও সমাধান (Worked Examples):</span>
                </h3>

                <div className="space-y-3">
                  {currentLesson.content.workedExamples.map((ex, exIdx) => (
                    <div key={exIdx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-[#20202A]">
                          উদাহরণ {exIdx + 1}: {ex.question}
                        </h4>
                        {ex.bcsReference && (
                          <span className="text-[10px] bg-pink-100 text-[#EC3B87] font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {ex.bcsReference}
                          </span>
                        )}
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs text-gray-700 whitespace-pre-line font-medium leading-relaxed">
                        {ex.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice (মিনি প্র্যাকটিস) */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FFF8FB] to-white border-2 border-pink-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#EC3B87] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> তাৎক্ষণিক অনুশীলন (Practice)
                  </span>
                  <span className="text-[11px] text-gray-500">প্রশ্ন ১/১</span>
                </div>

                <p className="text-sm font-bold text-[#20202A]">
                  {currentLesson.content.quickPractice.question}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {currentLesson.content.quickPractice.options.map((opt, oIdx) => {
                    const isSelected = practiceAnswer === oIdx;
                    const isCorrect = oIdx === currentLesson.content.quickPractice.correctIndex;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handlePracticeSubmit(oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          practiceSubmitted
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                              : isSelected
                              ? 'bg-red-100 border-red-400 text-red-800'
                              : 'bg-white border-gray-200 text-gray-500'
                            : isSelected
                            ? 'bg-[#FFF0F6] border-[#EC3B87] text-[#EC3B87]'
                            : 'bg-white border-[#FFDCE9] hover:border-[#EC3B87] text-gray-700'
                        }`}
                      >
                        <span className="mr-2">({String.fromCharCode(65 + oIdx)})</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {practiceSubmitted && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    practiceAnswer === currentLesson.content.quickPractice.correctIndex
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    <p className="font-bold mb-1">
                      {practiceAnswer === currentLesson.content.quickPractice.correctIndex
                        ? '🎉 সঠিক উত্তর!'
                        : '⚠️ ভুল উত্তর! সঠিক উত্তর হলো: ' + currentLesson.content.quickPractice.options[currentLesson.content.quickPractice.correctIndex]}
                    </p>
                    <p>{currentLesson.content.quickPractice.explanation}</p>
                  </div>
                )}
              </div>

              {/* Large "🤖 বুঝতে পারছি না" Button (Prominent trigger) */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenAITutorWithContext(currentSubject.name, currentTopic.name, currentLesson.title)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#EC3B87] via-[#FF5E9D] to-[#FF72A9] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#EC3B87]/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Bot className="w-6 h-6 animate-bounce" />
                  <span>🤖 বুঝতে পারছি না? এআই টিউটরের কাছে এখনই জেনে নিন</span>
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-2">
                  টিউটর আপনার অধ্যায়ের প্রসঙ্গ স্বয়ংক্রিয়ভাবে বুঝে সহজ বাংলায় বুঝিয়ে দেবে।
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-[#FFDCE9] text-center space-y-3">
              <BookOpen className="w-12 h-12 text-[#EC3B87] mx-auto opacity-50" />
              <h3 className="font-bold text-base text-[#20202A]">{currentTopic.name} অধ্যায়ের পাঠ প্রস্তুত হচ্ছে</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                এই অধ্যায়টির নতুন সিলেবাস ভিত্তিক কনটেন্ট আপলোড প্রক্রিয়াধীন। আপনি চাইলে এখনই প্র্যাকটিসে গিয়ে প্রশ্ন সমাধান করতে পারেন।
              </p>
              <button
                onClick={() => onNavigateToPracticeTopic(currentTopic.id, currentTopic.name)}
                className="px-4 py-2 rounded-xl bg-[#EC3B87] text-white text-xs font-bold"
              >
                টপিকভিত্তিক MCQ প্র্যাকটিস
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
