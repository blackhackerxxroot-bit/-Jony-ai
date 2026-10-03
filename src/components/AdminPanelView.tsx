import React, { useState } from 'react';
import { 
  Shield, 
  Database, 
  FileText, 
  Layers, 
  Plus, 
  CheckCircle2, 
  Cpu, 
  Upload, 
  Server, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  Users,
  BarChart,
  RefreshCw
} from 'lucide-react';
import { Subject, MCQQuestion, StudyBook } from '../types';

interface AdminPanelViewProps {
  subjects: Subject[];
  books: StudyBook[];
  onAddQuestion: (q: MCQQuestion) => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  subjects,
  books,
  onAddQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'rag' | 'mcq' | 'pdf' | 'analytics'>('rag');
  const [isSyncingEmbeddings, setIsSyncingEmbeddings] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // New MCQ state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('গণিত');
  const [newTopicName, setNewTopicName] = useState('শতকরা (Percentage)');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOptIndex, setCorrectOptIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [mcqSaved, setMcqSaved] = useState(false);

  const ragSources = [
    { name: 'বিসিএস প্রিলিমিনারি অফিসিয়াল সিলেবাস ২০২৪', type: 'Official Syllabus', chunks: 142, status: 'Indexed' },
    { name: 'ড. মাহফুজুর রহমান: গণিত শর্টকাট টেকনিক ও বেসিক', type: 'Authorized Book', chunks: 320, status: 'Indexed' },
    { name: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান (মূল পাঠ)', type: 'Official Legal', chunks: 215, status: 'Indexed' },
    { name: 'বিসিএস ৩৫তম থেকে ৪৬তম প্রশ্নব্যাংক ও প্রামাণ্য ব্যাখ্যা', type: 'Question Bank', chunks: 1200, status: 'Indexed' },
    { name: 'চলতি অর্থবছর বাজেট ও অর্থনৈতিক সমীক্ষা ২০২৪', type: 'Current Affairs', chunks: 98, status: 'Indexed' },
  ];

  const handleSimulateEmbeddingSync = () => {
    setIsSyncingEmbeddings(true);
    setTimeout(() => {
      setIsSyncingEmbeddings(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  const handleSaveMCQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText || !optionA || !optionB || !optionC || !optionD) return;

    const newMCQ: MCQQuestion = {
      id: 'mcq-custom-' + Date.now(),
      subjectId: 'math',
      subjectName: newSubjectName,
      topicId: 'percentage',
      topicName: newTopicName,
      question: newQuestionText,
      options: [optionA, optionB, optionC, optionD],
      correctIndex: correctOptIndex,
      explanation: explanation || 'সঠিক উত্তর যাচাইকৃত।',
      difficulty: 'medium',
      bcsExamTag: 'অ্যাডমিন সংযোজন',
    };

    onAddQuestion(newMCQ);
    setMcqSaved(true);
    setNewQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setExplanation('');
    setTimeout(() => setMcqSaved(false), 2500);
  };

  return (
    <div className="space-y-5 pb-20">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#20202A]">অ্যাডমিন ড্যাশবোর্ড ও এআই আরএজি কনসোল</h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            কনটেন্ট ম্যানেজমেন্ট, অনুমোদিত পিডিএফ লাইব্রেরি এবং RAG ভেক্টর ডেটাবেজ কনফিগারেশন
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#FFF8FB] p-1 rounded-2xl border border-[#FFDCE9] self-start sm:self-auto">
          {[
            { id: 'rag', label: 'AI + RAG আর্কিটেকচার' },
            { id: 'mcq', label: 'MCQ যুক্ত করুন' },
            { id: 'pdf', label: 'অনুমোদিত PDF' },
            { id: 'analytics', label: 'সিস্টেম অ্যানালিটিক্স' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#EC3B87]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. RAG & AI ARCHITECTURE TAB */}
      {activeTab === 'rag' && (
        <div className="space-y-5">
          {/* Architecture Pipeline Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-[#2A2B36] text-white rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] font-bold tracking-widest text-[#FF72A9] uppercase">
              RAG Pipeline Architecture
            </span>
            <h3 className="text-lg font-bold mt-1">প্রামাণ্য বিসিএস জ্ঞান ভাণ্ডার ও রিট্রিভাল পাইপলাইন</h3>
            
            {/* Visual Flow diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <FileText className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                <span className="font-semibold block">Documents</span>
                <span className="text-[10px] text-gray-400">অনুমোদিত বই</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Layers className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <span className="font-semibold block">Text Chunks</span>
                <span className="text-[10px] text-gray-400">টপিক ভাগ</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Cpu className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <span className="font-semibold block">Embeddings</span>
                <span className="text-[10px] text-gray-400">ভেক্টরাইজেশন</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Database className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span className="font-semibold block">Vector DB</span>
                <span className="text-[10px] text-gray-400">ইনডেক্সিং</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                <Server className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                <span className="font-semibold block">Retrieval</span>
                <span className="text-[10px] text-gray-400">প্রাসঙ্গিক তথ্য</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white">
                <Sparkles className="w-5 h-5 mx-auto mb-1" />
                <span className="font-semibold block">AI Tutor</span>
                <span className="text-[10px] text-pink-100">উৎস সহ উত্তর</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/15">
              <span className="text-xs text-gray-300">
                মোট ইনডেক্সকৃত চunks: <strong>১,৯৭৫ টি</strong> • ভেক্টর মাত্রা: <strong>৭৬৮</strong>
              </span>
              <button
                onClick={handleSimulateEmbeddingSync}
                disabled={isSyncingEmbeddings}
                className="px-4 py-2 rounded-xl bg-white text-[#20202A] font-bold text-xs hover:bg-gray-100 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingEmbeddings ? 'animate-spin' : ''}`} />
                <span>{isSyncingEmbeddings ? 'সিঙ্ক হচ্ছে...' : 'ভেক্টর ডেটাবেজ রি-ইনডেক্স করুন'}</span>
              </button>
            </div>
          </div>

          {syncSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              ভেক্টর ডেটাবেজে সকল প্রামাণ্য বই ও নোটের এমবেডিং সফলভাবে আপডেট করা হয়েছে!
            </div>
          )}

          {/* RAG Knowledge Sources Table */}
          <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-[#20202A]">অনুমোদিত জ্ঞান উৎস তালিকা (RAG Knowledge Sources)</h4>
            
            <div className="divide-y divide-gray-100">
              {ragSources.map((source, sIdx) => (
                <div key={sIdx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#20202A]">{source.name}</h5>
                    <span className="text-[11px] text-gray-400">{source.type}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-xl">
                      {source.chunks} Chunks
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {source.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD MCQ TAB */}
      {activeTab === 'mcq' && (
        <div className="bg-white rounded-3xl p-6 border border-[#FFDCE9] shadow-xs max-w-2xl mx-auto space-y-4">
          <h3 className="font-bold text-base text-[#20202A]">নতুন প্র্যাকটিস MCQ যুক্ত করুন</h3>
          
          {mcqSaved && (
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> প্রশ্নটি সফলভাবে সিস্টেমে যুক্ত হয়েছে!
            </div>
          )}

          <form onSubmit={handleSaveMCQ} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">বিষয় (Subject)</label>
                <select
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
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
                <label className="font-bold text-gray-700 block mb-1">টপিক (Topic)</label>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">প্রশ্ন (Question)</label>
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="যেমন: ৬০ টাকার কত শতাংশ ৯০ টাকা?"
                className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">অপশন A</label>
                <input
                  type="text"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">অপশন B</label>
                <input
                  type="text"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">অপশন C</label>
                <input
                  type="text"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">অপশন D</label>
                <input
                  type="text"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">সঠিক উত্তর</label>
              <select
                value={correctOptIndex}
                onChange={(e) => setCorrectOptIndex(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9] font-bold text-[#EC3B87]"
              >
                <option value={0}>অপশন A</option>
                <option value={1}>অপশন B</option>
                <option value={2}>অপশন C</option>
                <option value={3}>অপশন D</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">বিশদ ব্যাখ্যা (Explanation)</label>
              <textarea
                rows={3}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="সমাধানের নিয়ম ও সূত্র..."
                className="w-full px-3 py-2 rounded-xl bg-[#FFF8FB] border border-[#FFDCE9]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-bold text-sm shadow-md"
            >
              MCQ ডাটাবেজে সংরক্ষণ করুন
            </button>
          </form>
        </div>
      )}

      {/* 3. PDF MANAGEMENT */}
      {activeTab === 'pdf' && (
        <div className="bg-white rounded-3xl p-5 border border-[#FFDCE9] shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h4 className="font-bold text-sm text-[#20202A]">অনুমোদিত ই-বুক ও স্টাডি উপাদান ({books.length} টি)</h4>
            <button className="px-3 py-1.5 rounded-xl bg-[#FFF0F6] text-[#EC3B87] font-bold text-xs flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" /> নতুন অনুমোদিত বই যুক্ত করুন
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {books.map((b) => (
              <div key={b.id} className="p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#20202A]">{b.title}</h5>
                  <p className="text-[11px] text-gray-500">{b.author} • {b.totalPages} পৃষ্ঠা</p>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    {b.badge}
                  </span>
                </div>
                <span className="text-xs text-gray-400">PDF Ready</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#FFDCE9] shadow-xs text-center">
            <Users className="w-6 h-6 text-[#EC3B87] mx-auto mb-2" />
            <span className="text-2xl font-bold text-[#20202A]">২৪,৫৮০</span>
            <p className="text-xs text-gray-500 mt-0.5">মোট সক্রিয় শিক্ষার্থী</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#FFDCE9] shadow-xs text-center">
            <HelpCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-2xl font-bold text-[#20202A]">১,১২,৪৫০</span>
            <p className="text-xs text-gray-500 mt-0.5">এআই টিউটর সেশন সম্পন্ন</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#FFDCE9] shadow-xs text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <span className="text-2xl font-bold text-[#20202A]">৯৮.৪%</span>
            <p className="text-xs text-gray-500 mt-0.5">সিস্টেম আপটাইম</p>
          </div>
        </div>
      )}

    </div>
  );
};
