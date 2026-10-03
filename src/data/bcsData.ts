import { Subject, MCQQuestion, StudyBook, CurrentAffairsItem, Note, UserProfile, TodayStudyPlanItem } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'টুম্পামনি',
  title: 'বিসিএস ৪৭তম ক্যাডার প্রত্যাশী (BCS 47th Cadre Aspirant)',
  streakDays: 12,
  overallProgress: 68,
  completedLessons: 45,
  mockTestsCount: 3,
  questionsSolved: 348,
  accuracyRate: 74,
  targetBcs: '৪৭তম বিসিএস (প্রশাসন ক্যাডার)',
  avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocKihbnLTad7S9lBSsYVHRXe2NqA_usK05olcKmANdH2PKSzew=s256-c',
};

export const initialTodayPlan: TodayStudyPlanItem[] = [
  { id: 'tp-1', subject: 'বাংলাদেশ বিষয়াবলি', topic: 'সংবিধানের মৌলিক অধিকার', durationMin: 30, completed: true },
  { id: 'tp-2', subject: 'গণিত', topic: 'শতকরা (Percentage)', durationMin: 40, completed: false, targetActionId: 'study' },
  { id: 'tp-3', subject: 'English Grammar', topic: 'Subject-Verb Agreement', durationMin: 30, completed: false, targetActionId: 'study' },
  { id: 'tp-4', subject: 'Current Affairs', topic: 'সাম্প্রতিক বাজেট ও আন্তর্জাতিক সম্মেলন', durationMin: 20, completed: false, targetActionId: 'current-affairs' },
  { id: 'tp-5', subject: 'MCQ Practice', topic: 'গণিত ও ব্যাকরণ মিক্সড ৫০ প্রশ্ন', durationMin: 20, completed: false, targetActionId: 'practice' },
];

