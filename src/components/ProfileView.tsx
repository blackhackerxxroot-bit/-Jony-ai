import React, { useState } from 'react';
import { 
  User, 
  Flame, 
  BookOpen, 
  Timer, 
  CheckCircle2, 
  Award, 
  Settings, 
  Bell, 
  Moon, 
  Shield, 
  LogOut,
  Target,
  Sparkles,
  ChevronRight,
  Globe,
  Edit2,
  Camera
} from 'lucide-react';
import { UserProfile, SystemId, Language } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  language: Language;
  onSetLanguage: (lang: Language) => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigateToAdmin: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  language,
  onSetLanguage,
  onUpdateUser,
  onNavigateToAdmin,
}) => {
  const isEn = language === 'en';
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyTargetMin, setDailyTargetMin] = useState(120);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(user.name);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateUser({ avatarUrl: reader.result });
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const badges = [
    { name: isEn ? '12 Days Streak' : 'টানা ১২ দিন স্ট্রাইক', icon: '🔥', date: isEn ? 'Achieved today' : 'আজ অর্জিত' },
    { name: isEn ? 'Percentage Master' : 'শতকরা মাস্টার', icon: '🎯', date: isEn ? 'Yesterday' : 'গতকাল' },
    { name: isEn ? '50+ Lessons Done' : '৫০+ লেসন সমাপন', icon: '📚', date: isEn ? '3 days ago' : '৩ দিন আগে' },
    { name: isEn ? 'First Mock Test Done' : 'প্রথম মক টেস্ট বিজয়ী', icon: '🏆', date: isEn ? '1 week ago' : '১ সপ্তাহ আগে' },
  ];

  const handleSave = () => {
    onUpdateUser({ name: editNameValue.trim() || user.name });
    setIsEditingName(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto">
      
      {/* Profile Main Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FFDCE9] shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#EC3B87]/10 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative group">
            <img
              src={user.avatarUrl}
              alt={user.name}
              onError={(e) => {
                // Graceful fallback to default SVG avatar
                (e.currentTarget as HTMLImageElement).src = 'https://lh3.googleusercontent.com/ogw/AF2bZyhSiu_SPCzexL9JNOXGtuxIU3WW358wBKIePdBa3hLpthM=s83-c-mo';
              }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#EC3B87] shadow-lg shadow-[#EC3B87]/20"
            />
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Change Profile Picture Camera Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
              title={isEn ? "Change profile photo" : "প্রোফাইল ছবি পরিবর্তন করুন"}
            >
              <Camera className="w-5 h-5 text-white mb-0.5" />
              <span className="text-[9px] font-bold">{isEn ? 'Change' : 'ছবি দিন'}</span>
            </button>

            <span className="absolute bottom-0 right-0 bg-amber-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
              <Flame className="w-4 h-4 fill-white" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editNameValue}
                    onChange={(e) => setEditNameValue(e.target.value)}
                    className="px-3 py-1 rounded-xl border border-[#EC3B87] text-base font-bold text-[#20202A] focus:outline-hidden"
                    placeholder="Enter name"
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-[#EC3B87] text-white rounded-xl text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">{user.name}</h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 rounded-lg hover:bg-pink-50 text-[#EC3B87] transition-colors cursor-pointer"
                    title="Edit Name"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <span className="text-xs bg-[#FFF0F6] text-[#EC3B87] font-bold px-2.5 py-0.5 rounded-full">
                {isEn ? 'Cadre Aspirant' : 'ক্যাডার প্রত্যাশী'}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{user.title}</p>
            <p className="text-xs text-[#EC3B87] font-semibold flex items-center justify-center sm:justify-start gap-1 pt-1">
              <Target className="w-3.5 h-3.5" /> {isEn ? 'Target' : 'টার্গেট'}: {user.targetBcs}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-[#FFF8FB] p-3 rounded-2xl border border-[#FFDCE9] text-center">
            <span className="text-xl font-bold text-amber-500">{user.streakDays} {isEn ? 'Days' : 'দিন'}</span>
            <p className="text-[11px] text-gray-500 mt-0.5">{isEn ? 'Study Streak 🔥' : 'Study Streak 🔥'}</p>
          </div>

          <div className="bg-[#FFF8FB] p-3 rounded-2xl border border-[#FFDCE9] text-center">
            <span className="text-xl font-bold text-[#EC3B87]">{user.overallProgress}%</span>
            <p className="text-[11px] text-gray-500 mt-0.5">{isEn ? 'Syllabus Covered' : 'সিলেবাস কভার্ড'}</p>
          </div>

          <div className="bg-[#FFF8FB] p-3 rounded-2xl border border-[#FFDCE9] text-center">
            <span className="text-xl font-bold text-purple-600">{user.completedLessons} {isEn ? 'Lessons' : 'টি'}</span>
            <p className="text-[11px] text-gray-500 mt-0.5">{isEn ? 'Completed' : 'লেসন সম্পন্ন'}</p>
          </div>

          <div className="bg-[#FFF8FB] p-3 rounded-2xl border border-[#FFDCE9] text-center">
            <span className="text-xl font-bold text-emerald-600">{user.questionsSolved}</span>
            <p className="text-[11px] text-gray-500 mt-0.5">{isEn ? 'MCQs Solved' : 'MCQ সমাধান'}</p>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-3">
        <h3 className="font-bold text-base text-[#20202A] flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{isEn ? 'Badges & Achievements' : 'অর্জিত ব্যাজ ও সম্মাননা (Badges)'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b, idx) => (
            <div key={idx} className="p-3 bg-gradient-to-br from-[#FFF8FB] to-white rounded-2xl border border-[#FFDCE9] text-center">
              <span className="text-2xl block mb-1">{b.icon}</span>
              <h4 className="text-xs font-bold text-[#20202A]">{b.name}</h4>
              <span className="text-[10px] text-gray-400 mt-0.5 block">{b.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FFDCE9] shadow-xs space-y-5">
        <h3 className="font-bold text-base text-[#20202A] flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#EC3B87]" />
          <span>{isEn ? 'Application Settings & Preferences' : 'অ্যাপ সেটিংস ও ব্যক্তিগতকরণ'}</span>
        </h3>

        <div className="space-y-4 divide-y divide-gray-100 text-xs sm:text-sm">
          
          {/* Language Selection */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#EC3B87]" />
              <div>
                <p className="font-semibold text-[#20202A]">{isEn ? 'App Language / ভাষা' : 'অ্যাপের ভাষা (Language)'}</p>
                <p className="text-[11px] text-gray-500">{isEn ? 'Switch between Bengali and English' : 'বাংলা ও ইংরেজির মধ্যে পরিবর্তন করুন'}</p>
              </div>
            </div>
            <div className="flex bg-[#FFF8FB] p-1 rounded-xl border border-[#FFDCE9]">
              <button
                onClick={() => onSetLanguage('bn')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'bn' ? 'bg-[#EC3B87] text-white shadow-xs' : 'text-gray-600 hover:text-[#EC3B87]'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => onSetLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'en' ? 'bg-[#EC3B87] text-white shadow-xs' : 'text-gray-600 hover:text-[#EC3B87]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-semibold text-[#20202A]">{isEn ? 'Daily Study Reminders' : 'প্রতিদিনের পড়াশোনার রিমাইন্ডার'}</p>
                <p className="text-[11px] text-gray-500">{isEn ? 'Notifications for weak topic revisions' : 'দুর্বল টপিক রিভিশন ও দৈনিক কুইজের নোটিফিকেশন'}</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notificationsEnabled ? 'bg-[#EC3B87]' : 'bg-gray-300'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}></span>
            </button>
          </div>

          {/* Daily Study Target */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-semibold text-[#20202A]">{isEn ? 'Daily Study Target' : 'দৈনিক পড়াশোনার লক্ষ্য'}</p>
              <p className="text-[11px] text-gray-500">{isEn ? 'Target study duration per day' : 'প্রতিদিন কত মিনিট অধ্যয়ন করতে চান'}</p>
            </div>
            <select
              value={dailyTargetMin}
              onChange={(e) => setDailyTargetMin(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs font-semibold focus:ring-1 focus:ring-[#EC3B87]"
            >
              <option value={60}>{isEn ? '60 mins (1 hour)' : '৬০ মিনিট (১ ঘণ্টা)'}</option>
              <option value={120}>{isEn ? '120 mins (2 hours)' : '১২০ মিনিট (২ ঘণ্টা)'}</option>
              <option value={180}>{isEn ? '180 mins (3 hours)' : '১৮০ মিনিট (৩ ঘণ্টা)'}</option>
              <option value={240}>{isEn ? '240 mins (4 hours)' : '২৪০ মিনিট (৪ ঘণ্টা)'}</option>
            </select>
          </div>

          {/* Target Exam */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-semibold text-[#20202A]">{isEn ? 'Target BCS Exam' : 'টার্গেট বিসিএস পরীক্ষা'}</p>
              <p className="text-[11px] text-gray-500">{isEn ? 'Tailors mock tests and study materials' : 'আপনার লক্ষ্য অনুযায়ী প্রশ্ন ও স্টাডি প্ল্যান সাজানো হবে'}</p>
            </div>
            <select
              value={user.targetBcs}
              onChange={(e) => onUpdateUser({ targetBcs: e.target.value })}
              className="px-3 py-1.5 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs font-semibold focus:ring-1 focus:ring-[#EC3B87]"
            >
              <option value="৪৭তম বিসিএস (প্রশাসন ক্যাডার)">{isEn ? '47th BCS (Administration)' : '৪৭তম বিসিএস (প্রশাসন)'}</option>
              <option value="৪৭তম বিসিএস (পুলিশ ক্যাডার)">{isEn ? '47th BCS (Police)' : '৪৭তম বিসিএস (পুলিশ)'}</option>
              <option value="৪৭তম বিসিএস (পররাষ্ট্র ক্যাডার)">{isEn ? '47th BCS (Foreign Affairs)' : '৪৭তম বিসিএস (পররাষ্ট্র)'}</option>
              <option value="৪৮তম বিসিএস সাধারণ">{isEn ? '48th BCS General' : '৪৮তম বিসিএস সাধারণ'}</option>
            </select>
          </div>

        </div>

        {/* Save feedback */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
          >
            {savedSuccess ? (isEn ? '✓ Settings Saved!' : '✓ সফলভাবে সংরক্ষিত!') : (isEn ? 'Save Settings' : 'সেটিংস সংরক্ষণ করুন')}
          </button>

          {/* Admin panel link */}
          <button
            onClick={onNavigateToAdmin}
            className="text-xs text-gray-500 hover:text-[#EC3B87] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" /> {isEn ? 'Admin & RAG Sources' : 'অ্যাডমিন ও RAG সোর্স'}
          </button>
        </div>
      </div>

    </div>
  );
};
