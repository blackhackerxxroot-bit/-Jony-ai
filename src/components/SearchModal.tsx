import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Library, CheckSquare, Sparkles, ChevronRight } from 'lucide-react';
import { Subject, StudyBook, MCQQuestion, SystemId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  books: StudyBook[];
  questions: MCQQuestion[];
  onSelectTopic: (subjectId: string, topicId: string) => void;
  onSelectBook: (book: StudyBook) => void;
  onOpenPractice: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  subjects,
  books,
  questions,
  onSelectTopic,
  onSelectBook,
  onOpenPractice,
}) => {
  const [query, setQuery] = useState('');

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle if already handled
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matching topics
  const matchingTopics: { subjectName: string; subjectId: string; topicName: string; topicId: string }[] = [];
  subjects.forEach(sub => {
    sub.topics.forEach(t => {
      if (!q || t.name.toLowerCase().includes(q) || t.englishName.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q)) {
        matchingTopics.push({
          subjectName: sub.name,
          subjectId: sub.id,
          topicName: t.name,
          topicId: t.id,
        });
      }
    });
  });

  // Search matching books
  const matchingBooks = books.filter(b => !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.subject.toLowerCase().includes(q));

  // Search matching questions
  const matchingQuestions = questions.filter(quest => !q || quest.question.toLowerCase().includes(q) || quest.topicName.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#FFDCE9] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#FFDCE9] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#EC3B87] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বিষয়, টপিক (যেমন: শতকরা), বই বা প্রশ্ন খুঁজুন..."
            className="flex-1 text-sm text-[#20202A] placeholder-gray-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          
          {/* Quick Topics */}
          {matchingTopics.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                সিলেবাস অধ্যায়সমূহ ({matchingTopics.length})
              </span>
              <div className="space-y-1">
                {matchingTopics.slice(0, 5).map((mt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectTopic(mt.subjectId, mt.topicId);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-[#FFF0F6] text-left flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#EC3B87] flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#20202A] group-hover:text-[#EC3B87]">{mt.topicName}</h4>
                        <span className="text-[10px] text-gray-500">{mt.subjectName}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#EC3B87]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Books */}
          {matchingBooks.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                লাইব্রেরি বই ({matchingBooks.length})
              </span>
              <div className="space-y-1">
                {matchingBooks.slice(0, 3).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      onSelectBook(b);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-[#FFF0F6] text-left flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Library className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#20202A] group-hover:text-[#EC3B87]">{b.title}</h4>
                        <span className="text-[10px] text-gray-500">{b.author} • {b.subject}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      PDF
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Practice Questions */}
          {matchingQuestions.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
                MCQ প্রশ্নব্যাংক ({matchingQuestions.length})
              </span>
              <div className="space-y-1">
                {matchingQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      onOpenPractice();
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-2xl hover:bg-[#FFF0F6] text-left flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckSquare className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#20202A] group-hover:text-[#EC3B87] line-clamp-1">{q.question}</h4>
                        <span className="text-[10px] text-gray-500">{q.topicName}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">অনুশীলন</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchingTopics.length === 0 && matchingBooks.length === 0 && matchingQuestions.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              <p>"{query}" সম্পর্কিত কিছু পাওয়া যায়নি।</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
          <span>Esc চেপে বন্ধ করুন</span>
          <span>BCS প্রস্তুতি স্মার্ট সার্চ ইঞ্জিন</span>
        </div>

      </div>
    </div>
  );
};
