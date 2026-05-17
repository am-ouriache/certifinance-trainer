import type { Flashcard } from '../types';

// ─── CIF/CGP — via module src/data/cif/ ──────────────────────────────────────
import { cifFlashcards } from './cif';
// ─────────────────────────────────────────────────────────────────────────────

export const builtInFlashcards: Flashcard[] = [
  // ── CIF / CGP ──────────────────────────────────────────────────────────────
  ...cifFlashcards,     // modules thématiques → src/data/cif/
  // ─── CIF / CGP — flashcards inline d'exemple ────────────────────────────────
  {
    id: 'fc-cif-001',
    examId: 'cif-cgp',
    theme: 'Réglementation',
    title: 'Obligations du CIF envers ses clients',
    keyPoints: [
      "Convention écrite (lettre de mission) OBLIGATOIRE avant tout conseil",
      "Bilan patrimonial et profil investisseur (connaissance, expérience, situation financière, objectifs, risque)",
      "Devoir d'adéquation : recommandation cohérente avec le profil du client (MIF 2)",
      "Information sur les conflits d'intérêts et la rémunération",
      "Obligation d'immatriculation auprès d'une association professionnelle agréée AMF (ANACOFI, CNCIF…)",
      "Assurance responsabilité civile professionnelle obligatoire",
    ],
  },
  {
    id: 'fc-cif-002',
    examId: 'cif-cgp',
    theme: 'Fiscalité',
    title: "PEA – Plan d'Épargne en Actions",
    keyPoints: [
      "PEA classique : plafond de versements 150 000 € (depuis loi PACTE 2019)",
      "PEA-PME : plafond 225 000 € (cumul PEA + PEA-PME plafonné à 225 000 €)",
      "PEA Jeune (18-25 ans rattachés au foyer fiscal) : plafond 20 000 €",
      "Exonération d'impôt sur les plus-values après 5 ans de détention (hors prélèvements sociaux 17,2 %)",
      "Tout retrait avant 5 ans entraîne la clôture du plan",
      "Eligible : actions européennes (UE/EEE), certains OPCVM, titres PME-ETI",
    ],
  },
  {
    id: 'fc-cif-003',
    examId: 'cif-cgp',
    theme: 'Gestion patrimoniale',
    title: 'Catégorisation clients MIF 2',
    keyPoints: [
      "3 catégories : Client de détail | Client professionnel | Contrepartie éligible",
      "Client de détail : protection maximale, test d'adéquation obligatoire",
      "Client professionnel par nature : banques, assureurs, grandes entreprises (3 critères quantitatifs)",
      "Client professionnel sur option : particulier ou PME demandant ce statut (2 critères sur 3 requis)",
      "Contrepartie éligible : protection minimale, pour transactions entre professionnels de marché",
      "Reclassement possible : de professionnel vers détail (opt-in), de détail vers professionnel (opt-out)",
    ],
  },
  // ─── AMF Généraliste ────────────────────────────────────────────────────────
  {
    id: 'fc-amf-gen-001',
    examId: 'amf-generaliste',
    theme: 'Régulation',
    title: "Les missions de l'AMF",
    keyPoints: [
      "Réguler les marchés financiers français",
      "Protéger l'épargne investie en produits financiers",
      "Veiller à l'information des investisseurs",
      "Approuver les prospectus d'offres publiques (> 8 M€)",
      "Agréer les sociétés de gestion d'actifs",
      "Sanctionner les abus de marché (délit d'initié, manipulation de cours)",
      "Partenaire de l'ESMA (European Securities and Markets Authority) au niveau européen",
    ],
  },
  {
    id: 'fc-amf-gen-002',
    examId: 'amf-generaliste',
    theme: 'Abus de marché',
    title: 'Les abus de marché (règlement MAR)',
    keyPoints: [
      "Délit d'initié (insider trading) : opération sur un instrument financier sur la base d'une information privilégiée",
      "Information privilégiée : précise, non publique, susceptible d'influencer le cours",
      "Manipulation de cours : opération ou ordre donnant une image fausse de l'offre/demande/prix",
      "Recommandation illicite : conseil fondé sur une information privilégiée",
      "Règlement MAR (596/2014) : cadre européen unifié depuis juillet 2016",
      "Sanctions : jusqu'à 15 ans d'emprisonnement et 100 M€ d'amende en France",
    ],
  },
  {
    id: 'fc-amf-gen-003',
    examId: 'amf-generaliste',
    theme: 'Instruments financiers',
    title: 'Classification des instruments financiers (MIF 2)',
    keyPoints: [
      "Valeurs mobilières : actions, obligations, titres donnant accès au capital",
      "Instruments du marché monétaire : maturité ≤ 1 an (BTF, billets de trésorerie)",
      "Parts ou actions d'organismes de placement collectif (OPCVM, FIA)",
      "Instruments dérivés : options, futures, swaps, warrants, CFD",
      "Quotas d'émission (EUA – European Union Allowances)",
      "Titres structurés (notes, certificates)",
    ],
  },
  // ─── AMF Finance Durable ────────────────────────────────────────────────────
  {
    id: 'fc-amf-dur-001',
    examId: 'amf-finance-durable',
    theme: 'SFDR',
    title: 'Classification SFDR des produits financiers',
    keyPoints: [
      "Article 6 : produit sans objectif ni promotion ESG – divulgation des risques de durabilité si pertinents",
      "Article 8 (vert clair) : produit qui PROMEUT des caractéristiques E ou S, sans objectif d'investissement durable principal",
      "Article 9 (vert foncé) : produit dont l'investissement durable est l'OBJECTIF PRINCIPAL",
      "Principe DNSH (Do No Significant Harm) : obligatoire pour Art. 9, recommandé pour Art. 8",
      "PAI (Principal Adverse Impacts) : indicateurs d'impacts négatifs sur facteurs de durabilité",
      "Publication d'un rapport périodique sur l'atteinte des caractéristiques/objectifs ESG",
    ],
  },
  {
    id: 'fc-amf-dur-002',
    examId: 'amf-finance-durable',
    theme: 'Taxonomie',
    title: 'La taxonomie européenne (règlement 2020/852)',
    keyPoints: [
      "6 objectifs environnementaux : (1) atténuation climatique, (2) adaptation climatique, (3) eau, (4) économie circulaire, (5) pollution, (6) biodiversité",
      "4 conditions pour être « durable » : contribuer à ≥1 objectif + DNSH + garanties sociales minimales + critères techniques (TSC)",
      "TSC : Technical Screening Criteria – seuils de performance par activité et objectif",
      "Alignement taxonomique : % du CA/dépenses d'une entreprise classé comme « vert »",
      "Ne couvre que le volet environnemental (pas de taxonomie sociale à ce jour)",
      "Actes délégués en cours pour activités gazières et nucléaires (taxonomie complémentaire)",
    ],
  },
  {
    id: 'fc-amf-dur-003',
    examId: 'amf-finance-durable',
    theme: 'Stratégies ISR',
    title: "Les grandes stratégies d'investissement responsable",
    keyPoints: [
      "Best-in-class : sélection des meilleures entreprises ESG par secteur sans exclusion sectorielle",
      "Best-in-universe : sélection des meilleures entreprises ESG tous secteurs confondus",
      "Exclusions normatives : exclusion basée sur des normes (Pacte mondial ONU, conventions d'Oslo/Ottawa…)",
      "Exclusions sectorielles : exclusion de secteurs entiers (charbon, armement, tabac, jeux d'argent…)",
      "Intégration ESG : prise en compte des facteurs ESG dans l'analyse financière classique",
      "Engagement actionnarial : dialogue actif avec les entreprises, vote en AG",
      "Investissement à impact : recherche d'un impact social/environnemental mesurable",
      "ISR thématique : investissement dans des thèmes durables (eau, énergie, diversité…)",
    ],
  },
  // ─── IOBSP ──────────────────────────────────────────────────────────────────
  {
    id: 'fc-iobsp-001',
    examId: 'iobsp-niveau-1',
    theme: 'Réglementation',
    title: "Les catégories d'IOBSP",
    keyPoints: [
      "Courtier : indépendant, immatriculé ORIAS, peut comparer les offres de plusieurs banques",
      "Mandataire exclusif : agit pour le compte d'un seul établissement de crédit",
      "Mandataire non exclusif : agit pour plusieurs établissements, mais sous mandat",
      "Mandataire d'intermédiaire : mandaté par un courtier ou mandataire",
      "Obligation d'immatriculation à l'ORIAS (Organisme pour le Registre des Intermédiaires en Assurance)",
      "Assurance responsabilité civile professionnelle obligatoire",
      "Capacité professionnelle : diplôme niveau Bac+2 ou expérience professionnelle validée",
    ],
  },
  {
    id: 'fc-iobsp-002',
    examId: 'iobsp-niveau-1',
    theme: 'Crédit immobilier',
    title: "Protection de l'emprunteur immobilier",
    keyPoints: [
      "FISE : Fiche d'Information Standardisée Européenne – document précontractuel obligatoire",
      "Délai de réflexion : 10 jours minimum après réception de l'offre (l'emprunteur ne peut accepter avant le 11e jour)",
      "Durée de validité de l'offre : minimum 30 jours calendaires",
      "Taux d'usure : taux maximum légal fixé par la Banque de France chaque trimestre",
      "IRA (Indemnités de Remboursement Anticipé) : plafonnées à 6 mois d'intérêts ou 3 % du capital restant dû",
      "Loi Lemoine (2022) : résiliation infra-annuelle de l'assurance emprunteur à tout moment",
    ],
  },
  // ─── IAS ────────────────────────────────────────────────────────────────────
  {
    id: 'fc-ias-001',
    examId: 'ias-niveau-1',
    theme: 'DDA',
    title: 'Directive DDA – points clés',
    keyPoints: [
      "DDA = Directive sur la Distribution d'Assurance (2016/97/UE) – transposée en France en 2018",
      "S'applique à tous les distributeurs d'assurance (y compris les assureurs distribuant directement)",
      "Formation continue obligatoire : 15 heures par an minimum",
      "Devoir de conseil : analyser les besoins ET formuler une recommandation motivée",
      "IPID (Insurance Product Information Document) : document précontractuel standardisé pour les produits non-vie",
      "DIC (Document d'Information Clé) : pour les IBIP (produits d'assurance-vie liés à des investissements)",
      "Conflits d'intérêts : identification et gestion obligatoires, divulgation au client si non évitables",
    ],
  },
  {
    id: 'fc-ias-002',
    examId: 'ias-niveau-1',
    theme: "Produits d'assurance",
    title: 'Assurance-vie : types de contrats et supports',
    keyPoints: [
      "Monosupport euros : capital garanti, rendement faible, participation aux bénéfices",
      "Multisupport : fonds en euros (garanti) + unités de compte (UC, non garanties)",
      "Unités de compte : OPCVM, SCPI, EMTN, ETF – valeur fluctuante selon les marchés",
      "IBIP : produit d'assurance basé sur un investissement – soumis aux règles MIF 2 adaptées",
      "Avantages fiscaux : abattement de 4 600 € (9 200 € couple) sur PV après 8 ans, transmission hors succession",
      "Droit de rachat : à tout moment, total ou partiel (sauf contrats à terme)",
      "Clause bénéficiaire : désignation libre, déterminante pour l'optimisation successorale",
    ],
  },
];

export const getFlashcardsByExam = (examId: string, flashcards: Flashcard[]): Flashcard[] =>
  flashcards.filter((f) => f.examId === examId);

export const getThemesByExamFlashcards = (examId: string, flashcards: Flashcard[]): string[] =>
  [...new Set(flashcards.filter((f) => f.examId === examId).map((f) => f.theme))];
