export type Language = 'bn' | 'en';

export type SystemId =
  | 'home'
  | 'study'
  | 'library'
  | 'practice'
  | 'mock-test'
  | 'progress'
  | 'current-affairs'
  | 'notes'
  | 'profile'
  | 'admin';

export interface Subject {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
  totalMarks: number;
  completedLessons: number;
  totalLessons: number;
  accuracy: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  englishName: string;
  status: 'completed' | 'in-progress' | 'not-started';
  isWeak?: boolean;
  lessonsCount: number;
  solvedCount: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  order: number;
  readTime: string;
  summary: string;
  content: {
    introduction: string;
    definition: string;
    formula?: string;
    formulaExplanation?: string;
    keyPoints: string[];
    workedExamples: {
      question: string;
      solution: string;
      bcsReference?: string;
    }[];
    rememberTip: string;
    quickPractice: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    };
  };
}

export interface MCQQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  bcsExamTag?: string; // e.g., '৪৫তম বিসিএস প্রিলিমিনারি'
  isBookmarked?: boolean;
  userSelected?: number | null;
  isMarkedForReview?: boolean;
}

export interface StudyBook {
  id: string;
  title: string;
  author: string;
  subject: string;
  edition: string;
  totalPages: number;
  coverGradient: string;
  icon: string;
  isAuthorized: boolean;
  badge: string;
  description: string;
  samplePages: {
    pageNumber: number;
    title: string;
    content: string;
  }[];
}

export interface MockTestResult {
  testId: string;
  testTitle: string;
  date: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  correct: number;
  wrong: number;
  skipped: number;
  negativeMarks: number;
  timeTaken: string;
  subjectPerformance: {
    subject: string;
    scorePercent: number;
    correct: number;
    total: number;
  }[];
  weakTopicsIdentified: string[];
  aiRecommendation: string;
}

export interface CurrentAffairsItem {
  id: string;
  title: string;
  date: string;
  category: 'daily' | 'weekly' | 'monthly' | 'quiz';
  source: string;
  summary: string;
  keyFacts: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  updatedAt: string;
  tags: string[];
  isPinned?: boolean;
}

export interface UserProfile {
  name: string;
  title: string;
  streakDays: number;
  overallProgress: number;
  completedLessons: number;
  mockTestsCount: number;
  questionsSolved: number;
  accuracyRate: number;
  targetBcs: string;
  avatarUrl: string;
}

export interface TodayStudyPlanItem {
  id: string;
  subject: string;
  topic: string;
  durationMin: number;
  completed: boolean;
  targetActionId?: SystemId;
}

export interface TutorChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  contextSubject?: string;
  contextTopic?: string;
  isCodeOrMath?: boolean;
}
