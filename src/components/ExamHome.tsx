import type { ComponentType } from 'react';
import { BookOpen, Layers, CheckSquare, ClipboardList, AlertTriangle, ChevronRight } from 'lucide-react';
import type { Exam, ExamSection } from '../types';
import type { useProgress } from '../hooks/useProgress';
import ProgressSummary from './ProgressSummary';

interface ExamHomeProps {
  exam: Exam;
  progressHook: ReturnType<typeof useProgress>;
  onSectionSelect: (section: ExamSection) => void;
  questionCount: number;
  courseCount: number;
  flashcardCount: number;
}

const SECTIONS: {
  id: ExamSection;
  label: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    id: 'cours',
    label: 'Cours',
    description: 'Lire les fiches de cours structurées',
    Icon: BookOpen,
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 'fiches',
    label: 'Fiches mémo',
    description: 'Réviser avec des fiches synthétiques',
    Icon: Layers,
    iconBg: 'bg-violet-50 dark:bg-violet-900/20',
    iconColor: 'text-violet-500',
  },
  {
    id: 'qcm',
    label: 'QCM',
    description: "S'entraîner avec des questions à choix multiples",
    Icon: CheckSquare,
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'examen-blanc',
    label: 'Examen blanc',
    description: 'Simuler un examen complet avec minuterie',
    Icon: ClipboardList,
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-500',
  },
  {
    id: 'erreurs',
    label: 'Mes erreurs',
    description: 'Revoir les questions ratées',
    Icon: AlertTriangle,
    iconBg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-500',
  },
];

export default function ExamHome({
  exam,
  progressHook,
  onSectionSelect,
  questionCount,
  courseCount,
  flashcardCount,
}: ExamHomeProps) {
  const { getStatsForExam } = progressHook;
  const stats = getStatsForExam(exam.id);
  const progressPct = questionCount > 0 ? Math.min(100, (stats.answered / questionCount) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ─── Exam header ─────────────────────────────────────────────── */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2">
              {exam.label}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{exam.description}</p>
          </div>

          <div className="flex gap-5 shrink-0">
            <div className="text-center">
              <div className={`text-2xl font-bold ${exam.textColorClass}`}>{stats.rate}%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Réussite</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.answered}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Répondues</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${stats.errors > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-400'}`}>
                {stats.errors}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Erreurs</div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span>Progression</span>
            <span className="font-medium">{stats.answered} / {questionCount} questions</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-[#22223a] rounded-full h-2">
            <div
              className={`${exam.colorClass} h-2 rounded-full transition-all duration-700`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── Content counts ──────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Questions', count: questionCount, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Cours',     count: courseCount,   color: 'text-violet-600 dark:text-violet-400' },
          { label: 'Fiches',    count: flashcardCount, color: 'text-emerald-600 dark:text-emerald-400' },
        ].map(({ label, count, color }) => (
          <div key={label} className="card p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{count}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ─── Section cards ───────────────────────────────────────────── */}
      <div>
        <h2 className="section-title">Que voulez-vous faire ?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section, i) => (
            <button
              key={section.id}
              onClick={() => onSectionSelect(section.id)}
              className="card p-5 text-left hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 active:scale-[0.98] transition-all group animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${section.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <section.Icon className={`w-5 h-5 ${section.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {section.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {section.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 shrink-0 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Detailed progress summary ───────────────────────────────── */}
      <ProgressSummary
        exam={exam}
        progressHook={progressHook}
        totalQuestions={questionCount}
      />
    </div>
  );
}
