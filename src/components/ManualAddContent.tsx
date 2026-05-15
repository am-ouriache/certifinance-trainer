import { useState } from 'react';
import type { Question, Flashcard, Course, ExamId, Difficulty } from '../types';
import { exams } from '../data/exams';

type ContentType = 'question' | 'flashcard' | 'course';

interface ManualAddContentProps {
  onAddQuestion: (q: Question) => void;
  onAddFlashcard: (f: Flashcard) => void;
  onAddCourse: (c: Course) => void;
}

// ─── Explicit form state interfaces ──────────────────────────────────────────

interface ManualQuestionForm {
  examId: ExamId;
  theme: string;
  difficulty: Difficulty;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  correctAnswerIndex: 0 | 1 | 2;
  explanation: string;
  explA: string;
  explB: string;
  explC: string;
  sourceLabel: string;
  sourceUrl: string;
}

interface ManualFlashcardForm {
  examId: ExamId;
  theme: string;
  title: string;
  keyPoints: string;
}

interface ManualCourseForm {
  examId: ExamId;
  title: string;
  sectionHeading: string;
  sectionContent: string;
}

// ─── Empty defaults (typed via the interfaces above) ─────────────────────────

const EMPTY_QUESTION: ManualQuestionForm = {
  examId: 'cif-cgp',
  theme: '',
  difficulty: 'moyen',
  question: '',
  choiceA: '',
  choiceB: '',
  choiceC: '',
  correctAnswerIndex: 0,
  explanation: '',
  explA: '',
  explB: '',
  explC: '',
  sourceLabel: '',
  sourceUrl: '',
};

const EMPTY_FLASHCARD: ManualFlashcardForm = {
  examId: 'cif-cgp',
  theme: '',
  title: '',
  keyPoints: '',
};

const EMPTY_COURSE: ManualCourseForm = {
  examId: 'cif-cgp',
  title: '',
  sectionHeading: '',
  sectionContent: '',
};

