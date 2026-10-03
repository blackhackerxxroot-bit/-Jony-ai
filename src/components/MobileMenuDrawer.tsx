import React from 'react';
import { 
  X, 
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
  Bot, 
  Flame, 
  Sparkles,
  ChevronRight,
  Globe
} from 'lucide-react';
import { SystemId, UserProfile, Language } from '../types';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSystem: SystemId;
  onSelectSystem: (system: SystemId) => void;
  onOpenAITutor: () => void;
  user: UserProfile;
  language?: Language;
  onToggleLanguage?: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeSystem,
  onSelectSystem,
  onOpenAITutor,
  user,
  language = 'bn',
  onToggleLanguage,
}) => {
  if (!isOpen) return null;
  const isEn = language === 'en';

  const menuItems = [
    { id: 'home', label: isEn ? 'Dashboard' : 'ড্যাশবোর্ড', sub: isEn ? 'Home Dashboard' : 'হোম ও লক্ষ্যমাত্রা', icon: Home },
    { id: 'study', label: isEn ? 'Study Syllabus' : 'স্টাডি ও পাঠ্যক্রম', sub: isEn ? '10 Subjects' : '১০টি বিসিএস বিষয়', icon: BookOpen },
    { id: 'library', label: isEn ? 'Study Library' : 'লাইব্রেরি ও PDF', sub: isEn ? 'Authorized Books' : 'অনুমোদিত পাঠাগার', icon: Library },
    { id: 'practice', label: isEn ? 'MCQ Practice' : 'MCQ প্র্যাকটিস', sub: isEn ? 'Adaptive Questions' : 'ইন্টারেক্টিভ প্রশ্নব্যাংক', icon: CheckSquare },
    { id: 'mock-test', label: isEn ? 'Mock Test' : 'মক টেস্ট', sub: isEn ? 'Preliminary Mock' : 'প্রিলিমিনারি পূর্ণাঙ্গ', icon: Timer },
    { id: 'progress', label: isEn ? 'Progress Tracker' : 'অগ্রগতি ট্র্যাকার', sub: isEn ? 'Analytics' : 'অ্যানালিটিক্স ও রিপোর্ট', icon: BarChart3 },
    { id: 'current-affairs', label: isEn ? 'Current Affairs' : 'সাম্প্রতিক বিষয়াবলি', sub: isEn ? 'Daily & Monthly' : 'জাতীয় ও আন্তর্জাতিক', icon: Newspaper },
    { id: 'notes', label: isEn ? 'Personal Notes' : 'ব্যক্তিগত নোটস', sub: isEn ? 'Notes & Bookmarks' : 'নোট ও ট্রিকস', icon: FileEdit },
    { id: 'profile', label: isEn ? 'Profile & Settings' : 'প্রোফাইল ও সেটিংস', sub: isEn ? 'Profile' : 'সেটিংস', icon: User },
    { id: 'admin', label: isEn ? 'Admin Console' : 'অ্যাডমিন প্যানেল', sub: isEn ? 'AI & RAG Sources' : 'আরএজি ভেক্টর সোর্স', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200 border-r border-[#FFDCE9]">
        <div>
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-base">
                বি
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{isEn ? 'BCS Prep' : 'BCS প্রস্তুতি'}</h3>
                <span className="text-[10px] text-pink-100 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI-Powered
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onToggleLanguage && (
                <button
                  onClick={onToggleLanguage}
                  className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-[11px] font-bold text-white flex items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-3 h-3" />
                  <span>{isEn ? 'বাংলা' : 'EN'}</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Streak Snippet */}
          <div className="p-3 bg-[#FFF8FB] border-b border-[#FFDCE9] flex items-center gap-2.5">
            <img
              src={user.avatarUrl}
              alt={user.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://lh3.googleusercontent.com/ogw/AF2bZyhSiu_SPCzexL9JNOXGtuxIU3WW358wBKIePdBa3hLpthM=s83-c-mo';
              }}
              className="w-9 h-9 rounded-full object-cover border-2 border-[#EC3B87]"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-[#20202A] truncate">{user.name}</h4>
              <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> {user.streakDays} {isEn ? 'days streak' : 'দিন নিয়মিত'}
              </p>
            </div>
          </div>

          {/* AI Tutor Button */}
          <div className="p-3">
            <button
              onClick={() => {
                onClose();
                onOpenAITutor();
              }}
              className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs flex items-center justify-between shadow-md shadow-[#EC3B87]/25 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span>{isEn ? 'BCS AI Tutor' : 'বিসিএস এআই টিউটর'}</span>
              </div>
              <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full">{isEn ? 'Online' : 'অনলাইন'}</span>
            </button>
          </div>

          {/* Menu Items List */}
          <div className="p-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSystem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSystem(item.id as SystemId);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFF0F6] text-[#EC3B87] font-bold'
                      : 'text-gray-700 hover:bg-[#FFF8FB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[#EC3B87] text-white' : 'text-gray-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#EC3B87]' : 'text-gray-300'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#FFDCE9] bg-[#FFFDFE] text-center text-[10px] text-gray-400">
          {isEn ? 'BCS Prep • Version 3.2 • Cadre Aspirations' : 'BCS প্রস্তুতি • ভার্সন ৩.২ • ক্যাডার স্বপ্নপূরণ'}
        </div>
      </div>
    </div>
  );
};
