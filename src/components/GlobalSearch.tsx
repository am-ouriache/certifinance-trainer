import { Search, BookOpen, Layers, HelpCircle, ArrowRight, FileQuestion } from 'lucide-react';
import type { Course, Flashcard, Question, NavTab, ExamId, ExamSection } from '../types';
import { exams } from '../data/exams';

interface GlobalSearchProps {
  query: string;
  allCourses: Course[];
  allFlashcards: Flashcard[];
  allQuestions: Question[];
  onNavigateToSection: (tab: NavTab, examId: ExamId, section: ExamSection) => void;
}

function getExamByIdLocal(examId: string) {
  return exams.find((e) => e.id === examId);
}

export default function GlobalSearch({
  query,
  allCourses,
  allFlashcards,
  allQuestions,
  onNavigateToSection,
}: GlobalSearchProps) {
  const q = query.toLowerCase().trim();

  if (q.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600 animate-fade-in">
        <Search className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-sm font-medium">Saisissez au moins 2 caractères pour rechercher</p>
        <p className="text-xs mt-1 text-slate-400 dark:text-slate-600">Cours · Fiches · Questions · Thèmes</p>
      </div>
    );
  }

  const matchingCourses = allCourses
    .filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.sections.some(
          (s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q),
        ),
    )
    .slice(0, 5);

  const matchingFlashcards = allFlashcards
    .filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.theme.toLowerCase().includes(q) ||
        f.keyPoints.some((k) => k.toLowerCase().includes(q)),
    )
    .slice(0, 5);

  const matchingQuestions = allQuestions
    .filter(
      (qu) =>
        qu.question.toLowerCase().includes(q) ||
        qu.theme.toLowerCase().includes(q) ||
        qu.choices.some((c) => c.toLowerCase().includes(q)),
    )
    .slice(0, 5);

  const total = matchingCourses.length + matchingFlashcards.length + matchingQuestions.length;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600 animate-fade-in">
        <FileQuestion className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Aucun résultat pour « {query} »
        </p>
        <p className="text-xs mt-1">Essayez un thème, un titre, ou un mot-clé</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{total}</span>{' '}
        résultat{total > 1 ? 's' : ''} pour{' '}
        <span className="italic text-slate-600 dark:text-slate-300">« {query} »</span>
      </p>

      {/* ─── Courses ─────────────────────────────────────────────────────── */}
      {matchingCourses.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Cours{' '}
              <span className="text-slate-400 font-normal">({matchingCourses.length})</span>
            </h3>
          </div>
          <div className="space-y-2">
            {matchingCourses.map((course) => {
              const exam = getExamByIdLocal(course.examId);
              return (
                <button
                  key={course.id}
                  onClick={() =>
                    onNavigateToSection(
                      (exam?.navTab ?? 'dashboard') as NavTab,
                      course.examId as ExamId,
                      'cours',
                    )
                  }
                  className="w-full card p-4 text-left hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {exam?.shortLabel} · {course.sections.length} section
                      {course.sections.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 dark:text-slate-600 shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Flashcards ──────────────────────────────────────────────────── */}
      {matchingFlashcards.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-violet-500" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Fiches mémo{' '}
              <span className="text-slate-400 font-normal">({matchingFlashcards.length})</span>
            </h3>
          </div>
          <div className="space-y-2">
            {matchingFlashcards.map((card) => {
              const exam = getExamByIdLocal(card.examId);
              return (
                <button
                  key={card.id}
                  onClick={() =>
                    onNavigateToSection(
                      (exam?.navTab ?? 'dashboard') as NavTab,
                      card.examId as ExamId,
                      'fiches',
                    )
                  }
                  className="w-full card p-4 text-left hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800 transition-all group flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                      {card.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {exam?.shortLabel} · {card.theme} · {card.keyPoints.length} points
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-violet-500 dark:text-slate-600 shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Questions ───────────────────────────────────────────────────── */}
      {matchingQuestions.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Questions{' '}
              <span className="text-slate-400 font-normal">({matchingQuestions.length})</span>
            </h3>
          </div>
          <div className="space-y-2">
            {matchingQuestions.map((qu) => {
              const exam = getExamByIdLocal(qu.examId);
              return (
                <button
                  key={qu.id}
                  onClick={() =>
                    onNavigateToSection(
                      (exam?.navTab ?? 'dashboard') as NavTab,
                      qu.examId as ExamId,
                      'qcm',
                    )
                  }
                  className="w-full card p-4 text-left hover:shadow-md hover:border-amber-200 dark:hover:border-amber-800 transition-all group flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                      {qu.question}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {exam?.shortLabel} · {qu.theme} · {qu.difficulty}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 dark:text-slate-600 shrink-0 transition-colors" />
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
