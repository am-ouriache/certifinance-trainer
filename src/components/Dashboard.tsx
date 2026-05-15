import type { NavTab, ExamId } from '../types';
import { exams } from '../data/exams';
import type { useProgress } from '../hooks/useProgress';

interface DashboardProps {
  progressHook: ReturnType<typeof useProgress>;
  totalQuestions: number;
  onNavigate: (tab: NavTab, examId?: ExamId) => void;
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color ?? 'text-slate-800'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function ProgressBar({ value, color = 'bg-blue-500' }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export default function Dashboard({ progressHook, totalQuestions, onNavigate }: DashboardProps) {
  const { totalAnswered, totalCorrect, totalErrors, globalSuccessRate, getStatsForExam, progress } = progressHook;

  const lastActivity = progress.lastActivity
    ? new Date(progress.lastActivity).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '–';

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">CertiFinance Trainer</h1>
            <p className="text-blue-100 text-sm mt-1">
              Préparez vos certifications financières françaises
            </p>
            <p className="text-blue-200 text-xs mt-2">Dernière activité : {lastActivity}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">{globalSuccessRate}%</div>
            <div className="text-blue-200 text-sm mt-1">Taux de réussite global</div>
          </div>
        </div>
      </div>

      {/* Global stats */}
      <div>
        <h2 className="section-title">Vue d'ensemble</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Questions totales" value={totalQuestions} sub="dans la base" />
          <StatCard
            label="Questions répondues"
            value={totalAnswered}
            sub={`${totalQuestions - totalAnswered} restantes`}
          />
          <StatCard
            label="Bonnes réponses"
            value={totalCorrect}
            color="text-emerald-600"
          />
          <StatCard
            label="Erreurs à revoir"
            value={totalErrors}
            color={totalErrors > 0 ? 'text-red-500' : 'text-slate-800'}
          />
        </div>
      </div>

      {/* Per-exam progress */}
      <div>
        <h2 className="section-title">Progression par examen</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const stats = getStatsForExam(exam.id);
            return (
              <div key={exam.id} className="card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
                    <h3 className="text-sm font-semibold text-slate-800 mt-2">{exam.label}</h3>
                  </div>
                  <span className={`text-xl font-bold ${exam.textColorClass}`}>
                    {stats.rate}%
                  </span>
                </div>
                <ProgressBar
                  value={stats.rate}
                  color={exam.colorClass.replace('bg-', 'bg-')}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>{stats.answered} réponses</span>
                  <span>{stats.errors} erreur{stats.errors !== 1 ? 's' : ''}</span>
                </div>
                <button
                  onClick={() => onNavigate(exam.navTab, exam.id)}
                  className="mt-4 w-full btn-secondary text-xs justify-center"
                >
                  Commencer à réviser →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent mock exams */}
      {progress.mockExamResults.length > 0 && (
        <div>
          <h2 className="section-title">Derniers examens blancs</h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Examen</th>
                    <th className="text-left px-4 py-3 text-slate-500 font-medium">Date</th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">Questions</th>
                    <th className="text-right px-4 py-3 text-slate-500 font-medium">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {progress.mockExamResults.slice(0, 5).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{r.examId}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {new Date(r.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">{r.totalQuestions}</td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-semibold ${
                            r.scorePercent >= 70 ? 'text-emerald-600' : 'text-red-500'
                          }`}
                        >
                          {r.scorePercent}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
