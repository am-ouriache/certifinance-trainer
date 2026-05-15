import type { ComponentType } from 'react';
import { CheckCircle2, XCircle, BookOpen, ArrowRight, Trophy, Target } from 'lucide-react';
import type { NavTab, ExamId } from '../types';
import { exams } from '../data/exams';
import type { useProgress } from '../hooks/useProgress';

interface DashboardProps {
  progressHook: ReturnType<typeof useProgress>;
  totalQuestions: number;
  onNavigate: (tab: NavTab, examId?: ExamId) => void;
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: ComponentType<{ className?: string }>;
  iconClass?: string;
  valueClass?: string;
}

function StatCard({ label, value, sub, icon: Icon, iconClass = 'text-blue-500', valueClass = 'text-slate-800 dark:text-slate-100' }: StatCardProps) {
  return (
    <div className="card p-5 flex items-start gap-4 hover:shadow-md transition-shadow animate-slide-up">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 dark:bg-[#1c1c28]`}>
        <Icon className={`w-5 h-5 ${iconClass}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${valueClass}`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ProgressRing({ value, size = 56, stroke = 5, color = '#3b82f6' }: { value: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, value) / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-100 dark:text-[#22223a]" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

export default function Dashboard({ progressHook, totalQuestions, onNavigate }: DashboardProps) {
  const { totalAnswered, totalCorrect, totalErrors, globalSuccessRate, getStatsForExam, progress } = progressHook;

  const lastActivity = progress.lastActivity
    ? new Date(progress.lastActivity).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
      })
    : null;

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
                Tableau de bord
              </p>
              <h1 className="text-2xl font-bold leading-tight">CertiFinance Trainer</h1>
              <p className="text-blue-200 text-sm mt-1">
                Préparez vos certifications financières françaises
              </p>
              {lastActivity && (
                <p className="text-blue-300/70 text-xs mt-3">
                  Dernière activité · {lastActivity}
                </p>
              )}
            </div>

            {/* Global success ring */}
            <div className="flex items-center gap-5 shrink-0">
              <div className="relative">
                <ProgressRing value={globalSuccessRate} size={80} stroke={7} color="#34d399" />
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                  {globalSuccessRate}%
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">{globalSuccessRate}%</p>
                <p className="text-blue-200 text-xs mt-0.5">Taux global</p>
                <p className="text-blue-300/70 text-xs mt-2">{totalAnswered} / {totalQuestions} répondues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-[#22223a] bg-white dark:bg-[#16161f]">
          {[
            { label: 'Répondues', value: totalAnswered, color: 'text-slate-800 dark:text-slate-100' },
            { label: 'Correctes',  value: totalCorrect,  color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Erreurs',    value: totalErrors,   color: totalErrors > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-800 dark:text-slate-100' },
          ].map(({ label, value, color }) => (
            <div key={label} className="py-3 px-4 text-center">
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stat cards ──────────────────────────────────────────────── */}
      <div>
        <h2 className="section-title">Vue d'ensemble</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Questions totales"
            value={totalQuestions}
            sub="dans la base"
            icon={BookOpen}
            iconClass="text-blue-500"
          />
          <StatCard
            label="Complétées"
            value={totalAnswered}
            sub={`${totalQuestions - totalAnswered} restantes`}
            icon={Target}
            iconClass="text-violet-500"
          />
          <StatCard
            label="Bonnes réponses"
            value={totalCorrect}
            icon={CheckCircle2}
            iconClass="text-emerald-500"
            valueClass="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            label="Erreurs à revoir"
            value={totalErrors}
            icon={XCircle}
            iconClass={totalErrors > 0 ? 'text-red-500' : 'text-slate-400'}
            valueClass={totalErrors > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-800 dark:text-slate-100'}
          />
        </div>
      </div>

      {/* ─── Per-exam progress ───────────────────────────────────────── */}
      <div>
        <h2 className="section-title">Progression par examen</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam, i) => {
            const stats = getStatsForExam(exam.id);
            return (
              <div
                key={exam.id}
                className="card p-5 hover:shadow-md transition-all group animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-2 leading-snug">
                      {exam.label}
                    </h3>
                  </div>
                  <div className="ml-3 shrink-0">
                    <ProgressRing value={stats.rate} size={48} stroke={4} />
                    <p className={`text-xs font-bold text-center mt-0.5 ${exam.textColorClass}`}>
                      {stats.rate}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-[#22223a] rounded-full h-1.5">
                  <div
                    className={`${exam.colorClass} h-1.5 rounded-full transition-all duration-700`}
                    style={{ width: `${stats.rate}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span>{stats.answered} réponse{stats.answered !== 1 ? 's' : ''}</span>
                  {stats.errors > 0 && (
                    <span className="text-red-400">{stats.errors} erreur{stats.errors !== 1 ? 's' : ''}</span>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(exam.navTab, exam.id)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#2a2a40] rounded-xl hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group-hover:border-current"
                >
                  Réviser <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Recent mock exams ───────────────────────────────────────── */}
      {progress.mockExamResults.length > 0 && (
        <div>
          <h2 className="section-title">Derniers examens blancs</h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-[#1c1c28] border-b border-slate-200 dark:border-[#22223a]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Examen</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Date</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Questions</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#22223a]">
                  {progress.mockExamResults.slice(0, 5).map((r) => {
                    const exam = exams.find((e) => e.id === r.examId);
                    return (
                      <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-[#1c1c28] transition-colors">
                        <td className="px-4 py-3">
                          {exam
                            ? <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
                            : <span className="text-slate-500 dark:text-slate-400">{r.examId}</span>
                          }
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">
                          {new Date(r.date).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">{r.totalQuestions}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-flex items-center gap-1 font-semibold ${r.scorePercent >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                            {r.scorePercent >= 70 ? <Trophy className="w-3 h-3" /> : null}
                            {r.scorePercent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
