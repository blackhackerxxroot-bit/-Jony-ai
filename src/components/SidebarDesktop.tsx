import React from 'react';
import {
  Home,
  BookOpen,
  Library,
  CheckSquare,
  Timer,
  BarChart3,
  Newspaper,
  FileEdit,
  User,
  Shield,
  Sparkles,
  Flame,
  ChevronRight
} from 'lucide-react';
import { SystemId, UserProfile, Language } from '../types';

interface SidebarDesktopProps {
  activeSystem: SystemId;
  onSelectSystem: (system: SystemId) => void;
  onOpenAITutor: () => void;
  user: UserProfile;
  language?: Language;
}

export const SidebarDesktop: React.FC<SidebarDesktopProps> = ({
  activeSystem,
  onSelectSystem,
  onOpenAITutor,
  user,
  language = 'bn',
}) => {
  const isEn = language === 'en';

  const mainNav = [
    { id: 'home', label: isEn ? 'Dashboard' : 'ড্যাশবোর্ড', sub: isEn ? 'Overview & Goals' : 'হোম ও লক্ষ্যমাত্রা', icon: Home },
    { id: 'study', label: isEn ? 'Study Syllabus' : 'স্টাডি ও পাঠ্যক্রম', sub: isEn ? 'All 10 Subjects' : '১০টি বিসিএস বিষয়', icon: BookOpen },
    { id: 'library', label: isEn ? 'Study Library' : 'লাইব্রেরি ও PDF', sub: isEn ? 'Authorized Books' : 'অনুমোদিত পাঠাগার', icon: Library },
    { id: 'practice', label: isEn ? 'MCQ Practice' : 'MCQ প্র্যাকটিস', sub: isEn ? 'Adaptive Questions' : 'ইন্টারেক্টিভ প্রশ্নব্যাংক', icon: CheckSquare },
    { id: 'mock-test', label: isEn ? 'Mock Test' : 'মক টেস্ট', sub: isEn ? 'BCS Preliminary' : 'প্রিলিমিনারি পূর্ণাঙ্গ', icon: Timer },
    { id: 'progress', label: isEn ? 'Progress Tracker' : 'অগ্রগতি ট্র্যাকার', sub: isEn ? 'Analytics & Weakness' : 'অ্যানালিটিক্স ও রিপোর্ট', icon: BarChart3 },
    { id: 'current-affairs', label: isEn ? 'Current Affairs' : 'সাম্প্রতিক বিষয়াবলি', sub: isEn ? 'Daily & Monthly' : 'জাতীয় ও আন্তর্জাতিক', icon: Newspaper },
    { id: 'notes', label: isEn ? 'Personal Notes' : 'ব্যক্তিগত নোটস', sub: isEn ? 'Formulas & Bookmarks' : 'নোট ও ট্রিকস', icon: FileEdit },
    { id: 'profile', label: isEn ? 'Profile & Settings' : 'প্রোফাইল ও সেটিংস', sub: isEn ? 'Account' : 'সেটিংস', icon: User },
    { id: 'admin', label: isEn ? 'Admin Console' : 'অ্যাডমিন প্যানেল', sub: isEn ? 'AI & RAG Sources' : 'আরএজি ভেক্টর সোর্স', icon: Shield },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#FFDCE9] shrink-0 h-[calc(100vh-61px)] sticky top-[61px] p-4 justify-between">
      <div className="space-y-4">
        {/* User Quick Info */}
        <div className="p-3 bg-gradient-to-br from-[#FFF0F6] to-[#FFF8FB] border border-[#FFDCE9] rounded-2xl flex items-center gap-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://lh3.googleusercontent.com/ogw/AF2bZyhSiu_SPCzexL9JNOXGtuxIU3WW358wBKIePdBa3hLpthM=s83-c-mo';
            }}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#EC3B87]"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-[#20202A] truncate">{user.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" /> {user.streakDays} {isEn ? 'd streak' : 'দিন স্ট্রাইক'}
              </span>
              <span className="text-[10px] text-gray-500">{user.overallProgress}% {isEn ? 'done' : 'সম্পন্ন'}</span>
            </div>
          </div>
        </div>

        {/* AI Tutor Prominent Banner */}
        <button
          onClick={onOpenAITutor}
          className="w-full p-3 bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white rounded-2xl shadow-md shadow-[#EC3B87]/20 flex items-center justify-between group hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">{isEn ? 'BCS AI Tutor' : 'বিসিএস AI Tutor'}</p>
              <p className="text-[10px] text-pink-100 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span> {isEn ? 'Online 24/7' : 'সবসময় প্রস্তুত'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation list */}
        <nav aria-label="Desktop navigation" className="space-y-1 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeSystem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSystem(item.id as SystemId)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF0F6] text-[#EC3B87] font-semibold shadow-xs'
                    : 'text-gray-700 hover:bg-[#FFF8FB] hover:text-[#EC3B87]'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#EC3B87] text-white' : 'text-gray-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs truncate">{item.label}</p>
                  <p className="text-[10px] text-gray-400 truncate">{item.sub}</p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Target BCS Card */}
      <div className="p-3 bg-white border border-[#FFDCE9] rounded-2xl text-center">
        <p className="text-[11px] text-gray-500">{isEn ? 'Target Examination' : 'টার্গেট পরীক্ষা'}</p>
        <p className="text-xs font-bold text-[#EC3B87] mt-0.5">{user.targetBcs}</p>
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-[#EC3B87] h-full rounded-full" style={{ width: `${user.overallProgress}%` }}></div>
        </div>
      </div>
    </aside>
  );
};
