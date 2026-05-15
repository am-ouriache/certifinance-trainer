import { useState, useMemo } from 'react';
import type { NavTab, ExamId, ExamSection, Exam, AnsweredQuestion, MockExamResult } from './types';
import { getExamById, getExamsByNav } from './data/exams';
import { builtInQuestions, getQuestionsByExam } from './data/questions';
import { builtInCourses, getCoursesByExam } from './data/courses';
import { builtInFlashcards, getFlashcardsByExam } from './data/flashcards';
import { useProgress } from './hooks/useProgress';

import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ExamHome from './components/ExamHome';
import CourseViewer from './components/CourseViewer';
import FlashcardList from './components/FlashcardList';
import QuizEngine from './components/QuizEngine';
import MockExam from './components/MockExam';
import ErrorReview from './components/ErrorReview';
import ManualAddContent from './components/ManualAddContent';

// ─── Nav state ───────────────────────────────────────────────────────────────

interface AppState {
  tab: NavTab;
  examId: ExamId | null;
  section: ExamSection | null;
  amfSubTab: 'amf-generaliste' | 'amf-finance-durable';
}

const initialState: AppState = {
  tab: 'dashboard',
  examId: null,
  section: null,
  amfSubTab: 'amf-generaliste',
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const progressHook = useProgress();

  const { progress, recordAnswer, recordMockExam, markErrorReviewed, unmarkErrorReviewed,
    addCustomQuestion, addCustomFlashcard, addCustomCourse } = progressHook;

  // Merge built-in + custom content
  const allQuestions = useMemo(
    () => [...builtInQuestions, ...progress.customQuestions],
    [progress.customQuestions]
  );
  const allCourses = useMemo(
    () => [...builtInCourses, ...progress.customCourses],
    [progress.customCourses]
  );
  const allFlashcards = useMemo(
    () => [...builtInFlashcards, ...progress.customFlashcards],
    [progress.customFlashcards]
  );

  const totalQuestions = allQuestions.length;

  // ─── Navigation helpers ──────────────────────────────────────────────────

  const navigate = (tab: NavTab, examId?: ExamId) => {
    if (tab === 'amf') {
      setState((prev) => ({
        ...prev,
        tab,
        examId: examId ?? prev.amfSubTab,
        section: null,
      }));
    } else if (tab === 'dashboard' || tab === 'add-content') {
      setState({ tab, examId: null, section: null, amfSubTab: state.amfSubTab });
    } else {
      // Single-exam tabs: cif-cgp, iobsp-niveau-1, ias-niveau-1
      const tabExams = getExamsByNav(tab);
      setState((prev) => ({
        ...prev,
        tab,
        examId: examId ?? (tabExams[0]?.id ?? null),
        section: null,
      }));
    }
  };

  const selectSection = (section: ExamSection) => {
    setState((prev) => ({ ...prev, section }));
  };

  const goBack = () => {
    setState((prev) => ({ ...prev, section: null }));
  };

  // ─── Resolve current exam ────────────────────────────────────────────────

  const currentExam: Exam | null = state.examId ? (getExamById(state.examId) ?? null) : null;

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleAnswer = (answer: AnsweredQuestion) => {
    recordAnswer(answer);
  };

  const handleMockComplete = (result: MockExamResult) => {
    recordMockExam(result);
  };

  // ─── Render content ──────────────────────────────────────────────────────

  const renderContent = () => {
    const { tab, section } = state;

    // Dashboard
    if (tab === 'dashboard') {
      return (
        <Dashboard
          progressHook={progressHook}
          totalQuestions={totalQuestions}
          onNavigate={navigate}
        />
      );
    }

    // Add content
    if (tab === 'add-content') {
      return (
        <ManualAddContent
          onAddQuestion={addCustomQuestion}
          onAddFlashcard={addCustomFlashcard}
          onAddCourse={addCustomCourse}
        />
      );
    }

    // AMF tab with sub-exams
    if (tab === 'amf') {
      const amfExamId = state.examId as 'amf-generaliste' | 'amf-finance-durable';
      const amfExam = getExamById(amfExamId);
      if (!amfExam) return null;

      return (
        <div className="space-y-4">
          {/* AMF sub-tabs */}
          {!section && (
            <div className="flex gap-2 border-b border-slate-200 pb-0">
              {(['amf-generaliste', 'amf-finance-durable'] as const).map((subId) => {
                const subExam = getExamById(subId)!;
                return (
                  <button
                    key={subId}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        examId: subId,
                        amfSubTab: subId,
                        section: null,
                      }))
                    }
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                      amfExamId === subId
                        ? `${subExam.textColorClass} border-current`
                        : 'text-slate-500 border-transparent hover:text-slate-700'
                    }`}
                  >
                    {subExam.label}
                  </button>
                );
              })}
            </div>
          )}
          {renderExamContent(amfExam, section)}
        </div>
      );
    }

    // Single-exam tabs
    if (currentExam) {
      return renderExamContent(currentExam, section);
    }

    return null;
  };

  const renderExamContent = (exam: Exam, section: ExamSection | null) => {
    const questions = getQuestionsByExam(exam.id, allQuestions);
    const courses = getCoursesByExam(exam.id, allCourses);
    const flashcards = getFlashcardsByExam(exam.id, allFlashcards);

    if (!section) {
      return (
        <ExamHome
          exam={exam}
          progressHook={progressHook}
          onSectionSelect={selectSection}
          questionCount={questions.length}
          courseCount={courses.length}
          flashcardCount={flashcards.length}
        />
      );
    }

    if (section === 'cours') {
      return <CourseViewer exam={exam} courses={courses} onBack={goBack} />;
    }

    if (section === 'fiches') {
      return <FlashcardList exam={exam} flashcards={flashcards} onBack={goBack} />;
    }

    if (section === 'qcm') {
      return (
        <QuizEngine
          exam={exam}
          questions={questions}
          onBack={goBack}
          onAnswer={handleAnswer}
        />
      );
    }

    if (section === 'examen-blanc') {
      return (
        <MockExam
          exam={exam}
          questions={questions}
          onBack={goBack}
          onComplete={handleMockComplete}
          onAnswer={handleAnswer}
          pastResults={progress.mockExamResults}
        />
      );
    }

    if (section === 'erreurs') {
      return (
        <ErrorReview
          exam={exam}
          questions={questions}
          answeredQuestions={progress.answeredQuestions}
          reviewedErrors={progress.reviewedErrors}
          onBack={goBack}
          onMarkReviewed={markErrorReviewed}
          onUnmarkReviewed={unmarkErrorReviewed}
          onAnswer={handleAnswer}
        />
      );
    }

    return null;
  };

  return (
    <Layout activeTab={state.tab} onTabChange={navigate}>
      {renderContent()}
    </Layout>
  );
}
