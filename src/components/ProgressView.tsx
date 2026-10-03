import React from 'react';
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Calendar, 
  Target, 
  Clock, 
  AlertTriangle,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile, Subject } from '../types';

interface ProgressViewProps {
  user: UserProfile;
  subjects: Subject[];
  onOpenLesson: (subjectId: string, topicId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  subjects,
  onOpenLesson,
}) => {
  const weeklyHours = [
    { day: 'শনি', hours: 3.5 },
    { day: 'রবি', hours: 4.2 },
    { day: 'সোম', hours: 5.0 },
    { day: 'মঙ্গল', hours: 3.8 },
    { day: 'বুধ', hours: 6.1 },
    { day: 'বৃহঃ', hours: 4.5 },
    { day: 'শুক্র', hours: 5.5 },
  ];

  const maxHours = Math.max(...weeklyHours.map(w => w.hours));

  const strongTopics = [
    { name: 'চর্যাপদ ও মধ্যযুগ', subject: 'বাংলা', score: 92 },
    { name: 'কম্পিউটার সংগঠন ও মেমোরি', subject: 'ICT', score: 88 },
    { name: 'মুক্তিযুদ্ধ ও মুজিবনগর সরকার', subject: 'বাংলাদেশ বিষয়াবলি', score: 85 },
  ];

  const weakTopics = [
    { name: 'শতকরা (Percentage)', subject: 'গণিত', subjectId: 'math', topicId: 'percentage', score: 45 },
    { name: 'Subject-Verb Agreement', subject: 'English', subjectId: 'english', topicId: 'eng-grammar', score: 52 },
    { name: 'আলো ও প্রতিসরণ', subject: 'সাধারণ বিজ্ঞান', subjectId: 'science', topicId: 'physics', score: 55 },
  ];

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">অগ্রগতি ও পারফরম্যান্স বিশ্লেষণ</h2>
          <p className="text-xs text-gray-500 mt-0.5">আপনার পড়াশোনার বিস্তারিত অ্যানালিটিক্স ও বিসিএস প্রস্তুতি পরিসংখ্যান</p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFF0F6] px-3.5 py-1.5 rounded-2xl text-[#EC3B87] font-bold text-xs">
          <Flame className="w-4 h-4 fill-[#EC3B87]" />
          <span>টানা ১২ দিন নিয়মিত পড়াশোনা!</span>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-3xl border border-[#FFDCE9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>সিলেবাস সম্পন্ন</span>
            <Target className="w-4 h-4 text-[#EC3B87]" />
          </div>
          <span className="text-2xl font-bold text-[#20202A]">{user.overallProgress}%</span>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3" /> +৪% এই সপ্তাহে
          </p>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[#FFDCE9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>সমাধানকৃত MCQ</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-bold text-[#20202A]">{user.questionsSolved}</span>
          <p className="text-[11px] text-gray-500 mt-1">সর্বমোট সঠিক: ২৬০টি</p>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[#FFDCE9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>নির্ভুলতার হার</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-bold text-[#20202A]">{user.accuracyRate}%</span>
          <p className="text-[11px] text-gray-500 mt-1">মক টেস্ট গড় স্কোর</p>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[#FFDCE9] shadow-xs">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>অধ্যয়ন সময়</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-bold text-[#20202A]">৩২.৬ ঘণ্টা</span>
          <p className="text-[11px] text-gray-500 mt-1">গত ৭ দিনে</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Weekly Study Hours Chart */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm sm:text-base text-[#20202A]">সাপ্তাহিক অধ্যয়ন সময় (ঘণ্টা)</h3>
            <span className="text-xs text-[#EC3B87] font-semibold bg-[#FFF0F6] px-2 py-0.5 rounded-full">
              গড়: ৪.৬ ঘণ্টা/দিন
            </span>
          </div>

          <div className="pt-6 pb-2 flex items-end justify-between gap-2 h-44 border-b border-gray-100">
            {weeklyHours.map((w, idx) => {
              const heightPercent = (w.hours / maxHours) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] text-gray-400 group-hover:text-[#EC3B87] font-semibold">
                    {w.hours}h
                  </span>
                  <div className="w-full max-w-[28px] bg-gray-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-[#EC3B87] to-[#FF72A9] rounded-t-xl transition-all group-hover:opacity-90"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-gray-600 font-medium">{w.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-500 text-center">
            বুধবার সর্বোচ্চ ৬.১ ঘণ্টা পড়াশোনা করেছেন 🚀
          </p>
        </div>

        {/* Subject Progress Mastery */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-3">
          <h3 className="font-bold text-sm sm:text-base text-[#20202A]">বিষয়ভিত্তিক অগ্রগতি কভারেজ</h3>
          
          <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
            {subjects.map((sub) => {
              const percent = Math.round((sub.completedLessons / sub.totalLessons) * 100);
              return (
                <div key={sub.id}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#20202A]">{sub.name}</span>
                    <span className="text-gray-600">{sub.completedLessons}/{sub.totalLessons} পাঠ ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] h-full rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Strong Topics vs Weak Topics Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Strong Topics */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#20202A]">আপনার শক্তিশালী টপিক (Strong Topics)</h3>
          </div>
          <p className="text-xs text-gray-500">এই টপিকগুলোতে আপনার নির্ভুলতা ৮০% এর বেশি</p>

          <div className="space-y-2.5 pt-2">
            {strongTopics.map((st, idx) => (
              <div key={idx} className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#20202A]">{st.name}</h4>
                  <span className="text-[10px] text-gray-500">{st.subject}</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                  {st.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#20202A]">অবিলম্বে রিভিশন প্রয়োজন (Weak Topics)</h3>
          </div>
          <p className="text-xs text-gray-500">এই টপিকগুলোতে পুনরায় অনুশীলন ও কনসেপ্ট ক্লিয়ার করা জরুরি</p>

          <div className="space-y-2.5 pt-2">
            {weakTopics.map((wt, idx) => (
              <div key={idx} className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#20202A]">{wt.name}</h4>
                  <span className="text-[10px] text-gray-500">{wt.subject}</span>
                </div>
                <button
                  onClick={() => onOpenLesson(wt.subjectId, wt.topicId)}
                  className="px-2.5 py-1 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold transition-colors"
                >
                  রিভাইজ
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