export const bcsSubjects: Subject[] = [
  {
    id: 'bangla',
    name: 'বাংলা',
    englishName: 'Bangla Literature & Language',
    icon: 'BookOpen',
    color: '#EC3B87',
    totalMarks: 35,
    completedLessons: 18,
    totalLessons: 22,
    accuracy: 82,
    topics: [
      {
        id: 'charjapada',
        subjectId: 'bangla',
        name: 'চর্যাপদ ও প্রাচীন যুগ',
        englishName: 'Ancient Era & Charyapada',
        status: 'completed',
        lessonsCount: 4,
        solvedCount: 35,
        lessons: []
      },
      {
        id: 'madhyajug',
        subjectId: 'bangla',
        name: 'মধ্যযুগ ও মঙ্গলকাব্য',
        englishName: 'Medieval Era',
        status: 'completed',
        lessonsCount: 6,
        solvedCount: 42,
        lessons: []
      },
      {
        id: 'bangla-byakoron',
        subjectId: 'bangla',
        name: 'বাংলা ব্যাকরণ (সমাস, সন্ধি ও কারক)',
        englishName: 'Grammar',
        status: 'in-progress',
        lessonsCount: 12,
        solvedCount: 60,
        lessons: []
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    englishName: 'English Language & Literature',
    icon: 'Languages',
    color: '#9333EA',
    totalMarks: 35,
    completedLessons: 14,
    totalLessons: 23,
    accuracy: 61,
    topics: [
      {
        id: 'eng-grammar',
        subjectId: 'english',
        name: 'Grammar & Parts of Speech',
        englishName: 'Grammar',
        status: 'in-progress',
        isWeak: true,
        lessonsCount: 10,
        solvedCount: 45,
        lessons: []
      },
      {
        id: 'eng-vocab',
        subjectId: 'english',
        name: 'Synonyms & Antonyms',
        englishName: 'Vocabulary',
        status: 'in-progress',
        lessonsCount: 8,
        solvedCount: 30,
        lessons: []
      },
      {
        id: 'eng-lit',
        subjectId: 'english',
        name: 'English Literature (Romantic & Victorian)',
        englishName: 'Literature',
        status: 'not-started',
        lessonsCount: 5,
        solvedCount: 10,
        lessons: []
      }
    ]
  },
  {
    id: 'math',
    name: 'গণিত',
    englishName: 'Mathematical Reasoning',
    icon: 'Calculator',
    color: '#F43F5E',
    totalMarks: 30,
    completedLessons: 9,
    totalLessons: 19,
    accuracy: 47,
    topics: [
      {
        id: 'percentage',
        subjectId: 'math',
        name: 'শতকরা (Percentage)',
        englishName: 'Percentage',
        status: 'in-progress',
        isWeak: true,
        lessonsCount: 4,
        solvedCount: 28,
        lessons: [
          {
            id: 'percentage-1',
            topicId: 'percentage',
            title: 'শতকরা (Percentage) - মৌলিক ধারণা ও ট্রিকস',
            order: 1,
            readTime: '৮ মিনিট',
            summary: 'শতকরার বেসিক কনসেপ্ট, দ্রুত হিসাব করার শর্টকাট সূত্র এবং বিসিএস প্রিলির নির্বাচিত উদাহরণ।',
            content: {
              introduction: 'শতকরা বিসিএস প্রিলিমিনারি গণিত অংশের সবচেয়ে নির্ভরযোগ্য ও গুরুত্বপূর্ণ অধ্যায়। এখান থেকে প্রতি বছর ২ থেকে ৩টি প্রশ্ন সরাসরি বা ঘুরিয়ে আসে।',
              definition: 'শতকরা হলো এমন একটি ভগ্নাংশ যার হর সবসময় ১০০। শতকরা চিহ্নটি হলো %। অর্থাৎ ২০% বলতে বোঝায় ১০০ ভাগের মধ্যে ২০ ভাগ (২০/১০০ = ১/৫)।',
              formula: 'Percentage = (part / total) × 100',
              formulaExplanation: 'যেকোনো অনুপাত বা ভগ্নাংশকে ১০০ দিয়ে গুণ করলে তার শতকরা রূপ পাওয়া যায়। উল্টোভাবে, শতকরা মানকে ১০০ দিয়ে ভাগ করলে মূল ভগ্নাংশ পাওয়া যায়।',
              keyPoints: [
                '১/২ = ৫০%, ১/৩ = ৩৩.৩৩%, ১/৪ = ২৫%, ১/৫ = ২০%',
                '১/৬ = ১৬.৬৭%, ১/৮ = ১২.৫%, ১/১০ = ১০%',
                'কোনো রাশির x% বৃদ্ধি পেয়ে y% হ্রাস পেলে নিট পরিবর্তন = [x - y - (xy/100)]%'
              ],
              workedExamples: [
                {
                  question: '২৫ জনের মধ্যে ২০ জন পাশ করলে শতকরা কতজন পাশ করল?',
                  solution: 'এখানে মোট শিক্ষার্থী (total) = ২৫ এবং পাশ করেছে (part) = ২০।\nসূত্রানুযায়ী:\nশতকরা হার = (part / total) × ১০০\n= (২০ / ২৫) × ১০০%\n= ৪ × ২০%\n= ৮০%\nউত্তরঃ ৮০%',
                  bcsReference: 'মৌলিক ধারণা ভিত্তিক প্রশ্ন'
                },
                {
                  question: '৬০ টাকার কত শতাংশ ৯০ টাকা হবে?',
                  solution: 'ধরি, ৬০ টাকার x% = ৯০\n৬০ × (x / ১০০) = ৯০\nx = (৯০ × ১০০) / ৬০\nx = ১৫০%\nউত্তরঃ ১৫০%',
                  bcsReference: '৩৫তম ও ৪০তম বিসিএস অনুরূপ'
                },
                {
                  question: 'চিনির মূল্য ২৫% বৃদ্ধি পেলে চিনির ব্যবহার শতকরা কত কমালে খরচ একই থাকবে?',
                  solution: 'শর্টকাট সূত্র: [r / (১০০ + r)] × ১০০%\nএখানে r = ২৫%\nব্যবহার কমাতে হবে = [২৫ / (১০০ + ২৫)] × ১০০%\n= (২৫ / ১২৫) × ১০০%\n= (১/৫) × ১০০% = ২০%\nউত্তরঃ ২০%',
                  bcsReference: '৩৭তম বিসিএস প্রিলিমিনারি'
                }
              ],
              rememberTip: 'মনে রাখবে: শতকরা বৃদ্ধির সময় হরে যোগ এবং হ্রাসের সময় বিয়োগ করতে হয়। শতাংশের ভগ্নাংশ মান মনে রাখলে কলম না চালিয়েও মুখে মুখে ৫ সেকেন্ডে সমাধান করা যায়।',
              quickPractice: {
                question: '৪০ এর ২৫% কত?',
                options: ['১০', '১৫', '২০', '২৫'],
                correctIndex: 0,
                explanation: '২৫% মানে চার ভাগের এক ভাগ (১/৪)। অতএব ৪০ × (১/৪) = ১০। অথবা (৪০ × ২৫) / ১০০ = ১০০০ / ১০০ = ১০।'
              }
            }
          }
        ]
      },
      {
        id: 'profit-loss',
        subjectId: 'math',
        name: 'লাভ-ক্ষতি (Profit & Loss)',
        englishName: 'Profit & Loss',
        status: 'not-started',
        lessonsCount: 3,
        solvedCount: 15,
        lessons: []
      },
      {
        id: 'ratio',
        subjectId: 'math',
        name: 'অনুপাত ও সমানুপাত (Ratio)',
        englishName: 'Ratio & Proportion',
        status: 'not-started',
        isWeak: true,
        lessonsCount: 3,
        solvedCount: 10,
        lessons: []
      },
      {
        id: 'algebra',
        subjectId: 'math',
        name: 'বীজগণিতীয় সূত্রাবলি ও উৎপাদক',
        englishName: 'Algebraic Formulas',
        status: 'in-progress',
        lessonsCount: 5,
        solvedCount: 22,
        lessons: []
      },
      {
        id: 'geometry',
        subjectId: 'math',
        name: 'জ্যামিতি ও কোণ সংক্রান্ত উপপাদ্য',
        englishName: 'Geometry',
        status: 'not-started',
        lessonsCount: 4,
        solvedCount: 12,
        lessons: []
      }
    ]
  },
  {
    id: 'bangladesh',
    name: 'বাংলাদেশ বিষয়াবলি',
    englishName: 'Bangladesh Affairs',
    icon: 'Landmark',
    color: '#059669',
    totalMarks: 30,
    completedLessons: 19,
    totalLessons: 25,
    accuracy: 76,
    topics: [
      {
        id: 'liberation-war',
        subjectId: 'bangladesh',
        name: 'মুক্তিযুদ্ধ ও স্বাধীনতা সংগ্রাম ১৯৭১',
        englishName: 'Liberation War 1971',
        status: 'completed',
        lessonsCount: 8,
        solvedCount: 95,
        lessons: []
      },
      {
        id: 'constitution',
        subjectId: 'bangladesh',
        name: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
        englishName: 'Constitution',
        status: 'in-progress',
        lessonsCount: 6,
        solvedCount: 48,
        lessons: []
      },
      {
        id: 'bd-economy',
        subjectId: 'bangladesh',
        name: 'বাংলাদেশের অর্থনীতি, বাজেট ও মেগাপ্রকল্প',
        englishName: 'Economy & Mega Projects',
        status: 'completed',
        lessonsCount: 5,
        solvedCount: 38,
        lessons: []
      }
    ]
  },
  {
    id: 'international',
    name: 'আন্তর্জাতিক বিষয়াবলি',
    englishName: 'International Affairs',
    icon: 'Globe',
    color: '#2563EB',
    totalMarks: 20,
    completedLessons: 10,
    totalLessons: 18,
    accuracy: 65,
    topics: [
      {
        id: 'un-orgs',
        subjectId: 'international',
        name: 'জাতিসংঘ ও বিশ্ব সংস্থাগুলো',
        englishName: 'United Nations & Global Bodies',
        status: 'completed',
        lessonsCount: 6,
        solvedCount: 40,
        lessons: []
      },
      {
        id: 'geopolitics',
        subjectId: 'international',
        name: 'আন্তর্জাতিক চুক্তি ও বৈশ্বিক ভূরাজনীতি',
        englishName: 'Treaties & Geopolitics',
        status: 'in-progress',
        lessonsCount: 7,
        solvedCount: 28,
        lessons: []
      }
    ]
  },
  {
    id: 'science',
    name: 'সাধারণ বিজ্ঞান',
    englishName: 'General Science',
    icon: 'Atom',
    color: '#D97706',
    totalMarks: 15,
    completedLessons: 11,
    totalLessons: 15,
    accuracy: 73,
    topics: [
      {
        id: 'physics',
        subjectId: 'science',
        name: 'পদার্থবিজ্ঞান — আলো, তাপ ও শব্দ',
        englishName: 'Physics',
        status: 'in-progress',
        isWeak: true,
        lessonsCount: 5,
        solvedCount: 25,
        lessons: []
      },
      {
        id: 'biology',
        subjectId: 'science',
        name: 'জীববিজ্ঞান — মানবদেহ ও রোগব্যাধি',
        englishName: 'Biology',
        status: 'completed',
        lessonsCount: 6,
        solvedCount: 50,
        lessons: []
      }
    ]
  },
  {
    id: 'ict',
    name: 'ICT ও তথ্যপ্রযুক্তি',
    englishName: 'Computer & Information Technology',
    icon: 'Cpu',
    color: '#7C3AED',
    totalMarks: 15,
    completedLessons: 14,
    totalLessons: 16,
    accuracy: 88,
    topics: [
      {
        id: 'ict-hardware',
        subjectId: 'ict',
        name: 'কম্পিউটার সংগঠন ও মেমোরি ব্যবস্থা',
        englishName: 'Computer Hardware',
        status: 'completed',
        lessonsCount: 6,
        solvedCount: 60,
        lessons: []
      },
      {
        id: 'ict-network',
        subjectId: 'ict',
        name: 'নেটওয়ার্কিং, ইন্টারনেট ও সাইবার সিকিউরিটি',
        englishName: 'Networking & Security',
        status: 'completed',
        lessonsCount: 5,
        solvedCount: 45,
        lessons: []
      }
    ]
  },
  {
    id: 'ethics',
    name: 'নৈতিকতা ও সুশাসন',
    englishName: 'Ethics, Values & Good Governance',
    icon: 'ShieldCheck',
    color: '#0284C7',
    totalMarks: 10,
    completedLessons: 5,
    totalLessons: 10,
    accuracy: 70,
    topics: [
      {
        id: 'ethics-governance',
        subjectId: 'ethics',
        name: 'সুশাসনের ধারণা ও জবাবদিহিতা',
        englishName: 'Good Governance',
        status: 'in-progress',
        lessonsCount: 5,
        solvedCount: 30,
        lessons: []
      }
    ]
  },
  {
    id: 'geography',
    name: 'ভূগোল ও দুর্যোগ ব্যবস্থাপনা',
    englishName: 'Geography & Disaster Management',
    icon: 'Compass',
    color: '#16A34A',
    totalMarks: 10,
    completedLessons: 6,
    totalLessons: 10,
    accuracy: 75,
    topics: [
      {
        id: 'geo-bd',
        subjectId: 'geography',
        name: 'বাংলাদেশের ভূ-প্রকৃতি ও নদ-নদী',
        englishName: 'Rivers & Topography',
        status: 'completed',
        lessonsCount: 4,
        solvedCount: 34,
        lessons: []
      }
    ]
  }
];

export const sampleMCQs: MCQQuestion[] = [
  {
    id: 'mcq-1',
    subjectId: 'math',
    subjectName: 'গণিত',
    topicId: 'percentage',
    topicName: 'শতকরা (Percentage)',
    question: '৪০ এর ২৫% কত?',
    options: ['১০', '১৫', '২০', '২৫'],
    correctIndex: 0,
    explanation: '৪০ এর ২৫% = ৪০ × (২৫/১০০) = ৪০ × (১/৪) = ১০। সঠিক উত্তর (ক) ১০।',
    difficulty: 'easy',
    bcsExamTag: 'মডেল প্র্যাকটিস'
  },
  {
    id: 'mcq-2',
    subjectId: 'math',
    subjectName: 'গণিত',
    topicId: 'percentage',
    topicName: 'শতকরা (Percentage)',
    question: 'চিনির মূল্য ২০% বৃদ্ধি পেল। চিনির ব্যবহার শতকরা কত কমালে খরচ অপরিবর্তিত থাকবে?',
    options: ['১৬.৬৭%', '২০%', '২৫%', '১২.৫%'],
    correctIndex: 0,
    explanation: 'ব্যবহার হ্রাসের সূত্র: [r / (১০০ + r)] × ১০০% = [২০ / (১০০ + ২০)] × ১০০% = (২০/১২০) × ১০০% = ১৬.৬৭% বা ১৬ সমস্ত ২/৩%।',
    difficulty: 'medium',
    bcsExamTag: '৪৩তম বিসিএস প্রিলিমিনারি'
  },
  {
    id: 'mcq-3',
    subjectId: 'math',
    subjectName: 'গণিত',
    topicId: 'percentage',
    topicName: 'শতকরা (Percentage)',
    question: 'কোনো সংখ্যার ৬০% থেকে ৬০ বিয়োগ করলে বিয়োগফল ৬০ হয়। সংখ্যাটি কত?',
    options: ['১০০', '১৫০', '২০০', '২৫০'],
    correctIndex: 2,
    explanation: 'ধরি সংখ্যাটি x। শর্তমতে, x এর ৬০% - ৬০ = ৬০ => x × ০.৬ = ১২০ => x = ১২০ / ০.৬ = ২০০। উত্তর: ২০০।',
    difficulty: 'medium',
    bcsExamTag: '৩৮তম বিসিএস'
  },
  {
    id: 'mcq-4',
    subjectId: 'bangla',
    subjectName: 'বাংলা',
    topicId: 'charjapada',
    topicName: 'চর্যাপদ ও প্রাচীন যুগ',
    question: 'চর্যাপদ কোন ছন্দে রচিত?',
    options: ['অক্ষরবৃত্ত ছন্দ', 'মাত্রাবৃত্ত ছন্দ', 'মাত্রামুক্তক ছন্দ', 'স্বরমাত্রিক ছন্দ'],
    correctIndex: 1,
    explanation: 'ড. সুনীতিকুমার চট্টোপাধ্যায়ের মতে চর্যাপদের পদগুলো প্রধানত পাদাকুলক বা মাত্রাবৃত্ত ছন্দে রচিত। প্রতি চরণে ১৬ মাত্রা থাকে।',
    difficulty: 'medium',
    bcsExamTag: '৪৫তম বিসিএস'
  },
  {
    id: 'mcq-5',
    subjectId: 'bangla',
    subjectName: 'বাংলা',
    topicId: 'bangla-byakoron',
    topicName: 'বাংলা ব্যাকরণ',
    question: '‘পকেটমার’ কোন সমাসের উদাহরণ?',
    options: ['কর্মধারয় সমাস', 'উপপদ তৎপুরুষ সমাস', 'মধ্যপদলোপী বহুব্রীহি', 'দ্বন্দ্ব সমাস'],
    correctIndex: 1,
    explanation: 'কৃদন্ত পদের সাথে উপপদের যে সমাস হয় তাকে উপপদ তৎপুরুষ বলে। পকেট মারে যে = পকেটমার।',
    difficulty: 'easy',
    bcsExamTag: '৪১তম বিসিএস'
  },
  {
    id: 'mcq-6',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topicId: 'constitution',
    topicName: 'সংবিধান',
    question: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানে মৌলিক অধিকার সম্পর্কিত অনুচ্ছেদগুলো কোন ভাগে সন্নিবেশিত?',
    options: ['দ্বিতীয় ভাগ', 'তৃতীয় ভাগ', 'চতুর্থ ভাগ', 'পঞ্চম ভাগ'],
    correctIndex: 1,
    explanation: 'সংবিধানের তৃতীয় ভাগে (অনুচ্ছেদ ২৬ থেকে ৪৭ক) মৌলিক অধিকারসমূহ বিশদভাবে লিপিবদ্ধ রয়েছে। দ্বিতীয় ভাগে রয়েছে রাষ্ট্র পরিচালনার মূলনীতি।',
    difficulty: 'easy',
    bcsExamTag: '৪৬তম বিসিএস'
  },
  {
    id: 'mcq-7',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topicId: 'liberation-war',
    topicName: 'মুক্তিযুদ্ধ ১৯৭১',
    question: 'মুক্তিযুদ্ধকালীন সময়ে সমগ্র বাংলাদেশকে কয়টি সেক্টরে বিভক্ত করা হয়েছিল?',
    options: ['৮টি', '১০টি', '১১টি', '১৪টি'],
    correctIndex: 2,
    explanation: '১৯৭১ সালের ১০ এপ্রিল গঠিত মুজিবনগর সরকারের সিদ্ধান্ত মোতাবেক জুলাই মাসে মুক্তিবাহিনীর সদর দফতরে অনুষ্ঠিত সেক্টর কমান্ডারদের সম্মেলনে সমগ্র বাংলাদেশকে ১১টি সেক্টরে এবং ৬৪টি সাব-সেক্টরে বিভক্ত করা হয়।',
    difficulty: 'easy',
    bcsExamTag: '৪৪তম বিসিএস'
  },
  {
    id: 'mcq-8',
    subjectId: 'english',
    subjectName: 'English',
    topicId: 'eng-grammar',
    topicName: 'Grammar',
    question: 'Identify the correct sentence:',
    options: [
      'Neither of the two brothers are present.',
      'Neither of the two brothers is present.',
      'Neither of the two brothers were present.',
      'Neither of the two brothers have been present.'
    ],
    correctIndex: 1,
    explanation: '\'Neither of\' phrases take a singular verb. Therefore, \'is present\' is the grammatically correct predicate for the subject.',
    difficulty: 'medium',
    bcsExamTag: '৪২তম বিসিএস'
  },
  {
    id: 'mcq-9',
    subjectId: 'science',
    subjectName: 'সাধারণ বিজ্ঞান',
    topicId: 'physics',
    topicName: 'পদার্থবিজ্ঞান',
    question: 'বৃষ্টির ফোঁটা গোলাকার হওয়ার প্রধান কারণ কোনটি?',
    options: ['সান্দ্রতা', 'পৃষ্ঠটান (Surface Tension)', 'বায়ুর চাপ', 'মহাকর্ষ বল'],
    correctIndex: 1,
    explanation: 'তরলের পৃষ্ঠটান ধর্মের কারণে তরল তার মুক্ত পৃষ্ঠের ক্ষেত্রফলকে ন্যূনতম রাখার চেষ্টা করে। আর নির্দিষ্ট আয়তনে গোলকের ক্ষেত্রফল সবচেয়ে কম হওয়ায় পানির ফোঁটা গোলাকার ধারণ করে।',
    difficulty: 'easy',
    bcsExamTag: '৪০তম বিসিএস'
  },
  {
    id: 'mcq-10',
    subjectId: 'ict',
    subjectName: 'ICT',
    topicId: 'ict-hardware',
    topicName: 'কম্পিউটার সংগঠন',
    question: 'নিচের কোনটি কম্পিউটারের অস্থায়ী এবং উদ্বায়ী (Volatile) মেমোরি?',
    options: ['ROM', 'Hard Disk', 'RAM', 'Flash Drive'],
    correctIndex: 2,
    explanation: 'RAM (Random Access Memory) একটি ভোলাটাইল বা উদ্বায়ী মেমোরি। বিদ্যুৎ সরবরাহ বন্ধ হলে এর সংরক্ষিত তথ্য মুছে যায়।',
    difficulty: 'easy',
    bcsExamTag: '৪৩তম বিসিএস'
  }
];

export const sampleLibraryBooks: StudyBook[] = [
  {
    id: 'bk-1',
    title: 'বিসিএস গণিত শর্টকাট টেকনিক ও বেসিক সল্যুশন',
    author: 'ড. মাহফুজুর রহমান',
    subject: 'গণিত',
    edition: '৪র্থ পরিমার্জিত সংস্করণ ২০২৪',
    totalPages: 128,
    coverGradient: 'from-pink-500 to-rose-600',
    icon: 'Calculator',
    isAuthorized: true,
    badge: 'অনুমোদিত স্টাডি ম্যাটেরিয়াল',
    description: 'বিসিএস প্রিলিমিনারি ও রিটেনের জন্য শতকরার ট্রিকস, লাভ-ক্ষতি, বীজগণিত ও ত্রিকোণমিতির অধ্যায়ভিত্তিক সমাধান।',
    samplePages: [
      {
        pageNumber: 1,
        title: 'সূচিপত্র ও শতকরা সংক্রান্ত রূপরেখা',
        content: 'অধ্যায় ১: শতকরা (Percentage)\n১.১ শতকরার প্রাথমিক ধারণা\n১.২ শতকরার শর্টকাট মেথড (মুখে মুখে সমাধান)\n১.৩ বিসিএস ৩৫তম থেকে ৪৫তম প্রিলির প্রশ্ন সমাধান\n১.৪ চিনি ও দ্রব্যের মূল্যবৃদ্ধি বিষয়ক বিশেষ ট্রিকস\n\nশতকরা মানে প্রতি ১০০ জনের বা ১০০ এককের মধ্যে কত ভাগ।'
      },
      {
        pageNumber: 2,
        title: 'শতকরা মৌলিক সূত্রাবলি ও ভগ্নাংশ রূপান্তর',
        content: 'গোল্ডেন টেবিল:\n১/২ = ৫০%\n১/৩ = ৩৩.৩৩%\n১/৪ = ২৫%\n১/৫ = ২০%\n১/৬ = ১৬.৬৭%\n১/৮ = ১২.৫%\n১/১২ = ৮.৩৩%\n\nউদাহরণ: কোনো পরীক্ষার্থী মোট ৮০০ নম্বরের মধ্যে ৫৬০ নম্বর পেলে তার প্রাপ্ত নম্বরের হার = (৫৬০ / ৮০০) × ১০০% = ৭০%।'
      },
      {
        pageNumber: 3,
        title: 'বিসিএস পরীক্ষার বাছাইকৃত সমস্যা ও সমাধান',
        content: 'সমস্যা ০১: ৬০ টাকার কত শতাংশ ৯০ টাকা?\nসমাধান:\nধরি, ৬০ এর x% = ৯০\nবা, ৬০ × (x / ১০০) = ৯০\nবা, x = (৯০ × ১০০) / ৬০ = ১৫০%\n\nসমস্যা ০২: একটি ক্লাসে ৪০ জন শিক্ষার্থীর মধ্যে ৬০% মেয়ে। ক্লাসে ছেলে শিক্ষার্থীর সংখ্যা কত?\nছেলে শিক্ষার্থীর হার = ১০০% - ৬০% = ৪০%।\nঅতএব ছেলে সংখ্যা = ৪০ এর ৪০% = (৪০ × ৪০) / ১০০ = ১৬ জন।'
      }
    ]
  },
  {
    id: 'bk-2',
    title: 'বাংলাদেশ বিষয়াবলি: সংবিধান ও মুক্তিযুদ্ধ কোষ',
    author: 'প্রফেসর জামিলুর হক',
    subject: 'বাংলাদেশ বিষয়াবলি',
    edition: '২০২৪ সংস্করণ',
    totalPages: 210,
    coverGradient: 'from-emerald-500 to-teal-700',
    icon: 'Landmark',
    isAuthorized: true,
    badge: 'বিসিএস স্পেশাল গাইড',
    description: 'বাংলাদেশের প্রাচীন ইতিহাস, মুক্তিযুদ্ধের ১১টি সেক্টর, ১৯৭২ সালের মূল সংবিধান ও সাম্প্রতিক সংশোধনী।',
    samplePages: [
      {
        pageNumber: 1,
        title: 'সংবিধান প্রণয়ন ইতিহাস ও মৌলিক ধারা',
        content: '১৯৭২ সালের ৪ নভেম্বর গণপরিষদে বাংলাদেশের সংবিধান গৃহীত হয় এবং ১৬ ডিসেম্বর ১৯৭২ থেকে এটি কার্যকর হয়।\nসংবিধানের মোট ভাগ ১১টি, অনুচ্ছেদ ১৫৩টি এবং তফসিল ৭টি।'
      },
      {
        pageNumber: 2,
        title: 'মৌলিক অধিকার (অনুচ্ছেদ ২৭ থেকে ৪৪)',
        content: 'অনুচ্ছেদ ২৭: আইনের দৃষ্টিতে সমতা\nঅনুচ্ছেদ ২৮: ধর্ম প্রভৃতি কারণে বৈষম্যহীনতা\nঅনুচ্ছেদ ৩১: আইনের আশ্রয়লাভের অধিকার\nঅনুচ্ছেদ ৩২: জীবন ও ব্যক্তি স্বাধীনতার অধিকার\nঅনুচ্ছেদ ৩৬: চলাফেরার স্বাধীনতা\nঅনুচ্ছেদ ৩৯: চিন্তা ও বিবেকের স্বাধীনতা এবং বাক-স্বাধীনতা।'
      }
    ]
  },
  {
    id: 'bk-3',
    title: 'English Grammar for BCS Preliminary',
    author: 'A. K. M. Shamsuddin',
    subject: 'English',
    edition: '6th Edition 2024',
    totalPages: 180,
    coverGradient: 'from-purple-600 to-indigo-700',
    icon: 'Languages',
    isAuthorized: true,
    badge: 'হাই-স্কোরিং গাইড',
    description: 'Subject-Verb Agreement, Conditionals, Prepositions, Voice, Narration with authentic BCS questions analysis.',
    samplePages: [
      {
        pageNumber: 1,
        title: 'Subject-Verb Agreement Master Rules',
        content: 'Rule 1: Words joined to a singular subject by "with", "as well as", "together with", "along with", "in addition to", do not affect the number of the verb.\nExample: The Mayor, along with his councillors, was present.'
      }
    ]
  },
  {
    id: 'bk-4',
    title: 'সাধারণ বিজ্ঞান ও আধুনিক প্রযুক্তি পর্যালোচনা',
    author: 'প্রকৌশলী তানভীর আহমেদ',
    subject: 'সাধারণ বিজ্ঞান',
    edition: '৩য় সংস্করণ',
    totalPages: 140,
    coverGradient: 'from-amber-500 to-orange-600',
    icon: 'Atom',
    isAuthorized: true,
    badge: 'অনুমোদিত পাঠ্যসার',
    description: 'পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও আধুনিক আবিষ্কার সম্পর্কিত পুঙ্খানুপুঙ্খ বিসিএস সিলেবাস ভিত্তিক পাঠ।',
    samplePages: [
      {
        pageNumber: 1,
        title: 'আলো ও প্রতিসরণ অধ্যায়',
        content: 'আলো যখন এক স্বচ্ছ মাধ্যম থেকে অন্য স্বচ্ছ মাধ্যমে তীর্যকভাবে প্রবেশ করে তখন দুই মাধ্যমের বিভেদতলে আলোর গতির অভিমুখ পরিবর্তন ঘটে। একে আলোর প্রতিসরণ বলে।'
      }
    ]
  }
];

export const sampleCurrentAffairs: CurrentAffairsItem[] = [
  {
    id: 'ca-1',
    title: 'বাংলাদেশের জাতীয় বাজেট ২০২৪-২৫: মূল বরাদ্দ ও প্রবৃদ্ধি লক্ষ্যমাত্রা',
    date: '০৩ অক্টোবর ২০২৪',
    category: 'daily',
    source: 'অর্থ মন্ত্রণালয় ও বাংলাদেশ ব্যাংক বুলেটিন',
    summary: 'চলতি অর্থবছরে মূল্যস্ফীতি নিয়ন্ত্রণ, সামাজিক সুরক্ষা বৃদ্ধি এবং তথ্যপ্রযুক্তি খাতে বাজেট বরাদ্দের বিশেষ প্রতিফলন ঘটেছে।',
    keyFacts: [
      'মোট দেশজ উৎপাদন (GDP) প্রবৃদ্ধির লক্ষ্যমাত্রা নির্ধারণ করা হয়েছে ৬.৭৫%।',
      'শিক্ষা ও প্রযুক্তি খাতে সার্বিক বরাদ্দের পরিমাণ প্রায় ৯৫ হাজার কোটি টাকা।',
      'স্মার্ট বাংলাদেশ বিনির্মাণে এআই ও সাইবার নিরাপত্তায় বিশেষ তহবিল রাখা হয়েছে।'
    ],
    quiz: {
      question: 'চলতি অর্থবছরে জিডিপি প্রবৃদ্ধির প্রাক্কলিত লক্ষ্যমাত্রা কত?',
      options: ['৬.২৫%', '৬.৭৫%', '৭.০০%', '৭.৫০%'],
      correctIndex: 1,
      explanation: 'জাতীয় বাজেট ২০২৪-২৫ এর প্রাক্কলনে জিডিপি প্রবৃদ্ধির লক্ষ্যমাত্রা ৬.৭৫% ধরা হয়েছে।'
    }
  },
  {
    id: 'ca-2',
    title: 'জাতিসংঘ সাধারণ পরিষদের ৭৯তম অধিবেশন ও জলবায়ু তহবিল চুক্তি',
    date: 'সেপ্টেম্বর ২০২৪',
    category: 'weekly',
    source: 'UN News & Reuters',
    summary: 'নিউইয়র্কে অনুষ্ঠিত অধিবেশনে জলবায়ু ঝুঁকিপূর্ণ দেশগুলোর জন্য লস অ্যান্ড ড্যামেজ ফান্ডের দ্রুত বাস্তবায়নের ওপর জোর দেওয়া হয়।',
    keyFacts: [
      'অধিবেশনের মূল প্রতিপাদ্য ছিল: "কাউকে পেছনে ফেলে নয়, সবার জন্য টেকসই শান্তি ও সমৃদ্ধি"।',
      'বাংলাদেশ প্রতিনিধিদল নদী দূষণ রোধ ও নবায়নযোগ্য শক্তির প্রসারে আন্তর্জাতিক সহযোগিতা আহ্বান করেছে।'
    ],
    quiz: {
      question: 'জাতিসংঘের ৭৯তম অধিবেশনের সভাপতি কে নির্বাচিত হয়েছেন?',
      options: ['অ্যান্টোনিও গুতেরেস', 'ফিলেমন ইয়াং', 'ডেনিস ফ্রান্সিস', 'বান কি মুন'],
      correctIndex: 1,
      explanation: 'ক্যামেরুনের সাবেক প্রধানমন্ত্রী ফিলেমন ইয়াং ৭৯তম জাতিসংঘ সাধারণ পরিষদের সভাপতি নির্বাচিত হন।'
    }
  },
  {
    id: 'ca-3',
    title: 'পদ্মা সেতু ও মেট্রোরেল নেটওয়ার্ক সম্প্রসারণ অগ্রগতি প্রতিবেদন',
    date: 'অক্টোবর ২০২৪',
    category: 'monthly',
    source: 'সড়ক পরিবহন ও সেতু মন্ত্রণালয়',
    summary: 'এমআরটি লাইন-৬ মতিঝিল থেকে কমলাপুর সম্প্রসারণ কাজ পুরোদমে এগিয়ে চলছে এবং নতুন অর্থনৈতিক করিডোর উন্মোচিত হয়েছে।',
    keyFacts: [
      'দৈনিক যাত্রী পরিবহন সক্ষমতা ৫ লক্ষ ছাড়িয়ে যাওয়ার পরিকল্পনা।',
      'সরাসরি মোংলা বন্দর থেকে রাজধানী ঢাকার রেল যোগাযোগ স্থাপিত হয়েছে।'
    ]
  }
];

export const sampleNotes: Note[] = [
  {
    id: 'note-1',
    title: 'শতকরা ও লাভ-ক্ষতির গোল্ডেন শর্টকাট নোট',
    content: '১. চিনির দাম বৃদ্ধি পেলে ব্যবহার কমাতে হবে = [r/(100+r)]*100%\n২. চিনির দাম হ্রাস পেলে ব্যবহার বাড়াতে হবে = [r/(100-r)]*100%\n৩. দুবার পরপর শতকরা পরিবর্তন = x + y + (xy/100)%\n৪. লাভ = বিক্রয়মূল্য - ক্রয়মূল্য। লাভের হার সবসময় ক্রয়মূল্যের ওপর নির্ধারিত হয়।',
    subject: 'গণিত',
    updatedAt: 'আজ সকাল ৯:৩০',
    tags: ['শতকরা', 'লাভ-ক্ষতি', 'বিসিএস ট্রিকস'],
    isPinned: true
  },
  {
    id: 'note-2',
    title: 'সংবিধানের গুরুত্বপূর্ণ অনুচ্ছেদ তালিকা',
    content: 'অনুচ্ছেদ ৭: সংবিধানের প্রাধান্য\nঅনুচ্ছেদ ১১: গণতন্ত্র ও মানবাধিকার\nঅনুচ্ছেদ ১৯: সুযোগের সমতা\nঅনুচ্ছেদ ২৭: আইনের দৃষ্টিতে সমতা\nঅনুচ্ছেদ ৪১: ধর্মীয় স্বাধীনতা\nঅনুচ্ছেদ ৪৭: বিশেষ বিধানযুক্ত আইন\nঅনুচ্ছেদ ৪৮: রাষ্ট্রপতি পদ\nঅনুচ্ছেদ ৭০: সংসদে ফ্লোর ক্রসিং নিষিদ্ধ।',
    subject: 'বাংলাদেশ বিষয়াবলি',
    updatedAt: 'গতকাল রাত ১১:১৫',
    tags: ['সংবিধান', 'মৌলিক অধিকার'],
    isPinned: true
  },
  {
    id: 'note-3',
    title: 'English Vocabulary (BCS Repeated)',
    content: '1. Ephemeral: ক্ষণস্থায়ী (Syn: Transient, Fleeting)\n2. Altruistic: পরোপকারী (Syn: Philanthropic, Benevolent)\n3. Pragmatic: বাস্তবসম্মত (Syn: Practical)\n4. Ubiquitous: সর্বব্যাপী (Syn: Omnipresent)',
    subject: 'English',
    updatedAt: '১ অক্টোবর ২০২৪',
    tags: ['Vocabulary', 'Synonyms'],
    isPinned: false
  }
];
