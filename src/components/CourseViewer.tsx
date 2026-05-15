import { useState } from 'react';
import type { Course, Exam } from '../types';

interface CourseViewerProps {
  exam: Exam;
  courses: Course[];
  onBack: () => void;
}

export default function CourseViewer({ exam, courses, onBack }: CourseViewerProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    courses.length > 0 ? courses[0] : null
  );

  if (courses.length === 0) {
    return (
      <div className="space-y-4">
        <button onClick={onBack} className="btn-ghost">
          ← Retour
        </button>
        <div className="card p-12 text-center">
          <p className="text-4xl mb-4">📖</p>
          <p className="text-slate-500">Aucun cours disponible pour cet examen.</p>
          <p className="text-slate-400 text-sm mt-2">Ajoutez du contenu via la section « Ajouter ».</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost">
          ← Retour
        </button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <h1 className="text-lg font-semibold text-slate-800">Cours</h1>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Sidebar: course list */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            <div className="p-3 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {courses.length} cours disponible{courses.length > 1 ? 's' : ''}
              </p>
            </div>
            <nav className="divide-y divide-slate-100">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-4 text-sm transition-colors ${
                    selectedCourse?.id === course.id
                      ? `bg-blue-50 ${exam.textColorClass} font-medium`
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">📄</span>
                    <span>{course.title}</span>
                  </div>
                  {course.isCustom && (
                    <span className="ml-6 text-xs text-amber-600">✎ Personnalisé</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main: course content */}
        <div className="lg:col-span-3">
          {selectedCourse ? (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedCourse.title}</h2>
              {selectedCourse.isCustom && (
                <span className="badge bg-amber-100 text-amber-700 mb-4">Contenu personnalisé</span>
              )}
              <div className="mt-6 space-y-6">
                {selectedCourse.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className={`text-base font-semibold mb-3 pb-2 border-b border-slate-100 ${exam.textColorClass}`}>
                      {section.heading}
                    </h3>
                    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-slate-400">Sélectionnez un cours dans la liste.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
