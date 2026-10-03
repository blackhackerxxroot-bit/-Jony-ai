import React, { useState } from 'react';
import { Menu, Search, Bell, Sparkles, X, CheckCircle2, AlertTriangle, BookMarked, Globe } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { getTranslation } from '../utils/i18n';

interface HeaderProps {
  user: UserProfile;
  language: Language;
  onToggleLanguage: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  language,
  onToggleLanguage,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenProfile,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const t = getTranslation(language);

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: language === 'en' ? 'Math Practice Reminder' : 'গণিত প্র্যাকটিস রিমাইন্ডার',
      desc: language === 'en' ? '10 new questions added for your weak topic "Percentage".' : 'আপনার দুর্বল টপিক "শতকরা (Percentage)" এর ১০টি নতুন প্রশ্ন যুক্ত হয়েছে।',
      time: language === 'en' ? '10m ago' : '১০ মিনিট আগে',
      unread: true,
      type: 'practice',
    },
    {
      id: 'n2',
      title: language === 'en' ? 'Daily Study Streak!' : 'ডেইলি স্টাডি স্ট্রাইক!',
      desc: language === 'en' ? 'Congrats Tumpamoni! 12 consecutive days study streak completed. 🔥' : 'অভিনন্দন টুম্পামনি! আপনি টানা ১২ দিন পড়াশোনা সম্পন্ন করেছেন। 🔥',
      time: language === 'en' ? '2h ago' : '২ ঘন্টা আগে',
      unread: true,
      type: 'streak',
    },
    {
      id: 'n3',
      title: language === 'en' ? 'Current Affairs Update' : 'সাম্প্রতিক তথ্য আপডেট',
      desc: language === 'en' ? 'New monthly capsule for BCS preliminary is published.' : 'নতুন কারেন্ট অ্যাফেয়ার্স ক্যাপসুল প্রকাশিত হয়েছে।',
      time: language === 'en' ? 'Yesterday' : 'গতকাল',
      unread: false,
      type: 'news',
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#FFDCE9] shadow-xs px-3 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-[#20202A] hover:bg-[#FFF0F6] active:bg-[#FFE3EE] transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-[#20202A]" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] flex items-center justify-center text-white shadow-md shadow-[#EC3B87]/25">
              <span className="font-bold text-lg tracking-tight font-serif">বি</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#20202A]">{t.appName}</span>
                <span className="bg-[#EC3B87]/10 text-[#EC3B87] text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              </div>
              <p className="text-[10px] text-gray-500 hidden sm:block">{t.tagline}</p>
            </div>
          </div>
        </div>

        {/* Right: Language switch, Search, Notifications, Profile avatar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Language Switch Button (বাং / EN) */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#FFF8FB] hover:bg-[#FFF0F6] border border-[#FFDCE9] text-[#EC3B87] text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            <Globe className="w-3.5 h-3.5 text-[#EC3B87]" />
            <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#FFF8FB] hover:bg-[#FFF0F6] border border-[#FFDCE9] text-gray-600 transition-all text-xs font-medium cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4 text-[#EC3B87]" />
            <span className="hidden sm:inline text-gray-500">{t.searchPlaceholder}</span>
            <span className="hidden sm:inline-block bg-white text-[10px] px-1.5 py-0.5 rounded-md border border-[#FFDCE9] text-gray-400">⌘K</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-gray-700 hover:bg-[#FFF0F6] active:bg-[#FFE3EE] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#EC3B87] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-[#FFDCE9] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#20202A]">
                      {language === 'en' ? 'Notifications' : 'নোটিফিকেশন'}
                    </span>
                    <span className="bg-[#FFF0F6] text-[#EC3B87] text-xs px-2 py-0.5 rounded-full font-semibold">
                      {unreadCount} {language === 'en' ? 'New' : 'নতুন'}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-[#EC3B87] hover:underline font-medium"
                    >
                      {language === 'en' ? 'Mark all as read' : 'সব পঠিত চিহ্নিত করুন'}
                    </button>
                  )}
                </div>

                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl transition-colors ${
                        n.unread ? 'bg-[#FFF8FB]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'practice' && (
                          <div className="w-6 h-6 rounded-lg bg-pink-100 text-[#EC3B87] flex items-center justify-center shrink-0 mt-0.5">
                            <BookMarked className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {n.type === 'streak' && (
                          <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                            🔥
                          </div>
                        )}
                        {n.type === 'news' && (
                          <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <p className="text-xs font-semibold text-[#20202A]">{n.title}</p>
                          <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{n.desc}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar with Streak Flame */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-[#FFF0F6] transition-colors cursor-pointer"
            title="Profile"
          >
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://lh3.googleusercontent.com/ogw/AF2bZyhSiu_SPCzexL9JNOXGtuxIU3WW358wBKIePdBa3hLpthM=s83-c-mo';
                }}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#EC3B87]"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1 rounded-full border border-white shadow-xs">
                {user.streakDays}🔥
              </span>
            </div>
            <span className="hidden md:inline text-xs font-bold text-gray-700">{user.name}</span>
          </button>
        </div>
      </header>
    </>
  );
};
