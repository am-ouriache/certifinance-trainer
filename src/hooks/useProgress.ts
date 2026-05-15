import { useCallback } from 'react';
import type { AppProgress, AnsweredQuestion, MockExamResult, Question, Flashcard, Course } from '../types';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'certifinance_progress_v1';

const initialProgress: AppProgress = {
  answeredQuestions: {},
  mockExamResults: [],
  reviewedErrors: [],
  lastActivity: new Date().toISOString(),
  customQuestions: [],
  customFlashcards: [],
  customCourses: [],
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<AppProgress>(STORAGE_KEY, initialProgress);

  const recordAnswer = useCallback(
    (answer: AnsweredQuestion) => {
      setProgress((prev) => ({
        ...prev,
        lastActivity: new Date().toISOString(),
        answeredQuestions: {
          ...prev.answeredQuestions,
          [answer.questionId]: answer,
        },
      }));
    },
    [setProgress]
  );

  const recordMockExam = useCallback(
    (result: MockExamResult) => {
      setProgress((prev) => ({
        ...prev,
        lastActivity: new Date().toISOString(),
        mockExamResults: [result, ...prev.mockExamResults].slice(0, 50), // keep last 50
      }));
    },
    [setProgress]
  );

  const markErrorReviewed = useCallback(
    (questionId: string) => {
      setProgress((prev) => ({
        ...prev,
        reviewedErrors: prev.reviewedErrors.includes(questionId)
          ? prev.reviewedErrors
          : [...prev.reviewedErrors, questionId],
      }));
    },
    [setProgress]
  );

  const unmarkErrorReviewed = useCallback(
    (questionId: string) => {
      setProgress((prev) => ({
        ...prev,
        reviewedErrors: prev.reviewedErrors.filter((id) => id !== questionId),
      }));
    },
    [setProgress]
  );

  const addCustomQuestion = useCallback(
    (question: Question) => {
      setProgress((prev) => ({
        ...prev,
        customQuestions: [...prev.customQuestions, question],
      }));
    },
    [setProgress]
  );

  const addCustomFlashcard = useCallback(
    (flashcard: Flashcard) => {
      setProgress((prev) => ({
        ...prev,
        customFlashcards: [...prev.customFlashcards, flashcard],
      }));
    },
    [setProgress]
  );

  const addCustomCourse = useCallback(
    (course: Course) => {
      setProgress((prev) => ({
        ...prev,
        customCourses: [...prev.customCourses, course],
      }));
    },
    [setProgress]
  );

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [setProgress]);

  // ─── Computed stats ─────────────────────────────────────────────────────────

  const allAnswers = Object.values(progress.answeredQuestions);
  const totalAnswered = allAnswers.length;
  const totalCorrect = allAnswers.filter((a) => a.isCorrect).length;
  const totalErrors = allAnswers.filter((a) => !a.isCorrect).length;
  const globalSuccessRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const getStatsForExam = (examId: string) => {
    const examAnswers = allAnswers.filter((a) => a.examId === examId);
    const answered = examAnswers.length;
    const correct = examAnswers.filter((a) => a.isCorrect).length;
    return {
      answered,
      correct,
      errors: answered - correct,
      rate: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  };

  const errorQuestionIds = allAnswers
    .filter((a) => !a.isCorrect && !progress.reviewedErrors.includes(a.questionId))
    .map((a) => a.questionId);

  return {
    progress,
    recordAnswer,
    recordMockExam,
    markErrorReviewed,
    unmarkErrorReviewed,
    addCustomQuestion,
    addCustomFlashcard,
    addCustomCourse,
    resetProgress,
    // stats
    totalAnswered,
    totalCorrect,
    totalErrors,
    globalSuccessRate,
    errorQuestionIds,
    getStatsForExam,
  };
}
