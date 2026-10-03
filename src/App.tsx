import React, { useState } from 'react';
import { 
  initialUserProfile, 
  initialTodayPlan, 
  bcsSubjects, 
  sampleMCQs, 
  sampleLibraryBooks, 
  sampleCurrentAffairs, 
  sampleNotes 
} from './data/bcsData';
import { SystemId, UserProfile, TodayStudyPlanItem, Subject, MCQQuestion, StudyBook, CurrentAffairsItem, Note, Language } from './types';
import { Header } from './components/Header';
import { FloatingSystemRail } from './components/FloatingSystemRail';
import { BottomNav } from './components/BottomNav';
import { SidebarDesktop } from './components/SidebarDesktop';
import { DashboardView } from './components/DashboardView';
import { StudyView } from './components/StudyView';
import { PracticeView } from './components/PracticeView';
import { LibraryView } from './components/LibraryView';
import { MockTestView } from './components/MockTestView';
import { ProgressView } from './components/ProgressView';
import { CurrentAffairsView } from './components/CurrentAffairsView';
import { NotesView } from './components/NotesView';
import { ProfileView } from './components/ProfileView';
import { AdminPanelView } from './components/AdminPanelView';
import { AITutorModal } from './components/AITutorModal';
import { SearchModal } from './components/SearchModal';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';

