import { useState } from 'react';
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
      <div className="space-y-4">
        <button onClick={onBack} className="btn-ghost">← Retour</button>
        <div className="card p-12 text-center">
          <p className="text-4xl mb-4">🗂️</p>
          <p className="text-slate-500">Aucune fiche disponible pour cet examen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="btn-ghost">← Retour</button>
        <span className={`badge ${exam.badgeClass}`}>{exam.shortLabel}</span>
        <h1 className="text-lg font-semibold text-slate-800">Fiches mémo</h1>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTheme === theme
                ? `${exam.colorClass} text-white`
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {theme === 'all' ? `Tous (${flashcards.length})` : theme}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card) => {
          const isOpen = expandedId === card.id;
          return (
            <div
              key={card.id}
              className="card overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandedId(isOpen ? null : card.id)}
                className="w-full text-left p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`badge ${exam.badgeClass} mb-2`}>{card.theme}</span>
                    <h3 className="text-sm font-semibold text-slate-800">{card.title}</h3>
                    {card.isCustom && (
                      <span className="text-xs text-amber-600 mt-1">✎ Personnalisé</span>
                    )}
                  </div>
                  <span className="text-slate-400 shrink-0 mt-1">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-5 pb-5">
                  <ul className="space-y-2 mt-3">
                    {card.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className={`mt-0.5 shrink-0 font-bold ${exam.textColorClass}`}>•</span>
                        <span>{point}</span>
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
        <div className="card p-8 text-center text-slate-400">
          Aucune fiche pour ce thème.
        </div>
      )}
    </div>
  );
}
