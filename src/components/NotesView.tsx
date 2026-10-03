import React, { useState } from 'react';
import { FileEdit, Plus, Search, Trash2, Pin, Tag, BookMarked, Check, X, Sparkles } from 'lucide-react';
import { Note } from '../types';

interface NotesViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  onDeleteNote: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  onTogglePin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('সব');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New note form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('গণিত');
  const [newTags, setNewTags] = useState('');

  const subjects = ['সব', 'গণিত', 'বাংলাদেশ বিষয়াবলি', 'English', 'বাংলা', 'সাধারণ বিজ্ঞান', 'ICT'];

  const filteredNotes = notes.filter(n => {
    if (selectedSubject !== 'সব' && n.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddNote({
      title: newTitle.trim(),
      content: newContent.trim(),
      subject: newSubject,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      isPinned: false,
    });

    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">ব্যক্তিগত নোটস ও বুকমার্ক</h2>
          <p className="text-xs text-gray-500 mt-0.5">গুরুত্বপূর্ণ সূত্র, নিয়মাবলি ও রিভিশন পয়েন্ট সংরক্ষণ করুন</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-xs shadow-md shadow-[#EC3B87]/20 hover:opacity-95 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন নোট লিখুন</span>
        </button>
      </div>

      {/* Search & Subject Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নোট খুঁজুন..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#FFDCE9] text-xs text-[#20202A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#EC3B87]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === sub
                  ? 'bg-[#EC3B87] text-white'
                  : 'bg-white border border-[#FFDCE9] text-gray-600 hover:bg-[#FFF0F6]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`bg-white rounded-3xl p-5 border shadow-xs flex flex-col justify-between transition-all ${
              note.isPinned ? 'border-[#EC3B87] shadow-pink-100' : 'border-[#FFDCE9]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[10px] font-bold bg-[#FFF0F6] text-[#EC3B87] px-2 py-0.5 rounded-full">
                  {note.subject}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onTogglePin(note.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      note.isPinned ? 'text-[#EC3B87]' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={note.isPinned ? 'আনপিন করুন' : 'পিন করুন'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.isPinned ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-sm text-[#20202A] mt-2.5 mb-1.5 leading-snug">
                {note.title}
              </h3>
              <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed line-clamp-6">
                {note.content}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-1 flex-wrap">
                {note.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <span>{note.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#FFDCE9] space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#20202A]">নতুন নোট তৈরি করুন</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">নোটের শিরোনাম</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: শতকরা শর্টকাট সূত্র..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs focus:ring-1 focus:ring-[#EC3B87]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">বিষয়</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs focus:ring-1 focus:ring-[#EC3B87]"
                >
                  <option value="গণিত">গণিত</option>
                  <option value="বাংলাদেশ বিষয়াবলি">বাংলাদেশ বিষয়াবলি</option>
                  <option value="English">English</option>
                  <option value="বাংলা">বাংলা</option>
                  <option value="সাধারণ বিজ্ঞান">সাধারণ বিজ্ঞান</option>
                  <option value="ICT">ICT</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">বিস্তারিত নোট</label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="আপনার নোট ও গুরুত্বপূর্ণ তথ্য লিখুন..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs focus:ring-1 focus:ring-[#EC3B87]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="যেমন: সূত্র, ট্রিকস, রিভিশন"
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs focus:ring-1 focus:ring-[#EC3B87]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white text-xs font-bold shadow-md shadow-[#EC3B87]/20"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
