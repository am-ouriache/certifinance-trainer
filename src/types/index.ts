// ─── Exam identifiers ────────────────────────────────────────────────────────

export type ExamId =
  | 'cif-cgp'
  | 'amf-generaliste'
  | 'amf-finance-durable'
  | 'iobsp-niveau-1'
  | 'ias-niveau-1';

export type NavTab = 'dashboard' | 'cif-cgp' | 'amf' | 'iobsp-niveau-1' | 'ias-niveau-1' | 'add-content';

export type ExamSection = 'cours' | 'fiches' | 'qcm' | 'examen-blanc' | 'erreurs';

// ─── Exam definition ─────────────────────────────────────────────────────────

export interface Exam {
  id: ExamId;
  label: string;
  shortLabel: string;
  colorClass: string;       // tailwind bg color class e.g. "bg-blue-600"
  textColorClass: string;   // tailwind text color class e.g. "text-blue-600"
  borderColorClass: string; // tailwind border color class
  badgeClass: string;       // bg + text combined for badge
  description: string;
  navTab: NavTab;
}

// ─── Question ────────────────────────────────────────────────────────────────

export type Difficulty = 'facile' | 'moyen' | 'difficile';

export interface Question {
  id: string;
  examId: ExamId;
  examLabel: string;
  theme: string;
  difficulty: Difficulty;
  question: string;
  choices: [string, string, string];
  correctAnswerIndex: 0 | 1 | 2;
  explanation: string;
  wrongExplanations: [string, string, string];
  sourceLabel: string;
  sourceUrl?: string;
  isCustom?: boolean;
}

// ─── Course ──────────────────────────────────────────────────────────────────

export interface CourseSection {
  heading: string;
  content: string;
}

export interface Course {
  id: string;
  examId: ExamId;
  title: string;
  sections: CourseSection[];
  isCustom?: boolean;
}

// ─── Flashcard ───────────────────────────────────────────────────────────────

export interface Flashcard {
  id: string;
  examId: ExamId;
  theme: string;
  title: string;
  keyPoints: string[];
  isCustom?: boolean;
}

// ─── Progress & persistence ──────────────────────────────────────────────────

export interface AnsweredQuestion {
  questionId: string;
  examId: ExamId;
  selectedIndex: number;
  isCorrect: boolean;
  answeredAt: string; // ISO date string
}

export interface MockExamResult {
  id: string;
  examId: ExamId;
  date: string; // ISO date string
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  questionResults: Array<{
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }>;
}

export interface AppProgress {
  answeredQuestions: Record<string, AnsweredQuestion>;
  mockExamResults: MockExamResult[];
  reviewedErrors: string[]; // questionIds marked as reviewed
  lastActivity: string; // ISO date string
  customQuestions: Question[];
  customFlashcards: Flashcard[];
  customCourses: Course[];
}

// ─── Quiz engine state ────────────────────────────────────────────────────────

export type QuizMode = 'practice' | 'mock';

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}
