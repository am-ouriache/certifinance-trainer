import { useState, useMemo } from 'react';
import type { Question, Exam, AnsweredQuestion } from '../types';

interface QuizEngineProps {
  exam: Exam;
  questions: Question[];
  onBack: () => void;
  onAnswer: (answer: AnsweredQuestion) => void;
}

type FilterState = {
  theme: string;
  difficulty: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
    [questions]
  );

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const themeOk = filters.theme === 'all' || q.theme === filters.theme;
      const diffOk = filters.difficulty === 'all' || q.difficulty === filters.difficulty;
      return themeOk && diffOk;
    });
  }, [questions, filters]);

  const handleStart = () => {
    const sq = shuffle(filtered);
    setShuffledQuestions(sq);
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
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="btn-ghost">← Retour</button>
          <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
          <h1 className="text-lg font-semibold text-slate-800">QCM</h1>
        </div>

        <div className="card p-6 space-y-6">
          <h2 className="font-semibold text-slate-800">Configurer votre session</h2>

          {/* Filters */}
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

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">
              <strong className="text-slate-800">{filtered.length}</strong> question{filtered.length !== 1 ? 's' : ''} sélectionnée{filtered.length !== 1 ? 's' : ''}
            </div>
            <button
              onClick={handleStart}
              disabled={filtered.length === 0}
              className="btn-primary"
            >
              Commencer →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Finished ───────────────────────────────────────────────────────────────
  if (finished) {
    const pct = Math.round((score.correct / score.total) * 100);
    return (
      <div className="space-y-4">
        <button onClick={handleRestart} className="btn-ghost">← Nouvelle session</button>
        <div className="card p-8 text-center">
          <div className="text-5xl mb-4">{pct >= 70 ? '🎉' : '📚'}</div>
          <h2 className="text-xl font-bold text-slate-800">Session terminée !</h2>
          <p className="text-slate-500 mt-2">
            {score.correct} bonne{score.correct > 1 ? 's' : ''} réponse{score.correct > 1 ? 's' : ''} sur {score.total}
          </p>
          <div className={`text-4xl font-bold mt-4 ${pct >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
            {pct}%
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={handleRestart} className="btn-secondary">
              Recommencer
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={handleRestart} className="btn-ghost">← Quitter</button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <div className="flex-1" />
        <span className="text-sm font-medium text-slate-600">
          {currentIndex + 1} / {shuffledQuestions.length}
        </span>
        <span className="text-sm font-semibold text-emerald-600">
          {score.correct} ✓
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div
          className={`${exam.colorClass} h-1.5 rounded-full transition-all duration-300`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Question card */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge bg-slate-100 text-slate-600">{currentQuestion.theme}</span>
          <span className={`badge ${
            currentQuestion.difficulty === 'facile'
              ? 'bg-green-100 text-green-700'
              : currentQuestion.difficulty === 'moyen'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <p className="text-base font-medium text-slate-800 leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Choices */}
        <div className="mt-6 space-y-3">
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            const showResult = selectedAnswer !== null;

            let choiceClass =
              'w-full text-left p-4 rounded-xl border-2 text-sm transition-colors ';
            if (!showResult) {
              choiceClass += 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
            } else if (isCorrect) {
              choiceClass += 'border-emerald-500 bg-emerald-50 text-emerald-800';
            } else if (isSelected && !isCorrect) {
              choiceClass += 'border-red-400 bg-red-50 text-red-700';
            } else {
              choiceClass += 'border-slate-200 text-slate-400';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                disabled={showResult}
                className={choiceClass}
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current">
                    {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {selectedAnswer !== null && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-xl border-l-4 ${
              selectedAnswer === currentQuestion.correctAnswerIndex
                ? 'bg-emerald-50 border-emerald-500'
                : 'bg-red-50 border-red-400'
            }`}>
              <p className="font-semibold text-sm mb-2">
                {selectedAnswer === currentQuestion.correctAnswerIndex
                  ? '✅ Bonne réponse !'
                  : '❌ Mauvaise réponse'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
            </div>

            {/* Wrong explanations */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Détail des réponses
              </p>
              <div className="space-y-2">
                {currentQuestion.wrongExplanations.map((exp, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <span
                      className={`shrink-0 font-bold ${
                        idx === currentQuestion.correctAnswerIndex
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="text-slate-600">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Source */}
            <div className="text-xs text-slate-400">
              Source : {currentQuestion.sourceLabel}
              {currentQuestion.sourceUrl && (
                <a
                  href={currentQuestion.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:underline"
                >
                  ↗
                </a>
              )}
            </div>

            <div className="flex justify-end">
              <button onClick={handleNext} className="btn-primary">
                {currentIndex < shuffledQuestions.length - 1 ? 'Question suivante →' : 'Terminer la session'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
