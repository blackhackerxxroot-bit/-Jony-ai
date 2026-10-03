import React, { useState } from 'react';
import { 
  Bot, 
  BookOpen, 
  Library, 
  CheckSquare, 
  Timer, 
  BarChart3, 
  Newspaper, 
  FileEdit, 
  User,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { SystemId, Language } from '../types';

interface FloatingSystemRailProps {
  activeSystem: SystemId;
  onSelectSystem: (system: SystemId) => void;
  onOpenAITutor: () => void;
  weakTopicsCount?: number;
  language?: Language;
}

export const FloatingSystemRail: React.FC<FloatingSystemRailProps> = ({
  activeSystem,
  onSelectSystem,
  onOpenAITutor,
  weakTopicsCount = 3,
  language = 'bn',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isEn = language === 'en';

  const systemButtons = [
    {
      id: 'ai-tutor',
      label: 'AI Tutor',
      banglaLabel: isEn ? 'AI Tutor' : 'এআই টিউটর',
      icon: Bot,
      color: '#EC3B87',
      isAiTutor: true,
      badge: isEn ? 'Online' : 'অনলাইন',
    },
    {
      id: 'study',
      label: 'Study',
      banglaLabel: isEn ? 'Study' : 'স্টাডি',
      icon: BookOpen,
      color: '#FF72A9',
    },
    {
      id: 'library',
      label: 'Library / PDF',
      banglaLabel: isEn ? 'Library / PDF' : 'লাইব্রেরি / PDF',
      icon: Library,
      color: '#9333EA',
      badge: 'PDF',
    },
    {
      id: 'practice',
      label: 'Practice MCQ',
      banglaLabel: isEn ? 'Practice MCQ' : 'প্র্যাকটিস MCQ',
      icon: CheckSquare,
      color: '#F43F5E',
      badgeCount: weakTopicsCount,
    },
    {
      id: 'mock-test',
      label: 'Mock Test',
      banglaLabel: isEn ? 'Mock Test' : 'মক টেস্ট',
      icon: Timer,
      color: '#D97706',
    },
    {
      id: 'progress',
      label: 'Progress',
      banglaLabel: isEn ? 'Progress' : 'প্রগ্রেস',
      icon: BarChart3,
      color: '#059669',
    },
    {
      id: 'current-affairs',
      label: 'Current Affairs',
      banglaLabel: isEn ? 'Current Affairs' : 'সাম্প্রতিক',
      icon: Newspaper,
      color: '#2563EB',
    },
    {
      id: 'notes',
      label: 'Notes',
      banglaLabel: isEn ? 'Notes' : 'নোটস',
      icon: FileEdit,
      color: '#7C3AED',
    },
    {
      id: 'profile',
      label: 'Profile',
      banglaLabel: isEn ? 'Profile' : 'প্রোফাইল',
      icon: User,
      color: '#4B5563',
    },
  ];

  const handleButtonClick = (item: typeof systemButtons[0]) => {
    if (item.isAiTutor) {
      onOpenAITutor();
    } else {
      onSelectSystem(item.id as SystemId);
    }
  };

  return (
    <div
      className={`fixed right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-40 flex items-center transition-transform duration-200 ${
        isCollapsed ? 'translate-x-[calc(100%-14px)]' : 'translate-x-0'
      }`}
    >
      {/* Toggle collapse mini pull-tab */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-4 h-12 bg-white/90 backdrop-blur-md border-y border-l border-[#FFDCE9] rounded-l-lg shadow-md flex items-center justify-center text-[#EC3B87] hover:bg-[#FFF0F6] -mr-px focus:outline-hidden cursor-pointer"
        title={isCollapsed ? (isEn ? 'Expand menu' : 'মেনু প্রসারিত করুন') : (isEn ? 'Collapse menu' : 'মেনু সংকুচিত করুন')}
      >
        {isCollapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>

      {/* Connected Vertical Floating Action Toolbar */}
      <nav
        aria-label="Quick System Action Toolbar"
        className="bg-white/95 backdrop-blur-lg border border-[#FFDCE9] shadow-xl shadow-[#EC3B87]/10 rounded-2xl p-1 sm:p-1.5 flex flex-col items-center gap-1 sm:gap-1.5"
      >
        {systemButtons.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAiTutor && activeSystem === item.id;
          const isTutor = item.isAiTutor;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleButtonClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${
                  isTutor
                    ? 'bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white shadow-md shadow-[#EC3B87]/30 ring-2 ring-[#EC3B87]/30 animate-pulse-subtle'
                    : isActive
                    ? 'bg-[#FFF0F6] text-[#EC3B87] ring-2 ring-[#EC3B87] shadow-xs'
                    : 'text-gray-600 hover:text-[#EC3B87] hover:bg-[#FFF8FB]'
                }`}
                aria-label={item.banglaLabel}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isTutor ? 'text-white' : ''}`} />

                {/* AI special sparkle dot */}
                {isTutor && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
                )}

                {/* Badge if any */}
                {item.badgeCount && item.badgeCount > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC3B87] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                    {item.badgeCount}
                  </span>
                )}
              </button>

              {/* Floating Tooltip Label on Hover / Tap */}
              <div
                className={`pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#20202A] text-white text-xs px-2.5 py-1 rounded-lg shadow-lg font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  hoveredItem === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
              >
                {isTutor && <Sparkles className="w-3 h-3 text-[#FF72A9]" />}
                <span>{item.banglaLabel}</span>
                {item.badge && (
                  <span className="bg-[#EC3B87] text-white text-[9px] px-1 py-0.2 rounded font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
