import React from 'react';
import { Home, BookOpen, Library, CheckSquare, User } from 'lucide-react';
import { SystemId, Language } from '../types';

interface BottomNavProps {
  activeSystem: SystemId;
  onSelectSystem: (system: SystemId) => void;
  language?: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSystem,
  onSelectSystem,
  language = 'bn',
}) => {
  const isEn = language === 'en';

  const navItems = [
    { id: 'home', label: isEn ? 'Home' : 'হোম', icon: Home },
    { id: 'study', label: isEn ? 'Study' : 'স্টাডি', icon: BookOpen },
    { id: 'library', label: isEn ? 'Library' : 'লাইব্রেরি', icon: Library },
    { id: 'practice', label: isEn ? 'Practice' : 'প্র্যাকটিস', icon: CheckSquare },
    { id: 'profile', label: isEn ? 'Profile' : 'প্রোফাইল', icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#FFDCE9] px-2 py-1.5 shadow-lg flex items-center justify-around"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSystem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectSystem(item.id as SystemId)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 cursor-pointer ${
              isActive
                ? 'text-[#EC3B87] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                isActive ? 'bg-[#FFF0F6] scale-110' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] mt-0.5 leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
