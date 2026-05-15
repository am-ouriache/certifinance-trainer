import { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw, Zap, Flame, Minus, ExternalLink } from 'lucide-react';
import type { Question, Exam, AnsweredQuestion } from '../types';

interface QuizEngineProps {
  exam: Exam;
  questions: Question[];
  onBack: () => void;
  onAnswer: (answer: AnsweredQuestion) => void;
}

type FilterState = { theme: string; difficulty: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function DiffBadge({ difficulty }: { difficulty: string }) {
  if (difficulty === 'facile') {
    return (
      <span className="diff-facile">
        <Minus className="w-3 h-3" /> Facile
      </span>
    );
  }
  if (difficulty === 'difficile') {
    return (
      <span className="diff-difficile">
        <Flame className="w-3 h-3" /> Difficile
      </span>
    );
  }
  return (
    <span className="diff-moyen">
      <Zap className="w-3 h-3" /> Moyen
    </span>
  );
}

export default function QuizEngine({ exam, questions, onBack, onAnswer }: QuizEngineProps) {
  const [filters, setFilters] = useState<FilterState>({ theme: 'all', difficulty: 'all' });
  const [started, setStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const themes = useMemo(
    () => ['all', ...Array.from(new Set(questions.map((q) => q.theme)))],
    [questions],
  );

  const filtered = useMemo(
    () =>
      questions.filter((q) => {
        const themeOk = filters.theme === 'all' || q.theme === filters.theme;
        const diffOk = filters.difficulty === 'all' || q.difficulty === filters.difficulty;
        return themeOk && diffOk;
      }),
    [questions, filters],
  );

  const handleStart = () => {
    setShuffledQuestions(shuffle(filtered));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
    setStarted(true);
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    const isCorrect = index === currentQuestion.correctAnswerIndex;
    setSelectedAnswer(index);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    onAnswer({
      questionId: currentQuestion.id,
      examId: currentQuestion.examId,
      selectedIndex: index,
      isCorrect,
      answeredAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setFinished(false);
    setSelectedAnswer(null);
  };

  // ─── Not started: filter panel ─────────────────────────────────────────────

  if (!started) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="btn-ghost">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">QCM</h1>
        </div>

        <div className="card p-6 space-y-6">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Configurer la session</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Thème</label>
              <select
                className="select"
                value={filters.theme}
                onChange={(e) => setFilters((f) => ({ ...f, theme: e.target.value }))}
              >
                {themes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? 'Tous les thèmes' : t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Difficulté</label>
              <select
                className="select"
                value={filters.difficulty}
                onChange={(e) => setFilters((f) => ({ ...f, difficulty: e.target.value }))}
              >
                <option value="all">Toutes</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-100">{filtered.length}</span>{' '}
              question{filtered.length !== 1 ? 's' : ''} sélectionnée{filtered.length !== 1 ? 's' : ''}
            </p>
            <button onClick={handleStart} disabled={filtered.length === 0} className="btn-primary">
              Commencer <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Finished ───────────────────────────────────────────────────────────────

  if (finished) {
    const pct = Math.round((score.correct / score.total) * 100);
    const passed = pct >= 70;
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={handleRestart} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Nouvelle session
        </button>
        <div className="card p-8 text-center animate-scale-in">
          <div className={`inline-flex w-16 h-16 rounded-full items-center justify-center mb-5 ${passed ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            {passed
              ? <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              : <XCircle className="w-8 h-8 text-red-500" />}
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Session terminée !</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {score.correct} bonne{score.correct > 1 ? 's' : ''} réponse{score.correct > 1 ? 's' : ''} sur {score.total}
          </p>
          <div className={`text-5xl font-bold mt-4 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
            {pct}%
          </div>
          <div className="flex gap-3 justify-center mt-8">
            <button onClick={handleRestart} className="btn-secondary">
              <RotateCcw className="w-4 h-4" /> Recommencer
            </button>
            <button onClick={onBack} className="btn-primary">
              Retour à l'examen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Active quiz ────────────────────────────────────────────────────────────

  const progressPct = Math.round((currentIndex / shuffledQuestions.length) * 100);
  const showResult = selectedAnswer !== null;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={handleRestart} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Quitter
        </button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <div className="flex-1" />
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {currentIndex + 1} / {shuffledQuestions.length}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" /> {score.correct}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 dark:bg-[#22223a] rounded-full h-1">
        <div
          className={`${exam.colorClass} h-1 rounded-full transition-all duration-500`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Question card */}
      <div className="card p-6 animate-slide-up">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="badge bg-slate-100 dark:bg-[#22223a] text-slate-600 dark:text-slate-300">
            {currentQuestion.theme}
          </span>
          <DiffBadge difficulty={currentQuestion.difficulty} />
        </div>

        {/* Question text */}
        <p className="text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Choices */}
        <div className="mt-6 space-y-2.5">
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;

            let base =
              'w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 flex items-center gap-3 ';

            if (!showResult) {
              base += 'border-slate-200 dark:border-[#2a2a40] text-slate-700 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer active:scale-[0.99]';
            } else if (isCorrect) {
              base += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200';
            } else if (isSelected) {
              base += 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
            } else {
              base += 'border-slate-100 dark:border-[#1c1c28] text-slate-400 dark:text-slate-600 opacity-60';
            }

            return (
              <button key={idx} onClick={() => handleSelectAnswer(idx)} disabled={showResult} className={base}>
                {/* Circle indicator */}
                <span className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  showResult && isCorrect
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : showResult && isSelected
                    ? 'border-red-400 bg-red-400 text-white'
                    : 'border-current'
                }`}>
                  {showResult && isCorrect
                    ? <CheckCircle2 className="w-4 h-4" />
                    : showResult && isSelected && !isCorrect
                    ? <XCircle className="w-4 h-4" />
                    : String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{choice}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-6 space-y-4 animate-slide-up">
            {/* Result banner */}
            <div className={`p-4 rounded-xl border-l-4 ${
              selectedAnswer === currentQuestion.correctAnswerIndex
                ? 'bg-emerald-50 dark:bg-emerald-900/15 border-emerald-500'
                : 'bg-red-50 dark:bg-red-900/15 border-red-400'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQuestion.correctAnswerIndex
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  : <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />}
                <p className={`font-semibold text-sm ${selectedAnswer === currentQuestion.correctAnswerIndex ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                  {selectedAnswer === currentQuestion.correctAnswerIndex ? 'Bonne réponse !' : 'Mauvaise réponse'}
                </p>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>

            {/* Per-choice explanations */}
            <div className="bg-slate-50 dark:bg-[#1c1c28] rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                Détail des réponses
              </p>
              <div className="space-y-2">
                {currentQuestion.wrongExplanations.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm">
                    <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      idx === currentQuestion.correctAnswerIndex
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-slate-200 dark:bg-[#22223a] text-slate-500 dark:text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Source */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <span>Source : {currentQuestion.sourceLabel}</span>
              {currentQuestion.sourceUrl && (
                <a
                  href={currentQuestion.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="flex justify-end">
              <button onClick={handleNext} className="btn-primary">
                {currentIndex < shuffledQuestions.length - 1
                  ? <>Question suivante <ChevronRight className="w-4 h-4" /></>
                  : 'Terminer la session'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