export default function ManualAddContent({ onAddQuestion, onAddFlashcard, onAddCourse }: ManualAddContentProps) {
  const [activeType, setActiveType] = useState<ContentType>('question');
  const [success, setSuccess] = useState<string | null>(null);

  const [qForm, setQForm] = useState({ ...EMPTY_QUESTION });
  const [fcForm, setFcForm] = useState({ ...EMPTY_FLASHCARD });
  const [courseForm, setCourseForm] = useState({ ...EMPTY_COURSE });

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddQuestion = () => {
    if (!qForm.question || !qForm.choiceA || !qForm.choiceB || !qForm.choiceC || !qForm.explanation || !qForm.theme || !qForm.sourceLabel) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    const exam = exams.find((e) => e.id === qForm.examId)!;
    const q: Question = {
      id: `custom-q-${Date.now()}`,
      examId: qForm.examId,
      examLabel: exam.label,
      theme: qForm.theme,
      difficulty: qForm.difficulty,
      question: qForm.question,
      choices: [qForm.choiceA, qForm.choiceB, qForm.choiceC],
      correctAnswerIndex: qForm.correctAnswerIndex,
      explanation: qForm.explanation,
      wrongExplanations: [qForm.explA || '–', qForm.explB || '–', qForm.explC || '–'],
      sourceLabel: qForm.sourceLabel,
      sourceUrl: qForm.sourceUrl || undefined,
      isCustom: true,
    };
    onAddQuestion(q);
    setQForm({ ...EMPTY_QUESTION });
    showSuccess('Question ajoutée avec succès !');
  };

  const handleAddFlashcard = () => {
    if (!fcForm.theme || !fcForm.title || !fcForm.keyPoints) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const fc: Flashcard = {
      id: `custom-fc-${Date.now()}`,
      examId: fcForm.examId,
      theme: fcForm.theme,
      title: fcForm.title,
      keyPoints: fcForm.keyPoints.split('\n').map((s) => s.trim()).filter(Boolean),
      isCustom: true,
    };
    onAddFlashcard(fc);
    setFcForm({ ...EMPTY_FLASHCARD });
    showSuccess('Fiche ajoutée avec succès !');
  };

  const handleAddCourse = () => {
    if (!courseForm.title || !courseForm.sectionHeading || !courseForm.sectionContent) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const course: Course = {
      id: `custom-c-${Date.now()}`,
      examId: courseForm.examId,
      title: courseForm.title,
      sections: [{ heading: courseForm.sectionHeading, content: courseForm.sectionContent }],
      isCustom: true,
    };
    onAddCourse(course);
    setCourseForm({ ...EMPTY_COURSE });
    showSuccess('Cours ajouté avec succès !');
  };

  const examSelect = (
    value: ExamId,
    onChange: (v: ExamId) => void,
  ) => (
    <div>
      <label className="label">Examen *</label>
      <select className="select" value={value} onChange={(e) => onChange(e.target.value as ExamId)}>
        {exams.map((e) => (
          <option key={e.id} value={e.id}>{e.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Ajouter du contenu</h1>
        <p className="text-slate-500 text-sm mt-1">
          Enrichissez la base de données avec vos propres questions, fiches et cours.
        </p>
      </div>

      {/* Success toast */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✅ {success}
        </div>
      )}

      {/* Type selector */}
      <div className="flex gap-2">
        {(['question', 'flashcard', 'course'] as ContentType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeType === type ? 'bg-blue-600 text-white' : 'btn-secondary'
            }`}
          >
            {type === 'question' ? '❓ Question QCM' : type === 'flashcard' ? '🗂️ Fiche mémo' : '📖 Cours'}
          </button>
        ))}
      </div>

      {/* ─── Question form ──────────────────────────────────────────────────────── */}
      {activeType === 'question' && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Nouvelle question QCM</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {examSelect(qForm.examId, (v) => setQForm((f) => ({ ...f, examId: v })))}
            <div>
              <label className="label">Thème *</label>
              <input className="input" placeholder="ex: Réglementation" value={qForm.theme} onChange={(e) => setQForm((f) => ({ ...f, theme: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="label">Difficulté</label>
            <select className="select" value={qForm.difficulty} onChange={(e) => setQForm((f) => ({ ...f, difficulty: e.target.value as 'facile' | 'moyen' | 'difficile' }))}>
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
          </div>

          <div>
            <label className="label">Question *</label>
            <textarea className="textarea" rows={3} placeholder="Saisissez la question..." value={qForm.question} onChange={(e) => setQForm((f) => ({ ...f, question: e.target.value }))} />
          </div>

          <div className="space-y-3">
            {(['choiceA', 'choiceB', 'choiceC'] as const).map((field, idx) => (
              <div key={field}>
                <label className="label">
                  Choix {String.fromCharCode(65 + idx)} *
                  {qForm.correctAnswerIndex === idx && (
                    <span className="ml-2 text-emerald-600 text-xs">✓ Bonne réponse</span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input className="input flex-1" placeholder={`Choix ${String.fromCharCode(65 + idx)}`} value={qForm[field]} onChange={(e) => setQForm((f) => ({ ...f, [field]: e.target.value }))} />
                  <button
                    onClick={() => setQForm((f) => ({ ...f, correctAnswerIndex: idx as 0 | 1 | 2 }))}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      qForm.correctAnswerIndex === idx ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-300 text-slate-600 hover:border-emerald-400'
                    }`}
                  >
                    ✓ Correcte
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="label">Explication générale *</label>
            <textarea className="textarea" rows={3} placeholder="Expliquez pourquoi la bonne réponse est correcte..." value={qForm.explanation} onChange={(e) => setQForm((f) => ({ ...f, explanation: e.target.value }))} />
          </div>

          <div className="space-y-3">
            {(['explA', 'explB', 'explC'] as const).map((field, idx) => (
              <div key={field}>
                <label className="label">Explication choix {String.fromCharCode(65 + idx)}</label>
                <input className="input" placeholder={`Pourquoi le choix ${String.fromCharCode(65 + idx)} est-il juste/faux ?`} value={qForm[field]} onChange={(e) => setQForm((f) => ({ ...f, [field]: e.target.value }))} />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Source *</label>
              <input className="input" placeholder="ex: CMF art. L. 621-1" value={qForm.sourceLabel} onChange={(e) => setQForm((f) => ({ ...f, sourceLabel: e.target.value }))} />
            </div>
            <div>
              <label className="label">URL source (optionnel)</label>
              <input className="input" placeholder="https://..." value={qForm.sourceUrl} onChange={(e) => setQForm((f) => ({ ...f, sourceUrl: e.target.value }))} />
            </div>
          </div>

          <button onClick={handleAddQuestion} className="btn-primary">
            ＋ Ajouter la question
          </button>
        </div>
      )}

      {/* ─── Flashcard form ─────────────────────────────────────────────────────── */}
      {activeType === 'flashcard' && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Nouvelle fiche mémo</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {examSelect(fcForm.examId, (v) => setFcForm((f) => ({ ...f, examId: v })))}
            <div>
              <label className="label">Thème *</label>
              <input className="input" placeholder="ex: Fiscalité" value={fcForm.theme} onChange={(e) => setFcForm((f) => ({ ...f, theme: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="label">Titre de la fiche *</label>
            <input className="input" placeholder="ex: Les régimes matrimoniaux" value={fcForm.title} onChange={(e) => setFcForm((f) => ({ ...f, title: e.target.value }))} />
          </div>

          <div>
            <label className="label">Points clés * <span className="text-slate-400 font-normal">(un point par ligne)</span></label>
            <textarea className="textarea" rows={8} placeholder={"Point clé 1\nPoint clé 2\nPoint clé 3..."} value={fcForm.keyPoints} onChange={(e) => setFcForm((f) => ({ ...f, keyPoints: e.target.value }))} />
          </div>

          <button onClick={handleAddFlashcard} className="btn-primary">
            ＋ Ajouter la fiche
          </button>
        </div>
      )}

      {/* ─── Course form ────────────────────────────────────────────────────────── */}
      {activeType === 'course' && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">Nouveau cours court</h2>
          <p className="text-xs text-slate-400">Vous pourrez ajouter d'autres sections en créant un nouveau cours du même nom.</p>

          {examSelect(courseForm.examId, (v) => setCourseForm((f) => ({ ...f, examId: v })))}

          <div>
            <label className="label">Titre du cours *</label>
            <input className="input" placeholder="ex: La fiscalité de l'assurance-vie" value={courseForm.title} onChange={(e) => setCourseForm((f) => ({ ...f, title: e.target.value }))} />
          </div>

          <div>
            <label className="label">Titre de la section *</label>
            <input className="input" placeholder="ex: Les avantages fiscaux" value={courseForm.sectionHeading} onChange={(e) => setCourseForm((f) => ({ ...f, sectionHeading: e.target.value }))} />
          </div>

          <div>
            <label className="label">Contenu de la section *</label>
            <textarea className="textarea" rows={10} placeholder="Rédigez le contenu pédagogique..." value={courseForm.sectionContent} onChange={(e) => setCourseForm((f) => ({ ...f, sectionContent: e.target.value }))} />
          </div>

          <button onClick={handleAddCourse} className="btn-primary">
            ＋ Ajouter le cours
          </button>
        </div>
      )}
    </div>
  );
}
