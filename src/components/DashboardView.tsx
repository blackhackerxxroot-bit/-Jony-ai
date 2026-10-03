import React from 'react';
import { 
  Flame, 
  BookOpen, 
  Timer, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  TrendingUp, 
  Bot, 
  ChevronRight, 
  Bookmark 
} from 'lucide-react';
import { UserProfile, TodayStudyPlanItem, Subject, SystemId, Language } from '../types';
import { getTranslation } from '../utils/i18n';

interface DashboardViewProps {
  user: UserProfile;
  language?: Language;
  todayPlan: TodayStudyPlanItem[];
  onTogglePlanItem: (id: string) => void;
  subjects: Subject[];
  onNavigate: (system: SystemId) => void;
  onOpenLesson: (subjectId: string, topicId: string) => void;
  onOpenAITutorWithTopic: (subject: string, topic: string) => void;
  weakTopics: { subject: string; topic: string; subjectId: string; topicId: string }[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  language = 'bn',
  todayPlan,
  onTogglePlanItem,
  subjects,
  onNavigate,
  onOpenLesson,
  onOpenAITutorWithTopic,
  weakTopics,
}) => {
  const t = getTranslation(language);
  const isEn = language === 'en';

  return (
    <div className="space-y-4 sm:space-y-6 pb-20">
      
      {/* 1. Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EC3B87] via-[#FF5E9D] to-[#FF72A9] text-white p-5 sm:p-7 shadow-xl shadow-[#EC3B87]/20">
        {/* Background decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-900/15 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{user.targetBcs}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.goodMorning}, {user.name} 👋
            </h1>
            <p className="text-pink-100 text-sm sm:text-base mt-1 font-medium">
              {t.greetingSub}
            </p>
          </div>

          {/* Quick Study Now CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenLesson('math', 'percentage')}
              className="px-5 py-3 rounded-2xl bg-white text-[#EC3B87] hover:bg-pink-50 font-bold text-sm shadow-lg shadow-black/10 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-[#EC3B87]" />
              <span>{t.studyNow}</span>
            </button>
          </div>
        </div>

        {/* Stats Row inside Welcome Card */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 pt-5 border-t border-white/20">
          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-300 text-xs sm:text-sm font-semibold">
              <Flame className="w-4 h-4 fill-yellow-300 text-yellow-400" />
              <span>{user.streakDays} {isEn ? 'Days' : 'দিন'}</span>
            </div>
            <p className="text-[11px] text-pink-100 mt-0.5">{t.studyStreak}</p>
          </div>

          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-white text-xs sm:text-sm font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>{user.completedLessons} {isEn ? 'Lessons' : 'টি'}</span>
            </div>
            <p className="text-[11px] text-pink-100 mt-0.5">{t.lessonsDone}</p>
          </div>

          <div className="bg-white/15 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-white text-xs sm:text-sm font-semibold">
              <Timer className="w-4 h-4" />
              <span>{user.mockTestsCount} {isEn ? 'Done' : 'টি'}</span>
            </div>
            <p className="text-[11px] text-pink-100 mt-0.5">{t.mockTests}</p>
          </div>
        </div>
      </div>

      {/* 2. Overall Progress & Continue Studying Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Overall Progress Radial Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.overallProgress}</span>
              <h3 className="text-lg font-bold text-[#20202A] mt-0.5">Overall Progress</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FFF0F6] text-[#EC3B87] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="my-4 flex items-center gap-4">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-pink-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#EC3B87]"
                  strokeDasharray={`${user.overallProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold text-[#20202A]">{user.overallProgress}%</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-gray-600">
              <p className="font-semibold text-[#20202A]">{t.syllabusCoverage}</p>
              <p>• {t.solvedMcq}: <span className="font-bold text-[#EC3B87]">{user.questionsSolved}</span></p>
              <p>• {t.accuracy}: <span className="font-bold text-emerald-600">{user.accuracyRate}%</span></p>
              <button
                onClick={() => onNavigate('progress')}
                className="text-[11px] font-bold text-[#EC3B87] hover:underline flex items-center gap-0.5 pt-1 cursor-pointer"
              >
                {t.viewDetailedAnalytics} <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Continue Studying */}
        <div className="md:col-span-2 bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC3B87] animate-pulse"></span>
              <h3 className="font-bold text-base text-[#20202A]">{t.continueStudying}</h3>
            </div>
            <span className="text-xs bg-[#FFF0F6] text-[#EC3B87] font-semibold px-2.5 py-1 rounded-full">
              {isEn ? 'Mathematics' : 'গণিত অধ্যায়'}
            </span>
          </div>

          <div className="my-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF8FB] to-white border border-[#FFDCE9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-gray-500 font-semibold">{isEn ? 'Math → Reasoning' : 'গণিত → গাণিতিক যুক্তি'}</span>
              <h4 className="font-bold text-sm text-[#20202A] mt-0.5">
                {isEn ? 'Percentage - Concepts, Formulas & Shortcuts' : 'শতকরা (Percentage) - মৌলিক ধারণা ও ট্রিকস'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {isEn ? 'Progress: 3/10 done • 8 mins remaining' : 'অগ্রগতি: ৩/১০ অধ্যায় সম্পন্ন • বাকি ৮ মিনিট'}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenAITutorWithTopic(isEn ? 'Mathematics' : 'গণিত', isEn ? 'Percentage' : 'শতকরা (Percentage)')}
                className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-[#EC3B87] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Ask AI Tutor"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Tutor</span>
              </button>
              <button
                onClick={() => onOpenLesson('math', 'percentage')}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#EC3B87] hover:bg-pink-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>{t.resume}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <span>{t.lastRead}: {isEn ? 'Today 9:45 AM' : 'আজ সকাল ৯:৪৫'}</span>
            <span className="text-[#EC3B87] font-semibold">{t.goalToday}</span>
          </div>
        </div>

      </div>

      {/* 3. Today's Study Plan */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-[#20202A]">{t.todaysPlan}</h3>
              <span className="bg-[#FFF0F6] text-[#EC3B87] text-xs font-bold px-2 py-0.5 rounded-full">
                {todayPlan.filter(p => p.completed).length}/{todayPlan.length} {t.completedCount}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{t.planSub}</p>
          </div>

          <button
            onClick={() => onOpenLesson('math', 'percentage')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
          >
            <span>Study Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {todayPlan.map((item) => (
            <div
              key={item.id}
              onClick={() => onTogglePlanItem(item.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                item.completed
                  ? 'bg-emerald-50/50 border-emerald-200 opacity-80'
                  : 'bg-[#FFF8FB] border-[#FFDCE9] hover:border-[#EC3B87]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    item.completed ? 'bg-emerald-500 text-white' : 'border-2 border-gray-300'
                  }`}
                >
                  {item.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${item.completed ? 'line-through text-gray-500' : 'text-[#20202A]'}`}>
                    {item.subject} — {item.topic}
                  </h4>
                  <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-[#EC3B87]" /> {item.durationMin} {t.minutes}
                  </span>
                </div>
              </div>

              {item.targetActionId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.targetActionId === 'study') {
                      onOpenLesson('math', 'percentage');
                    } else if (item.targetActionId) {
                      onNavigate(item.targetActionId);
                    }
                  }}
                  className="p-1.5 rounded-lg text-[#EC3B87] hover:bg-pink-100 transition-colors"
                  title="Start"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Subject Performance & Weak Topics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Subject Performance Bars */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-[#20202A]">{t.subjectPerformance}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{t.subjectPerfSub}</p>
            </div>
            <button
              onClick={() => onNavigate('study')}
              className="text-xs font-bold text-[#EC3B87] hover:underline cursor-pointer"
            >
              {t.viewAllSubjects}
            </button>
          </div>

          <div className="space-y-3.5">
            {[
              { name: isEn ? 'Bangla Literature & Language' : 'বাংলা', accuracy: 82, color: 'bg-[#EC3B87]' },
              { name: isEn ? 'English Language & Literature' : 'English', accuracy: 61, color: 'bg-purple-600' },
              { name: isEn ? 'Mathematical Reasoning' : 'গণিত', accuracy: 47, color: 'bg-rose-500', isLow: true },
              { name: isEn ? 'Bangladesh Affairs' : 'বাংলাদেশ বিষয়াবলি', accuracy: 76, color: 'bg-emerald-600' },
              { name: isEn ? 'ICT & Computer' : 'ICT ও তথ্যপ্রযুক্তি', accuracy: 88, color: 'bg-indigo-600' },
              { name: isEn ? 'General Science' : 'সাধারণ বিজ্ঞান', accuracy: 73, color: 'bg-amber-600' },
            ].map((sub) => (
              <div key={sub.name}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#20202A] flex items-center gap-1.5">
                    {sub.name}
                    {sub.isLow && (
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.2 rounded-md font-bold">
                        {isEn ? 'Weak Area' : 'দুর্বল বিষয়'}
                      </span>
                    )}
                  </span>
                  <span className={sub.accuracy < 50 ? 'text-red-500 font-bold' : 'text-gray-700'}>
                    {sub.accuracy}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`${sub.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${sub.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics Alert Card */}
        <div className="bg-gradient-to-br from-[#FFF5F8] to-[#FFFBFD] rounded-3xl p-5 border border-pink-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-base text-[#20202A]">{t.weakTopics}</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.weakTopicsDesc}
            </p>

            <div className="space-y-2.5 mt-4">
              {weakTopics.map((wt, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-pink-200 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 block">{wt.subject}</span>
                    <span className="text-xs font-bold text-red-600">{wt.topic}</span>
                  </div>

                  <button
                    onClick={() => onOpenAITutorWithTopic(wt.subject, wt.topic)}
                    className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#EC3B87] transition-colors cursor-pointer"
                    title="Ask AI Tutor"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-pink-100">
            <button
              onClick={() => onNavigate('practice')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs shadow-md shadow-[#EC3B87]/20 hover:opacity-95 transition-all text-center cursor-pointer"
            >
              {t.goToPractice}
            </button>
          </div>
        </div>

      </div>

      {/* 5. Recommended Lesson & Mock Test Teaser */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Recommended Lesson */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#EC3B87]/20">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EC3B87]">{t.recommendedLesson}</span>
            <h4 className="font-bold text-sm text-[#20202A] mt-0.5">
              {isEn ? 'Article 70 of Bangladesh Constitution & Floor Crossing' : 'সংবিধানের ৭০ নম্বর অনুচ্ছেদ ও ফ্লোর ক্রসিং'}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEn ? 'High-yield chapter for 47th BCS Preliminary' : 'বিসিএস ৪৭তম প্রিলির অতি-গুরুত্বপূর্ণ অধ্যায়'}
            </p>
            <button
              onClick={() => onOpenLesson('bangladesh', 'constitution')}
              className="text-xs font-bold text-[#EC3B87] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
            >
              {isEn ? 'Start Reading' : 'পাঠ শুরু করুন'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mock Test Teaser */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
            <Timer className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">{t.liveMockTeaser}</span>
            <h4 className="font-bold text-sm text-[#20202A] mt-0.5">
              {isEn ? 'BCS Preliminary Full-Length Mock Test #04' : 'বিসিএস প্রিলিমিনারি পূর্ণাঙ্গ মক টেস্ট #০৪'}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEn ? 'Full exam with standard negative marking' : 'নেগেটিভ মার্কিং সহ ২০০ নম্বরের পরীক্ষা'}
            </p>
            <button
              onClick={() => onNavigate('mock-test')}
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1 mt-2 cursor-pointer"
            >
              {t.startTest} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
