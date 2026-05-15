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
  const bestScore = examMockResults.length > 0
    ? Math.max(...examMockResults.map((r) => r.scorePercent))
    : null;
  const avgScore = examMockResults.length > 0
    ? Math.round(examMockResults.reduce((acc, r) => acc + r.scorePercent, 0) / examMockResults.length)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <span className={`badge ${exam.badgeClass} mb-2`}>{exam.shortLabel}</span>
        <h2 className="text-lg font-semibold text-slate-800">Progression détaillée</h2>
      </div>

      {/* QCM stats */}
      <div className="card p-6">
        <h3 className="font-semibold text-slate-700 mb-4">QCM</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-800">{stats.answered}</div>
            <div className="text-xs text-slate-500 mt-1">Répondues</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">{stats.correct}</div>
            <div className="text-xs text-slate-500 mt-1">Correctes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
            <div className="text-xs text-slate-500 mt-1">Erreurs</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Taux de réussite</span>
            <span className="font-semibold text-slate-700">{stats.rate}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`${exam.colorClass} h-2 rounded-full`}
              style={{ width: `${stats.rate}%` }}
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-400">
          {totalQuestions - stats.answered} question{totalQuestions - stats.answered !== 1 ? 's' : ''} restante{totalQuestions - stats.answered !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Mock exams */}
      <div className="card p-6">
        <h3 className="font-semibold text-slate-700 mb-4">Examens blancs</h3>
        {examMockResults.length === 0 ? (
          <p className="text-sm text-slate-400">Aucun examen blanc effectué.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-800">{examMockResults.length}</div>
                <div className="text-xs text-slate-500 mt-1">Tentatives</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${(bestScore ?? 0) >= 70 ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {bestScore}%
                </div>
                <div className="text-xs text-slate-500 mt-1">Meilleur score</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${(avgScore ?? 0) >= 70 ? 'text-emerald-600' : 'text-amber-500'}`}>
                  {avgScore}%
                </div>
                <div className="text-xs text-slate-500 mt-1">Score moyen</div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Historique récent
              </p>
              <div className="space-y-2">
                {examMockResults.slice(0, 5).map((r) => (
                  <div key={r.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-slate-600">{r.totalQuestions} questions</span>
                    <span className={`font-semibold ${r.scorePercent >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {r.scorePercent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="card p-5 border-red-200">
        <h3 className="font-semibold text-red-600 mb-2">Zone de réinitialisation</h3>
        <p className="text-sm text-slate-500 mb-4">
          Attention : cela effacera toute votre progression (toutes les certifications confondues), les examens blancs et les contenus personnalisés.
        </p>
        <button
          onClick={() => {
            if (window.confirm('Voulez-vous vraiment réinitialiser toute votre progression ? Cette action est irréversible.')) {
              resetProgress();
            }
          }}
          className="px-4 py-2 bg-red-50 text-red-600 border border-red-300 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Réinitialiser toute la progression
        </button>
      </div>
    </div>
  );
}
