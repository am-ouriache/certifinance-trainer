import { useState } from 'react';
import type { Question, Exam, MockExamResult, AnsweredQuestion } from '../types';

interface MockExamProps {
  exam: Exam;
  questions: Question[];
  onBack: () => void;
  onComplete: (result: MockExamResult) => void;
  onAnswer: (answer: AnsweredQuestion) => void;
  pastResults: MockExamResult[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUESTION_COUNTS = [10, 20, 30, 50] as const;

type Phase = 'setup' | 'exam' | 'results';

export default function MockExam({ exam, questions, onBack, onComplete, onAnswer, pastResults }: MockExamProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [lastResult, setLastResult] = useState<MockExamResult | null>(null);

  const examPastResults = pastResults.filter((r) => r.examId === exam.id);

  const handleStart = () => {
    const count = Math.min(questionCount, questions.length);
    const selected = shuffle(questions).slice(0, count);
    setExamQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowReview(false);
    setPhase('exam');
  };

  const currentQuestion = examQuestions[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    const isCorrect = index === currentQuestion.correctAnswerIndex;
    setSelectedAnswer(index);
    const newAnswer = { questionId: currentQuestion.id, selectedIndex: index, isCorrect };
    setAnswers((prev) => [...prev, newAnswer]);
    onAnswer({
      questionId: currentQuestion.id,
      examId: currentQuestion.examId,
      selectedIndex: index,
      isCorrect,
      answeredAt: new Date().toISOString(),
    });
  };

  const handleNext = () => {
    if (currentIndex < examQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // All answers (including last) are already in state since handleSelect batched them before this click
      const allAnswers = answers; // includes the last answer added by handleSelect
      const correct = allAnswers.filter((a) => a.isCorrect).length;
      const total = examQuestions.length;
      const result: MockExamResult = {
        id: `mock-${Date.now()}`,
        examId: exam.id,
        date: new Date().toISOString(),
        totalQuestions: total,
        correctAnswers: correct,
        scorePercent: Math.round((correct / total) * 100),
        questionResults: allAnswers,
      };
      setLastResult(result);
      onComplete(result);
      setPhase('results');
    }
  };

  // ─── Setup ───────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="btn-ghost">← Retour</button>
          <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
          <h1 className="text-lg font-semibold">Examen blanc</h1>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Configurer votre examen blanc</h2>
          <p className="text-sm text-slate-500 mb-6">
            {questions.length} questions disponibles pour cet examen.
          </p>
          <div>
            <label className="label">Nombre de questions</label>
            <div className="flex flex-wrap gap-3">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  disabled={n > questions.length}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold text-sm transition-colors ${
                    questionCount === n
                      ? `${exam.colorClass} text-white border-transparent`
                      : 'border-slate-200 text-slate-700 hover:border-blue-300'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleStart}
            disabled={questions.length === 0}
            className="btn-primary mt-6"
          >
            Démarrer l'examen →
          </button>
        </div>

        {/* History */}
        {examPastResults.length > 0 && (
          <div>
            <h2 className="section-title">Historique des examens blancs</h2>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Date</th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">Questions</th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">Bonnes réponses</th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {examPastResults.slice(0, 10).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(r.date).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">{r.totalQuestions}</td>
                      <td className="px-4 py-3 text-right">{r.correctAnswers}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${r.scorePercent >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {r.scorePercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── Results ─────────────────────────────────────────────────────────────
  if (phase === 'results' && lastResult) {
    const pct = lastResult.scorePercent;
    const passed = pct >= 70;
    return (
      <div className="space-y-6">
        <button onClick={() => setPhase('setup')} className="btn-ghost">← Retour</button>

        <div className="card p-8 text-center">
          <div className="text-5xl mb-4">{passed ? '🎓' : '📚'}</div>
          <h2 className="text-2xl font-bold text-slate-800">
            {passed ? 'Félicitations !' : 'Continuez vos révisions !'}
          </h2>
          <p className="text-slate-500 mt-2">
            {lastResult.correctAnswers} / {lastResult.totalQuestions} bonnes réponses
          </p>
          <div className={`text-5xl font-bold mt-4 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
            {pct}%
          </div>
          <div className={`inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-sm font-medium ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
            {passed ? '✅ Seuil de 70% atteint' : '❌ Seuil de 70% non atteint'}
          </div>
        </div>

        {/* Correction */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title mb-0">Correction détaillée</h2>
            <button
              onClick={() => setShowReview(!showReview)}
              className="btn-secondary text-xs"
            >
              {showReview ? 'Masquer' : 'Afficher la correction'}
            </button>
          </div>

          {showReview && (
            <div className="space-y-3">
              {examQuestions.map((q, idx) => {
                const ans = lastResult.questionResults[idx];
                return (
                  <div
                    key={q.id}
                    className={`card p-5 border-l-4 ${ans.isCorrect ? 'border-emerald-500' : 'border-red-400'}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-lg ${ans.isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                        {ans.isCorrect ? '✅' : '❌'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{q.question}</p>
                        {!ans.isCorrect && (
                          <div className="mt-2 text-sm">
                            <span className="text-red-600">Votre réponse : </span>
                            <span className="text-slate-600">{q.choices[ans.selectedIndex]}</span>
                            <br />
                            <span className="text-emerald-600">Bonne réponse : </span>
                            <span className="text-slate-700 font-medium">{q.choices[q.correctAnswerIndex]}</span>
                          </div>
                        )}
                        <p className="mt-2 text-xs text-slate-500">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={handleStart} className="btn-secondary">Recommencer</button>
          <button onClick={onBack} className="btn-primary">Retour à l'examen</button>
        </div>
      </div>
    );
  }

  // ─── Active exam ──────────────────────────────────────────────────────────
  const progressPct = Math.round(((currentIndex) / examQuestions.length) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <span className="text-sm font-medium text-slate-600">Examen blanc</span>
        <div className="flex-1" />
        <span className="text-sm font-medium text-slate-600">
          {currentIndex + 1} / {examQuestions.length}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div
          className={`${exam.colorClass} h-1.5 rounded-full transition-all`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge bg-slate-100 text-slate-600">{currentQuestion.theme}</span>
          <span className={`badge ${
            currentQuestion.difficulty === 'facile' ? 'bg-green-100 text-green-700'
              : currentQuestion.difficulty === 'moyen' ? 'bg-amber-100 text-amber-700'
              : 'bg-red-100 text-red-700'
          }`}>{currentQuestion.difficulty}</span>
        </div>

        <p className="text-base font-medium text-slate-800 leading-relaxed">
          {currentQuestion.question}
        </p>

        <div className="mt-6 space-y-3">
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            const showResult = selectedAnswer !== null;
            let cls = 'w-full text-left p-4 rounded-xl border-2 text-sm transition-colors ';
            if (!showResult) {
              cls += 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
            } else if (isCorrect) {
              cls += 'border-emerald-500 bg-emerald-50 text-emerald-800';
            } else if (isSelected) {
              cls += 'border-red-400 bg-red-50 text-red-700';
            } else {
              cls += 'border-slate-200 text-slate-400';
            }
            return (
              <button key={idx} onClick={() => handleSelect(idx)} disabled={showResult} className={cls}>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current">
                    {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + idx)}
                  </span>
                  <span>{choice}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6">
            <div className={`p-4 rounded-xl border-l-4 ${selectedAnswer === currentQuestion.correctAnswerIndex ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-400'}`}>
              <p className="font-semibold text-sm mb-1">{selectedAnswer === currentQuestion.correctAnswerIndex ? '✅ Correct !' : '❌ Incorrect'}</p>
              <p className="text-sm text-slate-700">{currentQuestion.explanation}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleNext} className="btn-primary">
                {currentIndex < examQuestions.length - 1 ? 'Suivant →' : 'Voir les résultats'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
