import type { Exam, ExamId, NavTab } from '../types';

export const exams: Exam[] = [
  {
    id: 'cif-cgp',
    label: 'CIF / CGP',
    shortLabel: 'CIF/CGP',
    colorClass: 'bg-blue-600',
    textColorClass: 'text-blue-600',
    borderColorClass: 'border-blue-600',
    badgeClass: 'bg-blue-100 text-blue-700',
    description: 'Conseiller en Investissement Financier / Conseil en Gestion de Patrimoine',
    navTab: 'cif-cgp',
  },
  {
    id: 'amf-generaliste',
    label: 'AMF Généraliste',
    shortLabel: 'AMF Gén.',
    colorClass: 'bg-indigo-600',
    textColorClass: 'text-indigo-600',
    borderColorClass: 'border-indigo-600',
    badgeClass: 'bg-indigo-100 text-indigo-700',
    description: 'Certification AMF – Marchés financiers, instruments et réglementation',
    navTab: 'amf',
  },
  {
    id: 'amf-finance-durable',
    label: 'AMF Finance Durable',
    shortLabel: 'AMF Durable',
    colorClass: 'bg-emerald-600',
    textColorClass: 'text-emerald-600',
    borderColorClass: 'border-emerald-600',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    description: 'Certification AMF – ESG, investissement responsable et finance durable',
    navTab: 'amf',
  },
  {
    id: 'iobsp-niveau-1',
    label: 'IOBSP Niveau 1',
    shortLabel: 'IOBSP N1',
    colorClass: 'bg-orange-600',
    textColorClass: 'text-orange-600',
    borderColorClass: 'border-orange-600',
    badgeClass: 'bg-orange-100 text-orange-700',
    description: 'Intermédiaire en Opérations de Banque et Services de Paiement – Niveau 1',
    navTab: 'iobsp-niveau-1',
  },
  {
    id: 'ias-niveau-1',
    label: 'IAS Niveau 1 / COA',
    shortLabel: 'IAS N1',
    colorClass: 'bg-purple-600',
    textColorClass: 'text-purple-600',
    borderColorClass: 'border-purple-600',
    badgeClass: 'bg-purple-100 text-purple-700',
    description: "Intermédiaire en Assurance – Niveau 1 / Carte d'Objectifs et d'Aptitude",
    navTab: 'ias-niveau-1',
  },
];

export const getExamById = (id: ExamId): Exam | undefined =>
  exams.find((e) => e.id === id);

export const getExamsByNav = (navTab: NavTab): Exam[] =>
  exams.filter((e) => e.navTab === navTab);

export const amfExams: ExamId[] = ['amf-generaliste', 'amf-finance-durable'];
