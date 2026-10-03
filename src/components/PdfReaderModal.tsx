import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Search, 
  Bookmark, 
  FileText, 
  Bot, 
  X, 
  Highlighter, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { StudyBook } from '../types';

interface PdfReaderModalProps {
  book: StudyBook | null;
  isOpen: boolean;
  onClose: () => void;
  onAskAIAboutPage: (pageText: string, bookTitle: string, subject: string) => void;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({
  book,
  isOpen,
  onClose,
  onAskAIAboutPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHighlighterActive, setIsHighlighterActive] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  if (!isOpen || !book) return null;

  const totalPages = book.samplePages.length || 3;
  const currentPageData = book.samplePages.find(p => p.pageNumber === currentPage) || book.samplePages[0];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(zoomLevel + 15);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 70) setZoomLevel(zoomLevel - 15);
  };

  const handleAskAI = () => {
    const textContext = selectedHighlight || currentPageData?.content || '';
    onAskAIAboutPage(textContext, book.title, book.subject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#2A2B36] text-white w-full max-w-4xl h-[92vh] sm:h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
        
        {/* PDF Reader Top Toolbar */}
        <div className="px-4 py-3 bg-[#1F202B] border-b border-gray-750 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              title="বন্ধ করুন"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="overflow-hidden">
              <h3 className="font-bold text-xs sm:text-sm text-white truncate">{book.title}</h3>
              <p className="text-[10px] text-gray-400 truncate">{book.author} • {book.edition}</p>
            </div>
          </div>

          {/* Quick Toolbar Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-xl transition-colors ${
                showSearch ? 'bg-[#EC3B87] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title="ডকুমেন্টে খুঁজুন"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl transition-colors ${
                isBookmarked ? 'bg-amber-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title="বুকমার্ক"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Highlighter */}
            <button
              onClick={() => setIsHighlighterActive(!isHighlighterActive)}
              className={`p-2 rounded-xl transition-colors ${
                isHighlighterActive ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              title="টেক্সট হাইলাইটার"
            >
              <Highlighter className="w-4 h-4" />
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-gray-800 rounded-xl px-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-gray-400 hover:text-white"
                title="জুম আউট"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] px-1 text-gray-300 font-mono">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-gray-400 hover:text-white"
                title="জুম ইন"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Input Bar if expanded */}
        {showSearch && (
          <div className="bg-[#242533] px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="এই পৃষ্ঠার মধ্যে শব্দ খুঁজুন..."
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-hidden flex-1"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 text-xs">
                ক্লিয়ার
              </button>
            )}
          </div>
        )}

        {/* PDF Sheet Canvas / Document View */}
        <div className="flex-1 bg-[#1A1B24] p-3 sm:p-6 overflow-y-auto flex justify-center">
          <div
            className="bg-white text-[#20202A] w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-10 transition-transform origin-top min-h-[500px] flex flex-col justify-between"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <div>
              {/* Header inside simulated page */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-xs text-gray-400">
                <span>{book.title}</span>
                <span>অধ্যায় ১ • পৃষ্ঠা {currentPage}</span>
              </div>

              {/* Page Title */}
              <h2 className="text-lg sm:text-xl font-bold text-[#EC3B87] mt-4 mb-3">
                {currentPageData?.title || 'অধ্যায় ও অনুশীলন'}
              </h2>

              {/* Page Body Text with highlight simulation */}
              <div
                className={`text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap ${
                  isHighlighterActive ? 'cursor-text selection:bg-yellow-200 selection:text-black' : ''
                }`}
                onMouseUp={() => {
                  const sel = window.getSelection()?.toString();
                  if (sel && sel.trim().length > 0) {
                    setSelectedHighlight(sel.trim());
                  }
                }}
              >
                {currentPageData?.content}
              </div>

              {selectedHighlight && (
                <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-900 flex items-center justify-between">
                  <span className="truncate max-w-[200px] sm:max-w-xs">
                    হাইলাইট: "{selectedHighlight}"
                  </span>
                  <button
                    onClick={handleAskAI}
                    className="text-[#EC3B87] font-bold underline flex items-center gap-1 shrink-0"
                  >
                    <Bot className="w-3.5 h-3.5" /> এআইকে জিজ্ঞেস করুন
                  </button>
                </div>
              )}
            </div>

            {/* Simulated Page Footer */}
            <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
              <span>BCS প্রস্তুতি অনুমোদিত ডিজিটাল পাঠাগার</span>
              <span>পৃষ্ঠা {currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Reader Bottom Navigation Bar */}
        <div className="px-4 py-3 bg-[#1F202B] border-t border-gray-750 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          {/* Page Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all flex items-center gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্ববর্তী পৃষ্ঠা</span>
            </button>

            <span className="text-xs text-gray-300 font-mono px-2">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30 transition-all flex items-center gap-1 text-xs"
            >
              <span>পরবর্তী পৃষ্ঠা</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* "Ask AI about this page" Button (Important Feature) */}
          <button
            onClick={handleAskAI}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs shadow-md shadow-[#EC3B87]/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI about this page (এই পৃষ্ঠা সম্পর্কে প্রশ্ন করুন)</span>
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </button>

        </div>

      </div>
    </div>
  );
};