export default function App() {
  const [activeSystem, setActiveSystem] = useState<SystemId>('home');
  const [language, setLanguage] = useState<Language>('bn');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [todayPlan, setTodayPlan] = useState<TodayStudyPlanItem[]>(initialTodayPlan);
  const [subjects, setSubjects] = useState<Subject[]>(bcsSubjects);
  const [questions, setQuestions] = useState<MCQQuestion[]>(sampleMCQs);
  const [books, setBooks] = useState<StudyBook[]>(sampleLibraryBooks);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffairsItem[]>(sampleCurrentAffairs);
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  
  // Modals & Drawers state
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Context-aware AI Tutor parameters
  const [aiTutorContext, setAiTutorContext] = useState<{
    subject: string;
    topic: string;
    lessonId?: string;
    lessonTitle?: string;
    pageText?: string;
    questionContext?: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    };
  }>({
    subject: 'গণিত',
    topic: 'শতকরা (Percentage)',
    lessonTitle: 'শতকরা - মৌলিক ধারণা ও ট্রিকস',
  });

  // Track weak topics dynamically
  const [weakTopics, setWeakTopics] = useState<
    { subject: string; topic: string; subjectId: string; topicId: string }[]
  >([
    { subject: 'গণিত', topic: 'শতকরা (Percentage)', subjectId: 'math', topicId: 'percentage' },
    { subject: 'English', topic: 'Grammar & Parts of Speech', subjectId: 'english', topicId: 'eng-grammar' },
    { subject: 'সাধারণ বিজ্ঞান', topic: 'পদার্থবিজ্ঞান — আলো ও তাপ', subjectId: 'science', topicId: 'physics' },
  ]);

  // Selected study topic for study view
  const [selectedStudySubjectId, setSelectedStudySubjectId] = useState<string>('math');
  const [selectedStudyTopicId, setSelectedStudyTopicId] = useState<string>('percentage');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'bn' ? 'en' : 'bn';
      showToast(next === 'en' ? 'Switched to English language' : 'বাংলা ভাষায় পরিবর্তিত হয়েছে');
      return next;
    });
  };

  // Toggle study plan item completion
  const handleTogglePlanItem = (id: string) => {
    setTodayPlan(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStatus = !p.completed;
          if (newStatus) {
            showToast(language === 'en' ? `"${p.topic}" marked completed! 🎯` : `"${p.topic}" সম্পন্ন চিহ্নিত করা হয়েছে! 🎯`);
          }
          return { ...p, completed: newStatus };
        }
        return p;
      })
    );
  };

  // Open Lesson directly
  const handleOpenLesson = (subjectId: string, topicId: string) => {
    setSelectedStudySubjectId(subjectId);
    setSelectedStudyTopicId(topicId);
    setActiveSystem('study');
    const targetSub = subjects.find(s => s.id === subjectId);
    const targetTopic = targetSub?.topics.find(t => t.id === topicId);
    setAiTutorContext({
      subject: targetSub?.name || 'গণিত',
      topic: targetTopic?.name || 'শতকরা (Percentage)',
      lessonTitle: `${targetTopic?.name || ''} পাঠ`,
    });
  };

  // Open AI Tutor with topic
  const handleOpenAITutorWithTopic = (subject: string, topic: string, lessonTitle?: string) => {
    setAiTutorContext({
      subject,
      topic,
      lessonTitle: lessonTitle || `${topic} বিশদ পাঠ`,
    });
    setAiTutorOpen(true);
  };

  // Open AI Tutor with Question mistake
  const handleOpenAITutorWithQuestion = (q: MCQQuestion, userAnsIndex: number) => {
    setAiTutorContext({
      subject: q.subjectName,
      topic: q.topicName,
      questionContext: {
        question: q.question,
        userAnswer: q.options[userAnsIndex] || 'উত্তর অপ্রদত্ত',
        correctAnswer: q.options[q.correctIndex],
        explanation: q.explanation,
      },
    });
    setAiTutorOpen(true);
  };

  // Open AI Tutor from PDF page
  const handleOpenAITutorFromPdf = (pageText: string, bookTitle: string, subject: string) => {
    setAiTutorContext({
      subject,
      topic: bookTitle,
      pageText,
      lessonTitle: `বই: ${bookTitle}`,
    });
    setAiTutorOpen(true);
  };

  // Track Mistake & mark weak topic
  const handleTrackMistake = (topicName: string) => {
    if (!weakTopics.some(w => w.topic.includes(topicName) || topicName.includes(w.topic))) {
      const newWeak = {
        subject: 'সাধারণ বিসিএস',
        topic: topicName,
        subjectId: 'math',
        topicId: 'percentage',
      };
      setWeakTopics(prev => [newWeak, ...prev]);
      showToast(language === 'en' ? `Added "${topicName}" to your weak topics list.` : `সিস্টেম "${topicName}" টপিকটিকে আপনার দুর্বল তালিকায় যুক্ত করেছে।`);
    }
  };

  // Add Question in Admin
  const handleAddQuestion = (newQ: MCQQuestion) => {
    setQuestions(prev => [newQ, ...prev]);
    showToast(language === 'en' ? 'New question added successfully!' : 'নতুন প্রশ্ন সিস্টেমে সফলভাবে যোগ করা হয়েছে!');
  };

  // Notes operations
  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'updatedAt'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: 'note-' + Date.now(),
      updatedAt: language === 'en' ? 'Just now' : 'এখন মাত্র',
    };
    setNotes(prev => [newNote, ...prev]);
    showToast(language === 'en' ? 'Note saved successfully!' : 'ব্যক্তিগত নোট সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast(language === 'en' ? 'Note deleted.' : 'নোটটি মুছে ফেলা হয়েছে।');
  };

  const handleTogglePin = (id: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8FB] text-[#20202A] flex flex-col selection:bg-[#EC3B87]/20 selection:text-[#EC3B87]">
      
      {/* 1. Header Bar */}
      <Header
        user={user}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenProfile={() => setActiveSystem('profile')}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* 2. Desktop Left Sidebar */}
        <SidebarDesktop
          activeSystem={activeSystem}
          onSelectSystem={(sys) => {
            setActiveSystem(sys);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAITutor={() => setAiTutorOpen(true)}
          user={user}
          language={language}
        />

        {/* 3. Main Dynamic Content Area (Center) */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 min-w-0 pr-12 sm:pr-16 lg:pr-20">
          
          {activeSystem === 'home' && (
            <DashboardView
              user={user}
              language={language}
              todayPlan={todayPlan}
              onTogglePlanItem={handleTogglePlanItem}
              subjects={subjects}
              onNavigate={(sys) => {
                setActiveSystem(sys);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLesson={handleOpenLesson}
              onOpenAITutorWithTopic={handleOpenAITutorWithTopic}
              weakTopics={weakTopics}
            />
          )}

          {activeSystem === 'study' && (
            <StudyView
              subjects={subjects}
              initialSubjectId={selectedStudySubjectId}
              initialTopicId={selectedStudyTopicId}
              onOpenAITutorWithContext={handleOpenAITutorWithTopic}
              onNavigateToPracticeTopic={(_tId, tName) => {
                setActiveSystem('practice');
                showToast(`"${tName}" এর প্র্যাকটিসে প্রবেশ করা হয়েছে`);
              }}
            />
          )}

          {activeSystem === 'library' && (
            <LibraryView
              books={books}
              onAskAIWithPageContext={handleOpenAITutorFromPdf}
            />
          )}

          {activeSystem === 'practice' && (
            <PracticeView
              questions={questions}
              onOpenAITutorWithQuestion={handleOpenAITutorWithQuestion}
              onOpenLesson={handleOpenLesson}
              onTrackMistake={handleTrackMistake}
            />
          )}

          {activeSystem === 'mock-test' && (
            <MockTestView
              questions={questions}
              onNavigateToPlan={() => setActiveSystem('home')}
              onOpenLesson={handleOpenLesson}
              onOpenAITutorWithWeakTopics={(rec) => {
                setAiTutorContext({
                  subject: 'মক টেস্ট ফলাফল',
                  topic: 'দুর্বল টপিক রিভিশন',
                  lessonTitle: rec,
                });
                setAiTutorOpen(true);
              }}
            />
          )}

          {activeSystem === 'progress' && (
            <ProgressView
              user={user}
              subjects={subjects}
              onOpenLesson={handleOpenLesson}
            />
          )}

          {activeSystem === 'current-affairs' && (
            <CurrentAffairsView
              items={currentAffairs}
              onOpenAITutorWithTopic={handleOpenAITutorWithTopic}
            />
          )}

          {activeSystem === 'notes' && (
            <NotesView
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onTogglePin={handleTogglePin}
            />
          )}

          {activeSystem === 'profile' && (
            <ProfileView
              user={user}
              language={language}
              onSetLanguage={setLanguage}
              onUpdateUser={(updated) => {
                setUser(prev => ({ ...prev, ...updated }));
                showToast(language === 'en' ? 'Profile updated successfully!' : 'প্রোফাইল আপডেট হয়েছে!');
              }}
              onNavigateToAdmin={() => setActiveSystem('admin')}
            />
          )}

          {activeSystem === 'admin' && (
            <AdminPanelView
              subjects={subjects}
              books={books}
              onAddQuestion={handleAddQuestion}
            />
          )}

        </main>

        {/* 4. Signature Floating Right-Side Vertical Action Toolbar (Prompt Section 3) */}
        <FloatingSystemRail
          activeSystem={activeSystem}
          onSelectSystem={(sys) => {
            setActiveSystem(sys);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAITutor={() => setAiTutorOpen(true)}
          weakTopicsCount={weakTopics.length}
          language={language}
        />

      </div>

      {/* 5. Mobile Bottom Navigation Bar (Prompt Section 2) */}
      <BottomNav
        activeSystem={activeSystem}
        onSelectSystem={(sys) => {
          setActiveSystem(sys);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
      />

      {/* 6. Context-Aware AI Tutor Modal (Prompt Section 4 & 5) */}
      <AITutorModal
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        currentContext={aiTutorContext}
        onMarkTopicWeak={handleTrackMistake}
        onNavigateToPractice={() => {
          setAiTutorOpen(false);
          setActiveSystem('practice');
        }}
        language={language}
      />

      {/* 7. Quick Search Modal (⌘K or Click) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        subjects={subjects}
        books={books}
        questions={questions}
        onSelectTopic={handleOpenLesson}
        onSelectBook={() => {
          setActiveSystem('library');
        }}
        onOpenPractice={() => {
          setActiveSystem('practice');
        }}
      />

      {/* 8. Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSystem={activeSystem}
        onSelectSystem={(sys) => {
          setActiveSystem(sys);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAITutor={() => setAiTutorOpen(true)}
        user={user}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#20202A] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-[#FFDCE9]/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#EC3B87] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
