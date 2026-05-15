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

const SECTIONS: { id: ExamSection; label: string; description: string; icon: string }[] = [
  {
    id: 'cours',
    label: 'Cours',
    description: 'Lire les fiches de cours structurées',
    icon: '📖',
  },
  {
    id: 'fiches',
    label: 'Fiches mémo',
    description: 'Réviser avec des fiches synthétiques',
    icon: '🗂️',
  },
  {
    id: 'qcm',
    label: 'QCM',
    description: 'S\'entraîner avec des questions à choix multiples',
    icon: '✅',
  },
  {
    id: 'examen-blanc',
    label: 'Examen blanc',
    description: 'Simuler un examen complet avec minuterie',
    icon: '📝',
  },
  {
    id: 'erreurs',
    label: 'Mes erreurs',
    description: 'Revoir les questions ratées',
    icon: '🔍',
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

  return (
    <div className="space-y-6">
      {/* Exam header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <span className={`badge ${exam.badgeClass} mb-2`}>{exam.shortLabel}</span>
            <h1 className="text-xl font-bold text-slate-800">{exam.label}</h1>
            <p className="text-slate-500 text-sm mt-1">{exam.description}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className={`text-2xl font-bold ${exam.textColorClass}`}>{stats.rate}%</div>
              <div className="text-xs text-slate-500">Réussite</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stats.answered}</div>
              <div className="text-xs text-slate-500">Répondues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{stats.errors}</div>
              <div className="text-xs text-slate-500">Erreurs</div>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progression</span>
            <span>
              {stats.answered} / {questionCount} questions
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`${exam.colorClass} h-2 rounded-full transition-all duration-500`}
              style={{
                width: `${questionCount > 0 ? Math.min(100, (stats.answered / questionCount) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content counts */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Questions', count: questionCount, icon: '❓' },
          { label: 'Cours', count: courseCount, icon: '📖' },
          { label: 'Fiches', count: flashcardCount, icon: '🗂️' },
        ].map((item) => (
          <div key={item.label} className="card p-4 text-center">
            <div className="text-xl mb-1">{item.icon}</div>
            <div className="text-xl font-bold text-slate-800">{item.count}</div>
            <div className="text-xs text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation cards */}
      <div>
        <h2 className="section-title">Que voulez-vous faire ?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionSelect(section.id)}
              className="card p-5 text-left hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {section.label}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{section.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed progress summary */}
      <ProgressSummary
        exam={exam}
        progressHook={progressHook}
        totalQuestions={questionCount}
      />
    </div>
  );
}
