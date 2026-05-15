import { useState } from 'react';
import type { Question, Exam, AnsweredQuestion } from '../types';

interface ErrorReviewProps {
  exam: Exam;
  questions: Question[];
  answeredQuestions: Record<string, AnsweredQuestion>;
  reviewedErrors: string[];
  onBack: () => void;
  onMarkReviewed: (questionId: string) => void;
  onUnmarkReviewed: (questionId: string) => void;
  onAnswer: (answer: AnsweredQuestion) => void;
}

export default function ErrorReview({
  exam,
  questions,
  answeredQuestions,
  reviewedErrors,
  onBack,
  onMarkReviewed,
  onUnmarkReviewed,
  onAnswer,
}: ErrorReviewProps) {
  const [showReviewed, setShowReviewed] = useState(false);
  const [retryQuestion, setRetryQuestion] = useState<Question | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<number | null>(null);

  // Find error questions for this exam
  const errorAnswers = Object.values(answeredQuestions).filter(
    (a) => a.examId === exam.id && !a.isCorrect
  );

  const errorQuestions = errorAnswers
    .map((a) => ({ answer: a, question: questions.find((q) => q.id === a.questionId) }))
    .filter((item): item is { answer: AnsweredQuestion; question: Question } => !!item.question);

  const pending = errorQuestions.filter((e) => !reviewedErrors.includes(e.question.id));
  const reviewed = errorQuestions.filter((e) => reviewedErrors.includes(e.question.id));
  const displayed = showReviewed ? reviewed : pending;

  // ─── Retry mode ──────────────────────────────────────────────────────────
  if (retryQuestion) {
    const handleRetryAnswer = (index: number) => {
      if (retryAnswer !== null) return;
      const isCorrect = index === retryQuestion.correctAnswerIndex;
      setRetryAnswer(index);
      onAnswer({
        questionId: retryQuestion.id,
        examId: retryQuestion.examId,
        selectedIndex: index,
        isCorrect,
        answeredAt: new Date().toISOString(),
      });
    };

    return (
      <div className="space-y-4">
        <button onClick={() => { setRetryQuestion(null); setRetryAnswer(null); }} className="btn-ghost">
          ← Retour aux erreurs
        </button>
        <div className="card p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-slate-100 text-slate-600">{retryQuestion.theme}</span>
            <span className="badge bg-red-100 text-red-700">Réessayer</span>
          </div>
          <p className="text-base font-medium text-slate-800 leading-relaxed">{retryQuestion.question}</p>
          <div className="mt-6 space-y-3">
            {retryQuestion.choices.map((choice, idx) => {
              const isSelected = retryAnswer === idx;
              const isCorrect = idx === retryQuestion.correctAnswerIndex;
              const showResult = retryAnswer !== null;
              let cls = 'w-full text-left p-4 rounded-xl border-2 text-sm transition-colors ';
              if (!showResult) cls += 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
              else if (isCorrect) cls += 'border-emerald-500 bg-emerald-50 text-emerald-800';
              else if (isSelected) cls += 'border-red-400 bg-red-50 text-red-700';
              else cls += 'border-slate-200 text-slate-400';
              return (
                <button key={idx} onClick={() => handleRetryAnswer(idx)} disabled={showResult} className={cls}>
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
          {retryAnswer !== null && (
            <div className={`mt-6 p-4 rounded-xl border-l-4 ${retryAnswer === retryQuestion.correctAnswerIndex ? 'bg-emerald-50 border-emerald-500' : 'bg-red-50 border-red-400'}`}>
              <p className="font-semibold text-sm mb-1">
                {retryAnswer === retryQuestion.correctAnswerIndex ? '✅ Bonne réponse !' : '❌ Mauvaise réponse'}
              </p>
              <p className="text-sm text-slate-700">{retryQuestion.explanation}</p>
              {retryAnswer === retryQuestion.correctAnswerIndex && (
                <button
                  onClick={() => { onMarkReviewed(retryQuestion.id); setRetryQuestion(null); setRetryAnswer(null); }}
                  className="mt-3 text-xs text-emerald-700 underline"
                >
                  Marquer comme revu et retirer des erreurs
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Error list ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost">← Retour</button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <h1 className="text-lg font-semibold">Mes erreurs</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{pending.length}</div>
          <div className="text-xs text-slate-500 mt-1">À revoir</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">{reviewed.length}</div>
          <div className="text-xs text-slate-500 mt-1">Revues</div>
        </div>
      </div>

      {/* Toggle */}
      {reviewed.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => setShowReviewed(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${!showReviewed ? 'bg-blue-600 text-white' : 'btn-secondary'}`}
          >
            À revoir ({pending.length})
          </button>
          <button
            onClick={() => setShowReviewed(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${showReviewed ? 'bg-blue-600 text-white' : 'btn-secondary'}`}
          >
            Revues ({reviewed.length})
          </button>
        </div>
      )}

      {/* Empty state */}
      {errorQuestions.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-4xl mb-4">🎯</p>
          <p className="text-slate-500">Aucune erreur pour cet examen !</p>
          <p className="text-slate-400 text-sm mt-2">Faites des QCM pour voir vos erreurs ici.</p>
        </div>
      )}

      {displayed.length === 0 && errorQuestions.length > 0 && (
        <div className="card p-8 text-center text-slate-400">
          {showReviewed ? 'Aucune erreur marquée comme revue.' : 'Toutes les erreurs ont été revues ! 🎉'}
        </div>
      )}

      {/* Error cards */}
      <div className="space-y-4">
        {displayed.map(({ answer, question }) => (
          <div key={question.id} className="card p-5 border-l-4 border-red-400">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`badge ${exam.badgeClass}`}>{question.theme}</span>
              <span className={`badge ${
                question.difficulty === 'facile' ? 'bg-green-100 text-green-700'
                  : question.difficulty === 'moyen' ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
              }`}>{question.difficulty}</span>
            </div>

            <p className="text-sm font-medium text-slate-800 mb-4">{question.question}</p>

            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-red-500 font-medium mb-1">❌ Votre réponse</p>
                <p className="text-slate-700">{question.choices[answer.selectedIndex]}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <p className="text-xs text-emerald-600 font-medium mb-1">✅ Bonne réponse</p>
                <p className="text-slate-700">{question.choices[question.correctAnswerIndex]}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 mb-4">
              <p className="font-medium text-slate-700 mb-1">Explication :</p>
              {question.explanation}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setRetryQuestion(question); setRetryAnswer(null); }}
                className="btn-primary text-xs"
              >
                🔄 Réessayer
              </button>
              {!reviewedErrors.includes(question.id) ? (
                <button
                  onClick={() => onMarkReviewed(question.id)}
                  className="btn-secondary text-xs"
                >
                  ✓ Marquer comme revu
                </button>
              ) : (
                <button
                  onClick={() => onUnmarkReviewed(question.id)}
                  className="btn-ghost text-xs"
                >
                  ↩ Remettre dans les erreurs
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
