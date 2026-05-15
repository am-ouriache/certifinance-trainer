import { useState } from 'react';
import { ArrowLeft, Layers, ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import type { Flashcard, Exam } from '../types';

interface FlashcardListProps {
  exam: Exam;
  flashcards: Flashcard[];
  onBack: () => void;
}

export default function FlashcardList({ exam, flashcards, onBack }: FlashcardListProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const themes = ['all', ...Array.from(new Set(flashcards.map((f) => f.theme)))];
  const filtered =
    selectedTheme === 'all' ? flashcards : flashcards.filter((f) => f.theme === selectedTheme);

  if (flashcards.length === 0) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="card p-16 text-center">
          <Layers className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Aucune fiche disponible pour cet examen.
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
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Fiches mémo</h1>
        <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
          {filtered.length} fiche{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Theme filter pills */}
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedTheme === theme
                ? `${exam.colorClass} text-white shadow-sm`
                : 'bg-white dark:bg-[#1c1c28] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2a2a40] hover:border-slate-300 dark:hover:border-slate-500'
            }`}
          >
            {theme === 'all' ? `Tous (${flashcards.length})` : theme}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card, i) => {
          const isOpen = expandedId === card.id;
          return (
            <div
              key={card.id}
              className="card overflow-hidden hover:shadow-md transition-all animate-slide-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {/* Card header — always visible */}
              <button
                onClick={() => setExpandedId(isOpen ? null : card.id)}
                className="w-full text-left p-5 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className={`badge ${exam.badgeClass} mb-2`}>{card.theme}</span>
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                      {card.title}
                    </h3>
                    {card.isCustom && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 dark:text-amber-400">
                        <Pencil className="w-3 h-3" /> Personnalisé
                      </div>
                    )}
                  </div>
                  <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors mt-0.5 ${isOpen ? `${exam.colorClass} text-white` : 'bg-slate-100 dark:bg-[#22223a] text-slate-500 dark:text-slate-400'}`}>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4" />
                      : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Preview: key point count when collapsed */}
                {!isOpen && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {card.keyPoints.length} point{card.keyPoints.length !== 1 ? 's' : ''} clé{card.keyPoints.length !== 1 ? 's' : ''}
                  </p>
                )}
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-slate-100 dark:border-[#22223a] px-5 pb-5 animate-slide-up">
                  <ul className="space-y-2.5 mt-4">
                    {card.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exam.colorClass} shrink-0`} />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm">Aucune fiche pour ce thème.</p>
        </div>
      )}
    </div>
  );
}
