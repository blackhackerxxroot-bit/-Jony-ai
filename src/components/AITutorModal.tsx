import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  CornerDownLeft,
  ChevronRight
} from 'lucide-react';
import { TutorChatMessage, Language } from '../types';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: {
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
  };
  onMarkTopicWeak?: (topicName: string) => void;
  onNavigateToPractice?: () => void;
  language?: Language;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  currentContext,
  onMarkTopicWeak,
  onNavigateToPractice,
  language = 'bn',
}) => {
  const isEn = language === 'en';
  const [messages, setMessages] = useState<TutorChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickQuizSelected, setQuickQuizSelected] = useState<number | null>(null);
  const [quickQuizSubmitted, setQuickQuizSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcoming contextual message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const isMath = currentContext.topic.includes('শতকরা') || currentContext.subject.includes('গণিত');
      const introText = isMath
        ? `আসসালামু আলাইকুম! আমি আপনার **বিসিএস এআই টিউটর**। 🌸\n\nআপনি বর্তমানে **${currentContext.subject} → ${currentContext.topic}** অংশে আছেন।\n\n"কোন বিষয় বুঝতে অসুবিধা হচ্ছে?"\n\nনিচের কুইক বাটন চাপুন অথবা সরাসরি লিখুন, আমি ধাপে ধাপে সহজ ভাষায় সূত্র ও বিসিএস পরীক্ষার উদাহরণ দিয়ে বুঝিয়ে দেব!`
        : `আসসালামু আলাইকুম! আমি আপনার সার্বক্ষণিক **বিসিএস এআই টিউটর**। 🌸\n\nবর্তমান পাঠ: **${currentContext.subject} → ${currentContext.topic}**\n\n"কোন বিষয় বুঝতে অসুবিধা হচ্ছে?"\n\nযেকোনো কঠিন সূত্র, প্যারাগ্রাফ বা বিগত বছরের প্রশ্নের ব্যাখ্যা তাৎক্ষণিক বুঝে নিতে পারেন।`;

      setMessages([
        {
          id: 'welcome-msg',
          sender: 'tutor',
          text: introText,
          timestamp: 'এখন',
          contextSubject: currentContext.subject,
          contextTopic: currentContext.topic,
        },
      ]);
    }
  }, [isOpen, currentContext, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickActions = [
    { 
      label: isEn ? 'Explain Simply' : 'সহজ করে বুঝাও', 
      actionType: 'simplify', 
      promptText: isEn ? `Explain ${currentContext.topic} in very simple language with daily real-life examples.` : `${currentContext.topic} একদম সহজ করে বাস্তব জীবনের উদাহরণ দিয়ে বুঝিয়ে দাও।` 
    },
    { 
      label: isEn ? 'Give Examples' : 'উদাহরণ দাও', 
      actionType: 'examples', 
      promptText: isEn ? `Give 3 easy BCS-standard examples on ${currentContext.topic}.` : `${currentContext.topic} এর ৩টি বিসিএস উপযোগী সহজ উদাহরণ দাও।` 
    },
    { 
      label: isEn ? 'Give MCQ' : 'MCQ দাও', 
      actionType: 'mcq', 
      promptText: isEn ? `Provide a BCS preliminary practice MCQ with solution on ${currentContext.topic}.` : `${currentContext.topic} থেকে বিসিএস মানের একটি প্র্যাকটিস MCQ দাও।` 
    },
    { 
      label: isEn ? 'Show Exam Questions' : 'পরীক্ষার প্রশ্ন দেখাও', 
      actionType: 'bcs_questions', 
      promptText: isEn ? `Show analysis of how previous BCS questions were framed from ${currentContext.topic}.` : `বিগত বিসিএস পরীক্ষায় ${currentContext.topic} থেকে কীভাবে প্রশ্ন এসেছে তা বিশ্লেষণসহ দেখাও।` 
    },
    { 
      label: isEn ? 'Explain My Mistake' : 'আমার ভুলটা বুঝাও', 
      actionType: 'explain_mistake', 
      promptText: isEn ? `I made a mistake in this topic's question, please teach me the correct trick.` : `আমি এই অধ্যায়ের প্রশ্নে ভুল করেছি, আমার ভুলটা সহজভাবে শুধরে দাও।` 
    },
  ];

  const handleSendMessage = async (customPrompt?: string, actionType?: string) => {
    const textToSend = customPrompt || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMessage: TutorChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: 'এখন',
      contextSubject: currentContext.subject,
      contextTopic: currentContext.topic,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          actionType: actionType || 'general',
          context: {
            subject: currentContext.subject,
            topic: currentContext.topic,
            lessonTitle: currentContext.lessonTitle,
            pageText: currentContext.pageText,
            question: currentContext.questionContext?.question,
            userAnswer: currentContext.questionContext?.userAnswer,
            correctAnswer: currentContext.questionContext?.correctAnswer,
            explanation: currentContext.questionContext?.explanation,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned ' + response.status);
      }

      const data = await response.json();
      const tutorReplyText = data.reply || 'দুঃখিত, কোনো উত্তর প্রস্তুত করা যায়নি।';

      const newTutorMessage: TutorChatMessage = {
        id: 'tutor-' + Date.now(),
        sender: 'tutor',
        text: tutorReplyText,
        timestamp: 'এখন',
        contextSubject: currentContext.subject,
        contextTopic: currentContext.topic,
      };

      setMessages((prev) => [...prev, newTutorMessage]);

      // If user said "শতকরা বুঝি না" or made mistake, mark weak topic for adaptive study
      if (textToSend.includes('বুঝি না') || textToSend.includes('ভুল') || actionType === 'explain_mistake') {
        if (onMarkTopicWeak) {
          onMarkTopicWeak(currentContext.topic);
        }
      }
    } catch (err) {
      console.warn('API error, using intelligent fallback', err);
      // Smooth fallback response
      let fallbackText = `### 💡 ${currentContext.topic} - সহজ কনসেপ্ট ও সূত্র\n\n`;
      if (currentContext.topic.includes('শতকরা') || textToSend.includes('শতকরা')) {
        fallbackText += `**১. শতকরা কী?**
শতকরা মানে প্রতি ১০০ জনের বা ১০০ এককের মধ্যে কত ভাগ। চিহ্নটি হলো **%**।
যেমন: ২৫% মানে ১০০ এর মধ্যে ২৫ (১/৪ ভাগ)।

**২. বাস্তব উদাহরণ:**
২৫ জনের মধ্যে ২০ জন পাশ করলে পাশের হার = (২০ ÷ ২৫) × ১০০ = **৮০%**।

**৩. গোল্ডেন সূত্র:**
\`\`\`
Percentage = (part / total) × 100
\`\`\`

**৪. বিসিএস স্টাইল উদাহরণ:**
৬০ টাকার কত শতাংশ ৯০ টাকা হবে?
সমাধান: (৯০ × ১০০) / ৬০ = **১৫০%**।

**৫. আপনার জন্য যাচাই প্রশ্ন:**
৪০ এর ২৫% কত?
(ক) ১০  (খ) ১৫  (গ) ২০  (ঘ) ২৫
*টিপস: চার ভাগের এক ভাগ হিসেবে হিসাব করুন।*`;
      } else {
        fallbackText += `**মূল বিষয়বস্তু:**
বিসিএস প্রিলিমিনারি পরীক্ষায় **${currentContext.topic}** থেকে প্রতি বছরই প্রশ্ন থাকে। 
মুখস্থ করার বদলে যদি আপনি মৌলিক বিষয়টি বুঝে নেন, তবে যেকোনো ঘুরিয়ে দেওয়া প্রশ্নেরও নির্ভুল উত্তর দেওয়া সম্ভব।

**পরামর্শ:**
প্রতিটি নিয়মের পর অন্তত ২টি বিগত বছরের প্রশ্ন নিজে নিজে সমাধান করে দেখুন।`;
      }

      const fallbackMsg: TutorChatMessage = {
        id: 'tutor-fb-' + Date.now(),
        sender: 'tutor',
        text: fallbackText,
        timestamp: 'এখন',
        contextSubject: currentContext.subject,
        contextTopic: currentContext.topic,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteractiveAnswer = (index: number) => {
    setQuickQuizSelected(index);
    setQuickQuizSubmitted(true);
    const isCorrect = index === 0; // '১০' is correct for ৪০ এর ২৫%

    setTimeout(() => {
      const feedbackMessage: TutorChatMessage = {
        id: 'quiz-feed-' + Date.now(),
        sender: 'tutor',
        text: isCorrect
          ? `🎉 **চমৎকার! আপনার উত্তরটি একদম সঠিক! (ক) ১০**\n\nব্যাখ্যা: ৪০ × (২৫/১০০) = ৪০ × (১/৪) = ১০। আপনি শতকরার বেসিক কনসেপ্ট খুব ভালো বুঝতে পেরেছেন! এখন প্র্যাকটিস সেকশনে গিয়ে আরও প্রশ্ন সমাধান করতে পারেন।`
          : `⚠️ **আপনার নির্বাচিত উত্তরটি সঠিক হয়নি। সঠিক উত্তর হলো (ক) ১০।**\n\n**ভুল সংশোধনী:**\nআপনি হয়তো হিসাব করার সময় মোট সংখ্যা উল্টো ধরেছেন। মনে রাখুন:\n৪০ এর ২৫% = ৪০ × (২৫/১০০) = ৪০ × ১/৪ = ১০।\n\n*সিস্টেম এই টপিকটি আপনার "দুর্বল তালিকা"য় যুক্ত করেছে যাতে আপনি পরীক্ষার আগে আবার রিভিশন দিতে পারেন।*`,
        timestamp: 'এখন',
        contextSubject: currentContext.subject,
        contextTopic: currentContext.topic,
      };
      setMessages((prev) => [...prev, feedbackMessage]);
      if (!isCorrect && onMarkTopicWeak) {
        onMarkTopicWeak(currentContext.topic);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-[92vh] sm:h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#FFDCE9]">
        
        {/* Header: AI Tutor ● Online */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-wide">{isEn ? 'BCS AI Tutor' : 'বিসিএস AI Tutor'}</h3>
                <span className="flex items-center gap-1 bg-white/20 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                  ● {isEn ? 'Online' : 'Online (অনলাইন)'}
                </span>
              </div>
              <p className="text-[11px] text-pink-100 flex items-center gap-1 mt-0.5">
                <BookOpen className="w-3 h-3" />
                {isEn ? 'Context' : 'বর্তমান প্রসঙ্গ'}: <span className="font-semibold text-white">{currentContext.subject} → {currentContext.topic}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/40 flex items-center justify-center text-white transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Suggestion Bar */}
        <div className="bg-[#FFF8FB] px-3 py-2 border-b border-[#FFDCE9] overflow-x-auto shrink-0 flex items-center gap-1.5 scrollbar-none">
          <span className="text-[11px] text-gray-500 font-semibold shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-[#EC3B87]" /> দ্রুত অ্যাকশন:
          </span>
          {quickActions.map((qa) => (
            <button
              key={qa.label}
              onClick={() => handleSendMessage(qa.promptText, qa.actionType)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-xl bg-white border border-[#FFDCE9] text-[#20202A] text-xs font-medium hover:bg-[#FFF0F6] hover:border-[#EC3B87] hover:text-[#EC3B87] whitespace-nowrap transition-all shadow-xs active:scale-95 disabled:opacity-50"
            >
              {qa.label}
            </button>
          ))}
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-[#FFFDFE]">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {isTutor && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 shadow-xs text-xs sm:text-sm leading-relaxed ${
                    isTutor
                      ? 'bg-white border border-[#FFDCE9] text-[#20202A]'
                      : 'bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-medium'
                  }`}
                >
                  {/* Context pill if changed */}
                  {msg.contextTopic && isTutor && (
                    <div className="mb-2 pb-1.5 border-b border-pink-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span className="text-[#EC3B87] font-semibold">{msg.contextSubject} • {msg.contextTopic}</span>
                      <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Render content with styled markdown formatting */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={idx} className="font-bold text-sm sm:text-base text-[#EC3B87] mt-1 border-b border-pink-100 pb-1">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
                        const code = paragraph.replace(/```/g, '').trim();
                        return (
                          <div key={idx} className="bg-pink-50/70 p-2.5 rounded-xl border border-pink-200 font-mono text-xs text-[#EC3B87] font-bold">
                            {code}
                          </div>
                        );
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>

                  {/* Interactive Quiz Mini Card if Percentage topic is explained */}
                  {isTutor && msg.text.includes('৪০ এর ২৫% কত?') && !quickQuizSubmitted && (
                    <div className="mt-3 pt-3 border-t border-pink-100 bg-[#FFF8FB] -mx-1.5 p-2.5 rounded-xl">
                      <p className="font-bold text-xs text-[#EC3B87] mb-2">⚡ এখনই উত্তর দিয়ে পরখ করে নিন:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {['(ক) ১০', '(খ) ১৫', '(গ) ২০', '(ঘ) ২৫'].map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleInteractiveAnswer(oIdx)}
                            className="p-2 rounded-lg bg-white border border-[#FFDCE9] text-left text-xs font-medium hover:border-[#EC3B87] hover:bg-[#FFF0F6] transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EC3B87] to-[#FF72A9] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-[#FFDCE9] rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs text-gray-500 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#EC3B87] animate-ping"></span>
                টিউটর চিন্তা করছেন ও আপনার জন্য সহজ ব্যাখ্যা তৈরি করছেন...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Context Help Pill on bottom */}
        {currentContext.lessonTitle && (
          <div className="px-4 py-1.5 bg-[#FFF0F6] border-t border-[#FFDCE9] text-[11px] text-[#EC3B87] flex items-center justify-between">
            <span className="flex items-center gap-1 truncate">
              <Sparkles className="w-3 h-3" />
              বর্তমান পাঠ: {currentContext.lessonTitle}
            </span>
            {onNavigateToPractice && (
              <button
                onClick={onNavigateToPractice}
                className="font-bold underline text-[11px] flex items-center gap-0.5 shrink-0 hover:text-pink-700"
              >
                প্র্যাকটিস শুরু করুন <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#FFDCE9] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isEn ? "Ask your question... (e.g., 'Explain percentage formula' or 'Why did I get this wrong?')" : "আপনার প্রশ্ন লিখুন... (যেমন: 'শতকরা বুঝি না' বা 'এটা বুঝি নাই')"}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-2xl bg-[#FFF8FB] border border-[#FFDCE9] text-xs sm:text-sm text-[#20202A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#EC3B87] focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSendMessage(isEn ? 'I do not understand percentage' : 'শতকরা বুঝি না')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-pink-100 text-[#EC3B87] font-semibold px-1.5 py-0.5 rounded-md hover:bg-pink-200 transition-colors cursor-pointer"
                title="Quick Prompt"
              >
                {isEn ? 'Percent?' : 'শতকরা?'}
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#EC3B87] to-[#FF72A9] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#EC3B87]/30 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isEn ? 'Send' : 'পাঠাও'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
