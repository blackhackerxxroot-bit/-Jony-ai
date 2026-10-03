import React, { useState } from 'react';
import { 
  Library as LibraryIcon, 
  BookOpen, 
  FileText, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  Calculator,
  Languages,
  Landmark,
  Atom,
  Cpu,
  Globe
} from 'lucide-react';
import { StudyBook } from '../types';
import { PdfReaderModal } from './PdfReaderModal';

interface LibraryViewProps {
  books: StudyBook[];
  onAskAIWithPageContext: (pageText: string, bookTitle: string, subject: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  books,
  onAskAIWithPageContext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReadingBook, setActiveReadingBook] = useState<StudyBook | null>(null);

  const categories = [
    'সব',
    'বাংলা',
    'English',
    'গণিত',
    'বাংলাদেশ বিষয়াবলি',
    'আন্তর্জাতিক বিষয়াবলি',
    'ICT',
    'সাধারণ বিজ্ঞান',
    'Current Affairs'
  ];

  const filteredBooks = books.filter(b => {
    if (selectedCategory !== 'সব' && b.subject !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const getSubjectIcon = (sub: string) => {
    switch (sub) {
      case 'গণিত': return Calculator;
      case 'English': return Languages;
      case 'বাংলাদেশ বিষয়াবলি': return Landmark;
      case 'সাধারণ বিজ্ঞান': return Atom;
      case 'ICT': return Cpu;
      case 'আন্তর্জাতিক বিষয়াবলি': return Globe;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header & Search */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">BCS স্টাডি লাইব্রেরি (E-Books & PDFs)</h2>
            <span className="bg-[#FFF0F6] text-[#EC3B87] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> অনুমোদিত উৎস
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            বিসিএস প্রিলিমিনারি সিলেবাস অনুযায়ী সংকলিত প্রামাণ্য ই-বুক ও অধ্যায়ভিত্তিক পাঠ্য
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="বই, লেখক বা বিষয় খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs text-[#20202A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#EC3B87]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-[#FFDCE9] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-xs'
                  : 'bg-[#FFF8FB] text-gray-600 hover:bg-[#FFF0F6] hover:text-[#EC3B87] border border-[#FFDCE9]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBooks.map((book) => {
          const SubIcon = getSubjectIcon(book.subject);

          return (
            <div
              key={book.id}
              className="bg-white rounded-3xl p-4 border border-[#FFDCE9] shadow-xs hover:shadow-md hover:border-[#EC3B87]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Book Cover Banner */}
                <div className={`relative h-40 rounded-2xl bg-gradient-to-tr ${book.coverGradient} p-4 text-white flex flex-col justify-between overflow-hidden shadow-xs`}>
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <FileText className="w-3 h-3" /> PDF
                    </span>
                    <span className="bg-black/20 text-[10px] px-2 py-0.5 rounded-md">
                      {book.totalPages} পৃষ্ঠা
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <SubIcon className="w-10 h-10 mx-auto opacity-80 mb-1" />
                    <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">{book.subject}</span>
                  </div>

                  <div className="text-[10px] text-white/80 truncate">
                    {book.edition}
                  </div>
                </div>

                {/* Book Details */}
                <div className="mt-3.5 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] text-[#EC3B87] font-semibold">
                    <span>{book.badge}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#20202A] line-clamp-2 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">লেখক: {book.author}</p>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>

              {/* Read Action Button */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  অনুমোদিত ম্যাটেরিয়াল
                </span>
                <button
                  onClick={() => setActiveReadingBook(book)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs shadow-xs hover:opacity-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Copyright Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs text-gray-600 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#EC3B87] shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-[#20202A]">কপিরাইট ও অনুমোদনের অঙ্গীকার:</strong> এই লাইব্রেরির সকল উপাদান অনুমোদিত পাঠ্যসার, বিসিএস সিলেবাসের উন্মুক্ত তথ্য ও শিক্ষকদের প্রস্তুতকৃত নোটস ভিত্তিক। কোনো কপিরাইটযুক্ত বই অনুমতি ছাড়া ব্যবহার করা হয় না।
        </p>
      </div>

      {/* Interactive PDF Reader Modal */}
      <PdfReaderModal
        book={activeReadingBook}
        isOpen={!!activeReadingBook}
        onClose={() => setActiveReadingBook(null)}
        onAskAIAboutPage={(text, title, sub) => {
          setActiveReadingBook(null);
          onAskAIWithPageContext(text, title, sub);
        }}
      />

    </div>
  );
};
