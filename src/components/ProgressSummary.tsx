import { CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import type { Exam } from '../types';
import type { useProgress } from '../hooks/useProgress';

interface ProgressSummaryProps {
  exam: Exam;
  progressHook: ReturnType<typeof useProgress>;
  totalQuestions: number;
}

export default function ProgressSummary({ exam, progressHook, totalQuestions }: ProgressSummaryProps) {
  const { getStatsForExam, progress, resetProgress } = progressHook;
  const stats = getStatsForExam(exam.id);

  const examMockResults = progress.mockExamResults.filter((r) => r.examId === exam.id);
  const bestScore =
    examMockResults.length > 0 ? Math.max(...examMockResults.map((r) => r.scorePercent)) : null;
  const avgScore =
    examMockResults.length > 0
      ? Math.round(
          examMockResults.reduce((acc, r) => acc + r.scorePercent, 0) / examMockResults.length,
        )
      : null;

  const remaining = totalQuestions - stats.answered;

  return (
    <div className="space-y-4">
      <h2 className="section-title">Progression détaillée</h2>

      {/* ─── QCM stats ───────────────────────────────────────────────── */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">QCM</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-5">
          <div>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.answered}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Répondues</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.correct}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Correctes</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${stats.errors > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-400'}`}>
              {stats.errors}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Erreurs</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Taux de réussite</span>
            <span className={`font-bold ${exam.textColorClass}`}>{stats.rate}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-[#22223a] rounded-full h-2">
            <div
              className={`${exam.colorClass} h-2 rounded-full transition-all duration-700`}
              style={{ width: `${stats.rate}%` }}
            />
          </div>
          {remaining > 0 && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {remaining} question{remaining !== 1 ? 's' : ''} restante{remaining !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* ─── Mock exams ──────────────────────────────────────────────── */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Examens blancs</h3>
        </div>

        {examMockResults.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Aucun examen blanc effectué.
          </p>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {examMockResults.length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tentatives</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${(bestScore ?? 0) >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                  {bestScore}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Meilleur</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${(avgScore ?? 0) >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                  {avgScore}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Moyenne</div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Historique récent
              </p>
              <div className="space-y-2">
                {examMockResults.slice(0, 5).map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between text-sm py-1.5 border-b border-slate-100 dark:border-[#22223a] last:border-0"
                  >
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                      {new Date(r.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                      {r.totalQuestions} q.
                    </span>
                    <span
                      className={`font-semibold text-sm ${r.scorePercent >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}
                    >
                      {r.scorePercent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Danger zone ─────────────────────────────────────────────── */}
      <div className="card p-5 border-red-200 dark:border-red-900/40">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">Réinitialisation</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          Attention : efface toute la progression, les examens blancs et les contenus personnalisés
          (toutes certifications confondues).
        </p>
        <button
          onClick={() => {
            if (
              window.confirm(
                'Réinitialiser toute la progression ? Cette action est irréversible.',
              )
            ) {
              resetProgress();
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Réinitialiser tout
        </button>
      </div>
    </div>
  );
}
