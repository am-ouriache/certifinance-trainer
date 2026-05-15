import { useState } from 'react';
import { ArrowLeft, FileText, ChevronRight, Pencil } from 'lucide-react';
import type { Course, Exam } from '../types';

interface CourseViewerProps {
  exam: Exam;
  courses: Course[];
  onBack: () => void;
}

export default function CourseViewer({ exam, courses, onBack }: CourseViewerProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    courses.length > 0 ? courses[0] : null,
  );

  if (courses.length === 0) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="card p-16 text-center">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Aucun cours disponible pour cet examen.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
            Ajoutez du contenu via la section « Ajouter ».
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Cours</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">

        {/* ─── Sidebar ─────────────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden sticky top-20">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-[#22223a]">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {courses.length} cours
              </p>
            </div>
            <nav className="divide-y divide-slate-100 dark:divide-[#22223a]">
              {courses.map((course) => {
                const isActive = selectedCourse?.id === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full text-left p-3.5 text-sm transition-colors group ${
                      isActive
                        ? `bg-blue-50 dark:bg-blue-900/15 ${exam.textColorClass} font-semibold`
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1c1c28]'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <FileText className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? '' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="leading-snug">{course.title}</span>
                    </div>
                    {course.isCustom && (
                      <div className="flex items-center gap-1 mt-1 ml-5 text-xs text-amber-600 dark:text-amber-400">
                        <Pencil className="w-3 h-3" /> Personnalisé
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ─── Content ─────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {selectedCourse ? (
            <div className="card p-7 animate-slide-up">
              {/* Course title */}
              <div className="mb-6 pb-5 border-b border-slate-100 dark:border-[#22223a]">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {selectedCourse.title}
                </h2>
                {selectedCourse.isCustom && (
                  <span className="inline-flex items-center gap-1 badge bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 mt-2">
                    <Pencil className="w-3 h-3" /> Contenu personnalisé
                  </span>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {selectedCourse.sections.map((section, idx) => (
                  <div key={idx}>
                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-1 h-5 rounded-full ${exam.colorClass} shrink-0`} />
                      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                        {section.heading}
                      </h3>
                    </div>

                    {/* Section content — parse bullet points */}
                    <div className="ml-4 space-y-1">
                      {section.content.split('\n').map((line, li) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;

                        // Detect bullet lines: starts with •, -, *, or number.
                        const isBullet = /^[•\-\*]/.test(trimmed);
                        const isNumbered = /^\d+[\.\)]/.test(trimmed);

                        if (isBullet) {
                          return (
                            <div key={li} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed py-0.5">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exam.colorClass} shrink-0`} />
                              <span>{trimmed.replace(/^[•\-\*]\s*/, '')}</span>
                            </div>
                          );
                        }

                        if (isNumbered) {
                          const numMatch = trimmed.match(/^(\d+[\.\)])\s*(.*)/);
                          const num = numMatch?.[1] ?? '';
                          const text = numMatch?.[2] ?? trimmed;
                          return (
                            <div key={li} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed py-0.5">
                              <span className={`shrink-0 font-bold text-xs mt-0.5 ${exam.textColorClass}`}>{num}</span>
                              <span>{text}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={li} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {trimmed}
                          </p>
                        );
                      })}
                    </div>

                    {/* Divider between sections */}
                    {idx < selectedCourse.sections.length - 1 && (
                      <div className="mt-6 border-b border-slate-100 dark:border-[#22223a]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Next course shortcut */}
              {courses.length > 1 && (() => {
                const currentIdx = courses.findIndex((c) => c.id === selectedCourse.id);
                const next = courses[currentIdx + 1];
                if (!next) return null;
                return (
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-[#22223a]">
                    <button
                      onClick={() => setSelectedCourse(next)}
                      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      <span>Cours suivant :</span>
                      <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {next.title}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-slate-400 dark:text-slate-500">Sélectionnez un cours dans la liste.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
