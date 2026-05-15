import type { Question } from '../types';
import { cifCgpQuestionsBlockA } from './cifCgpQuestionsBlockA';
// ─────────────────────────────────────────────────────────────────────────────
// CIF / CGP — 5 questions d'exemple
// ─────────────────────────────────────────────────────────────────────────────
const cifCgpQuestions: Question[] = [
  {
    id: 'cif-001',
    examId: 'cif-cgp',
    examLabel: 'CIF / CGP',
    theme: 'Réglementation',
    difficulty: 'moyen',
    question:
      "Selon la directive MIF 2, qu'est-ce qu'un « client professionnel » par nature ?",
    choices: [
      'Un particulier dont le patrimoine financier dépasse 500 000 €',
      "Un établissement de crédit, une entreprise d'investissement ou une compagnie d'assurance",
      'Toute personne morale employant plus de 250 salariés',
    ],
    correctAnswerIndex: 1,
    explanation:
      "MIF 2 (art. L. 533-16 CMF) classe comme « professionnels par nature » les entités financières réglementées (banques, sociétés d'investissement, assureurs…). Ils bénéficient d'un niveau de protection réduit car ils sont réputés disposer de l'expertise nécessaire.",
    wrongExplanations: [
      "Le seuil de 500 000 € ne suffit pas : il fait partie des critères pour qu'un professionnel « sur option » puisse demander à être traité comme professionnel, mais trois critères doivent être cumulés.",
      "Correct – ce sont les clients professionnels « par nature » selon l'annexe II de MIF 2.",
      "Le nombre de salariés est l'un des trois critères quantitatifs pour un traitement professionnel, mais il ne suffit pas seul et ne s'applique qu'aux professionnels sur option.",
    ],
    sourceLabel: 'Directive MIF 2 – Annexe II',
  },
  {
    id: 'cif-002',
    examId: 'cif-cgp',
    examLabel: 'CIF / CGP',
    theme: 'Déontologie',
    difficulty: 'facile',
    question:
      "Un CIF doit-il obligatoirement remettre un document d'entrée en relation à son client avant de formuler un conseil ?",
    choices: [
      'Non, ce document est optionnel si le conseil porte sur moins de 10 000 €',
      'Oui, il doit remettre une lettre de mission ou un document équivalent',
      'Non, une simple déclaration orale suffit si le client y consent',
    ],
    correctAnswerIndex: 1,
    explanation:
      "L'article L. 541-8-1 du CMF impose au CIF de conclure une convention écrite avec le client (lettre de mission) précisant la nature du conseil, les modalités de rémunération et les conflits d'intérêts éventuels. Ce document est obligatoire avant toute prestation.",
    wrongExplanations: [
      "Aucun seuil monétaire n'exonère le CIF de son obligation documentaire : la convention est requise quelle que soit la valeur du dossier.",
      'Correct – la lettre de mission est obligatoire avant tout conseil.',
      "La déclaration orale n'est jamais suffisante : la réglementation exige la forme écrite pour garantir la traçabilité et la protection du client.",
    ],
    sourceLabel: 'CMF art. L. 541-8-1 / Règlement général AMF',
  },
  {
    id: 'cif-003',
    examId: 'cif-cgp',
    examLabel: 'CIF / CGP',
    theme: 'Fiscalité patrimoniale',
    difficulty: 'moyen',
    question:
      "Dans le cadre d'un Plan d'Épargne en Actions (PEA), quel est le plafond de versement pour un PEA classique en 2024 ?",
    choices: ['75 000 €', '150 000 €', '225 000 €'],
    correctAnswerIndex: 1,
    explanation:
      "Le plafond de versements du PEA classique est fixé à 150 000 € (art. L. 221-30 CMF). Ce plafond est distinct de celui du PEA-PME (225 000 €) et du PEA Jeune (20 000 €). Le cumul PEA + PEA-PME ne peut pas dépasser 225 000 €.",
    wrongExplanations: [
      "75 000 € correspond à l'ancien plafond du PEA avant la loi PACTE de 2019. Depuis mai 2019, il est porté à 150 000 €.",
      'Correct – 150 000 € est le plafond du PEA classique.',
      "225 000 € est le plafond du PEA-PME. Le cumul PEA + PEA-PME est plafonné à 225 000 €, mais le PEA seul est limité à 150 000 €.",
    ],
    sourceLabel: 'CMF art. L. 221-30 – Loi PACTE 2019',
  },
  {
    id: 'cif-004',
    examId: 'cif-cgp',
    examLabel: 'CIF / CGP',
    theme: 'Gestion de patrimoine',
    difficulty: 'difficile',
    question:
      "Dans quelle situation le régime matrimonial de la séparation de biens est-il particulièrement recommandé par un CGP ?",
    choices: [
      "Lorsque l'un des époux est entrepreneur individuel exposé à des risques professionnels significatifs",
      'Lorsque les époux souhaitent maximiser les droits de succession du conjoint survivant',
      "Lorsque les époux veulent simplifier l'administration de leurs biens communs",
    ],
    correctAnswerIndex: 0,
    explanation:
      "La séparation de biens protège le patrimoine du conjoint non-commerçant en cas de faillite ou de mise en cause professionnelle de l'entrepreneur. Les créanciers professionnels ne peuvent pas saisir les biens propres du conjoint. C'est la principale raison patrimoniale de choisir ce régime.",
    wrongExplanations: [
      "Correct – la protection du conjoint face aux risques professionnels est la raison principale de choisir la séparation de biens.",
      "Pour maximiser les droits successoraux du conjoint, la communauté universelle avec clause d'attribution intégrale est bien plus efficace que la séparation de biens.",
      "La communauté légale facilite l'administration des biens acquis ensemble ; la séparation de biens est au contraire plus complexe (gestion de comptes distincts, quotes-parts à documenter).",
    ],
    sourceLabel: 'Code civil – Régimes matrimoniaux',
  },
  {
    id: 'cif-005',
    examId: 'cif-cgp',
    examLabel: 'CIF / CGP',
    theme: 'Produits financiers',
    difficulty: 'moyen',
    question:
      "Qu'est-ce qu'un OPCVM « actions européennes » classifié selon le règlement SFDR comme « article 8 » ?",
    choices: [
      "Un fonds qui investit exclusivement dans des entreprises labellisées « ISR » par l'État français",
      "Un fonds qui promeut des caractéristiques environnementales ou sociales, sans avoir un objectif d'investissement durable comme objectif principal",
      "Un fonds dont l'objectif principal est l'investissement durable et dont l'indice de référence est aligné sur l'Accord de Paris",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Selon le règlement SFDR (Sustainable Finance Disclosure Regulation), l'article 8 désigne les produits financiers qui « promeuvent » des caractéristiques E ou S sans que l'investissement durable soit l'objectif principal. L'article 9 (fonds verts foncés) vise les fonds dont l'objectif est l'investissement durable.",
    wrongExplanations: [
      "Le label ISR est un label français facultatif, distinct de la classification SFDR européenne. Un fonds Article 8 n'est pas nécessairement labellisé ISR et vice-versa.",
      "Correct – article 8 SFDR : promotion de caractéristiques ESG sans investissement durable comme objectif principal.",
      "Un fonds aligné sur l'Accord de Paris avec investissement durable comme objectif principal relève de l'article 9 SFDR (fonds dit « vert foncé »), pas de l'article 8.",
    ],
    sourceLabel: 'Règlement SFDR (UE) 2019/2088',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AMF Généraliste — 5 questions d'exemple
// ─────────────────────────────────────────────────────────────────────────────
const amfGeneralisteQuestions: Question[] = [
  {
    id: 'amf-gen-001',
    examId: 'amf-generaliste',
    examLabel: 'AMF Généraliste',
    theme: 'Marchés financiers',
    difficulty: 'facile',
    question: "Quel est le rôle principal de l'Autorité des Marchés Financiers (AMF) ?",
    choices: [
      'Fixer les taux directeurs et contrôler la politique monétaire en France',
      "Réguler et surveiller les marchés financiers, protéger l'épargne investie en produits financiers",
      'Gérer les réserves de change de la France et superviser les banques commerciales',
    ],
    correctAnswerIndex: 1,
    explanation:
      "L'AMF est l'autorité de régulation des marchés financiers français. Elle protège l'épargne investie en produits financiers, veille à l'information des investisseurs et supervise le bon fonctionnement des marchés (art. L. 621-1 CMF). La politique monétaire relève de la BCE, la supervision bancaire de l'ACPR.",
    wrongExplanations: [
      "Les taux directeurs sont fixés par la BCE (Banque Centrale Européenne). La Banque de France met en œuvre la politique monétaire mais ne la fixe pas seule.",
      "Correct – c'est la mission fondamentale de l'AMF.",
      "Les réserves de change et la supervision des banques relèvent de la Banque de France et de l'ACPR (Autorité de Contrôle Prudentiel et de Résolution), pas de l'AMF.",
    ],
    sourceLabel: 'CMF art. L. 621-1 / Site AMF',
  },
  {
    id: 'amf-gen-002',
    examId: 'amf-generaliste',
    examLabel: 'AMF Généraliste',
    theme: 'Instruments financiers',
    difficulty: 'moyen',
    question:
      "Parmi les instruments suivants, lequel est un instrument du marché monétaire ?",
    choices: [
      'Un bon du Trésor à 3 mois',
      "Une obligation d'État à 10 ans",
      'Une action cotée sur Euronext Paris',
    ],
    correctAnswerIndex: 0,
    explanation:
      "Les instruments du marché monétaire ont une maturité inférieure ou égale à un an. Les bons du Trésor à court terme (BTF) sont l'instrument de référence de ce marché. Les obligations à 10 ans relèvent du marché obligataire long terme, et les actions du marché des capitaux propres.",
    wrongExplanations: [
      "Correct – les bons du Trésor à court terme sont l'instrument classique du marché monétaire.",
      "Une obligation à 10 ans est un instrument du marché obligataire à long terme, pas du marché monétaire (dont les maturités sont ≤ 1 an).",
      "Une action est un titre de capital donnant droit à la propriété d'une fraction d'une entreprise ; elle appartient au marché des capitaux propres (equity market).",
    ],
    sourceLabel: 'MIF 2 – Directive 2014/65/UE – Annexe I',
  },
  {
    id: 'amf-gen-003',
    examId: 'amf-generaliste',
    examLabel: 'AMF Généraliste',
    theme: 'Réglementation',
    difficulty: 'moyen',
    question:
      "Qu'est-ce que le « prospectus » d'une offre au public de titres financiers ?",
    choices: [
      'Le rapport annuel de la société qui rend compte de son activité passée',
      "Le document d'information officiel visé par l'AMF, obligatoire pour toute offre publique supérieure à 8 M€",
      "La note de synthèse émise par un analyste financier pour recommander l'achat d'un titre",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Le prospectus est le document d'information standardisé régi par le règlement Prospectus (UE) 2017/1129. Il est obligatoire pour les offres publiques dépassant 8 millions d'euros et doit être approuvé (visé) par l'AMF avant publication. Il contient toutes les informations nécessaires à la décision d'investissement.",
    wrongExplanations: [
      "Le rapport annuel (rapport de gestion) est un document comptable et stratégique publié après clôture de l'exercice. Il ne constitue pas un prospectus.",
      "Correct – le prospectus est le document réglementaire obligatoire visé par l'AMF pour les offres publiques.",
      "La note d'analyste est un document de recherche fourni par des établissements financiers ; elle n'est pas visée par l'AMF et ne se substitue pas au prospectus.",
    ],
    sourceLabel: 'Règlement Prospectus (UE) 2017/1129',
  },
  {
    id: 'amf-gen-004',
    examId: 'amf-generaliste',
    examLabel: 'AMF Généraliste',
    theme: 'Abus de marché',
    difficulty: 'difficile',
    question:
      "Un analyste financier achète des actions d'une société la veille de la publication d'un résultat exceptionnel qu'il a découvert lors d'une réunion confidentielle avec la direction. Quel délit commet-il ?",
    choices: [
      'Manipulation de cours',
      "Délit d'initié (opération sur information privilégiée)",
      'Démarchage non autorisé',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Le délit d'initié consiste à utiliser une information privilégiée (précise, non publique, susceptible d'influencer le cours) pour réaliser une opération sur un instrument financier. L'analyste détient une information privilégiée obtenue lors d'un accès confidentiel ; son achat avant publication constitue bien un délit d'initié (art. 8 du règlement MAR n° 596/2014).",
    wrongExplanations: [
      "La manipulation de cours vise à donner une image fausse ou artificielle de l'offre, de la demande ou du prix d'un instrument financier. Ici, l'analyste n'agit pas sur le cours lui-même mais exploite une information.",
      "Correct – utilisation d'une information privilégiée = délit d'initié (MAR art. 8).",
      "Le démarchage non autorisé concerne la sollicitation de clients sans habilitation réglementaire. Il ne s'applique pas ici.",
    ],
    sourceLabel: 'Règlement MAR (UE) n° 596/2014 – art. 8',
  },
  {
    id: 'amf-gen-005',
    examId: 'amf-generaliste',
    examLabel: 'AMF Généraliste',
    theme: 'Gestion collective',
    difficulty: 'moyen',
    question:
      "Quelle est la différence principale entre un OPCVM (UCITS) et un FIA (Fonds d'Investissement Alternatif) ?",
    choices: [
      "Un OPCVM est réservé aux investisseurs professionnels, un FIA est accessible au grand public",
      "Un OPCVM respecte des règles strictes de diversification et de liquidité accessibles aux investisseurs de détail ; un FIA a une réglementation plus souple et cible souvent des investisseurs avertis",
      'Un OPCVM est un fonds obligataire, un FIA est un fonds actions',
    ],
    correctAnswerIndex: 1,
    explanation:
      "La directive UCITS harmonise les règles des fonds accessibles aux investisseurs de détail dans l'UE (diversification, liquidité quotidienne, dépositaire…). Les FIA (directive AIFM) sont des fonds alternatifs moins contraints (capital-investissement, immobilier, hedge funds…), principalement destinés à des professionnels ou clients avertis.",
    wrongExplanations: [
      "C'est l'inverse : les OPCVM (UCITS) sont accessibles au grand public ; les FIA sont souvent réservés aux professionnels ou investisseurs avertis.",
      "Correct – UCITS = fonds retail réglementé ; FIA = fonds alternatif avec réglementation plus souple.",
      "La classification OPCVM/FIA est indépendante de la nature des actifs investis (actions, obligations, immobilier…). Les deux peuvent investir dans des actions ou des obligations.",
    ],
    sourceLabel: 'Directive UCITS IV / Directive AIFM 2011/61/UE',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AMF Finance Durable — 5 questions d'exemple
// ─────────────────────────────────────────────────────────────────────────────
const amfFinanceDurableQuestions: Question[] = [
  {
    id: 'amf-dur-001',
    examId: 'amf-finance-durable',
    examLabel: 'AMF Finance Durable',
    theme: 'Critères ESG',
    difficulty: 'facile',
    question: "Que signifie l'acronyme ESG en finance durable ?",
    choices: [
      'Économique, Social, Géopolitique',
      'Environnemental, Social, Gouvernance',
      'Éthique, Solidarité, Gestion',
    ],
    correctAnswerIndex: 1,
    explanation:
      "ESG signifie Environnemental (impact sur le climat, biodiversité, ressources), Social (conditions de travail, droits humains, diversité) et Gouvernance (composition du conseil, transparence, lutte anti-corruption). Ces trois piliers permettent d'évaluer le comportement non financier d'une entreprise.",
    wrongExplanations: [
      "Économique, Social, Géopolitique n'est pas la signification de ESG. La dimension géopolitique n'est pas un pilier ESG au sens financier.",
      "Correct – Environnemental, Social, Gouvernance.",
      "Éthique, Solidarité, Gestion n'est pas la définition retenue par les instances réglementaires et professionnelles internationales.",
    ],
    sourceLabel: "AMF / Plan d'action finance durable UE",
  },
  {
    id: 'amf-dur-002',
    examId: 'amf-finance-durable',
    examLabel: 'AMF Finance Durable',
    theme: 'SFDR',
    difficulty: 'moyen',
    question:
      "Selon le règlement SFDR, un fonds dit « Article 9 » doit obligatoirement :",
    choices: [
      "Afficher un label ISR délivré par un organisme accrédité par l'État français",
      "Avoir l'investissement durable comme objectif principal et mesurer son impact",
      "Publier un rapport extra-financier annuel d'au moins 50 pages",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Un fonds Article 9 SFDR (dit « vert foncé ») a l'investissement durable comme objectif principal. Il doit démontrer comment ses investissements contribuent à des objectifs environnementaux ou sociaux, sans causer de préjudice significatif (DNSH), et mesurer l'atteinte de cet objectif via des indicateurs.",
    wrongExplanations: [
      "Le label ISR est une démarche volontaire française distincte de la classification SFDR. Un fonds Article 9 n'est pas obligatoirement labellisé ISR.",
      "Correct – investissement durable comme objectif principal avec mesure de l'impact.",
      "SFDR ne prescrit pas un nombre de pages pour le rapport. L'obligation porte sur la qualité et la substance de l'information, pas sur son volume.",
    ],
    sourceLabel: 'Règlement SFDR (UE) 2019/2088 – art. 9',
  },
  {
    id: 'amf-dur-003',
    examId: 'amf-finance-durable',
    examLabel: 'AMF Finance Durable',
    theme: 'Taxonomie européenne',
    difficulty: 'difficile',
    question:
      "Combien d'objectifs environnementaux la taxonomie européenne (règlement 2020/852) définit-elle ?",
    choices: ['4 objectifs', '6 objectifs', '9 objectifs'],
    correctAnswerIndex: 1,
    explanation:
      "La taxonomie européenne définit 6 objectifs environnementaux : (1) atténuation du changement climatique, (2) adaptation au changement climatique, (3) utilisation durable de l'eau, (4) économie circulaire, (5) prévention de la pollution, (6) protection des écosystèmes et de la biodiversité. Une activité est « verte » si elle contribue à au moins un objectif sans nuire aux autres (DNSH).",
    wrongExplanations: [
      "4 objectifs est incorrect : la taxonomie initiale portait déjà sur 6 objectifs dès sa publication en 2020.",
      "Correct – 6 objectifs environnementaux.",
      "9 objectifs ne correspond pas à la taxonomie européenne actuelle. Il ne faut pas confondre avec d'autres référentiels.",
    ],
    sourceLabel: 'Règlement Taxonomie (UE) 2020/852',
  },
  {
    id: 'amf-dur-004',
    examId: 'amf-finance-durable',
    examLabel: 'AMF Finance Durable',
    theme: 'Stratégies ISR',
    difficulty: 'moyen',
    question: "Qu'est-ce que la stratégie d'investissement dite « Best-in-class » ?",
    choices: [
      "Exclure de son portefeuille tous les secteurs controversés (armement, tabac, charbon…)",
      "Sélectionner les meilleures entreprises de chaque secteur selon des critères ESG, quel que soit le secteur",
      "Allouer des capitaux uniquement vers des projets à impact environnemental positif certifié",
    ],
    correctAnswerIndex: 1,
    explanation:
      "La stratégie best-in-class consiste à sélectionner, dans chaque secteur d'activité, les entreprises présentant les meilleures pratiques ESG. Elle ne vise pas à exclure des secteurs mais à favoriser les « meilleurs élèves » de chaque industrie, y compris des secteurs traditionnellement polluants.",
    wrongExplanations: [
      "L'exclusion de secteurs controversés correspond à la stratégie d'exclusions normatives ou sectorielles, différente du best-in-class.",
      "Correct – best-in-class : meilleurs scores ESG par secteur sans exclusion sectorielle.",
      "Allouer vers des projets à impact certifié correspond à la stratégie d'investissement à impact (impact investing), plus exigeante que le best-in-class.",
    ],
    sourceLabel: "Forum pour l'Investissement Responsable (FIR) / Novethic",
  },
  {
    id: 'amf-dur-005',
    examId: 'amf-finance-durable',
    examLabel: 'AMF Finance Durable',
    theme: 'Greenwashing',
    difficulty: 'moyen',
    question:
      "Le « greenwashing » (éco-blanchiment) dans la finance consiste à :",
    choices: [
      "Recalculer les performances d'un fonds en tenant compte des coûts environnementaux",
      "Présenter un produit financier comme durable ou ESG de manière trompeuse, sans fondement réel",
      "Convertir un fonds traditionnel en fonds indiciel à faibles coûts pour réduire les frais",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Le greenwashing désigne les pratiques consistant à surestimer ou à mal représenter les qualités durables d'un produit financier. L'AMF et l'ESMA ont émis des lignes directrices pour prévenir ce risque, en exigeant que les allégations ESG soient précises, vérifiables et non trompeuses.",
    wrongExplanations: [
      "Recalculer les performances en intégrant des coûts environnementaux s'apparente à une comptabilité carbone ou à l'analyse du coût social, pas au greenwashing.",
      "Correct – le greenwashing est la communication trompeuse sur les caractéristiques durables d'un produit.",
      "La conversion en fonds indiciel à faibles coûts est une décision de gestion (passivisation), sans lien avec le greenwashing.",
    ],
    sourceLabel: 'AMF / ESMA – Lignes directrices sur les noms de fonds ESG',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// IOBSP Niveau 1 — 5 questions d'exemple
// ─────────────────────────────────────────────────────────────────────────────
const iobspQuestions: Question[] = [
  {
    id: 'iobsp-001',
    examId: 'iobsp-niveau-1',
    examLabel: 'IOBSP Niveau 1',
    theme: 'Réglementation IOBSP',
    difficulty: 'facile',
    question:
      "Quelle est la catégorie d'IOBSP habilitée à exercer une activité de courtage en crédit immobilier sans restriction de réseau ?",
    choices: [
      "L'agent lié",
      'Le courtier',
      'Le mandataire non exclusif',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Le courtier en opérations de banque est l'IOBSP le plus indépendant : il n'est pas lié à un seul établissement et peut présenter des offres de plusieurs banques. Il est immatriculé à l'ORIAS et répond de manière autonome à ses clients. Les agents liés et mandataires dépendent d'un ou plusieurs mandants.",
    wrongExplanations: [
      "L'agent lié agit pour le compte et sous la responsabilité d'un seul établissement de crédit : il ne peut pas proposer des offres concurrentes.",
      "Correct – le courtier est indépendant et peut comparer les offres du marché.",
      "Le mandataire non exclusif peut travailler avec plusieurs établissements mais sous mandat, pas en toute liberté comme le courtier.",
    ],
    sourceLabel: 'CMF art. R. 519-4 / Code de la consommation',
  },
  {
    id: 'iobsp-002',
    examId: 'iobsp-niveau-1',
    examLabel: 'IOBSP Niveau 1',
    theme: 'Crédit immobilier',
    difficulty: 'moyen',
    question:
      "Quel est le taux annuel effectif global (TAEG) et pourquoi est-il plus élevé que le taux nominal d'un crédit immobilier ?",
    choices: [
      "C'est le taux de référence fixé par la BCE ; il est identique au taux nominal",
      "C'est le taux exprimant le coût total du crédit incluant les frais, assurances et garanties ; il est supérieur au taux nominal",
      "C'est le taux de pénalité appliqué en cas de remboursement anticipé",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Le TAEG (Taux Annuel Effectif Global) est le taux de référence légal qui intègre tous les coûts obligatoires : intérêts, assurance emprunteur, frais de dossier, garanties (hypothèque, caution). Il permet de comparer les offres sur une base commune. Il est toujours supérieur ou égal au taux nominal.",
    wrongExplanations: [
      "Le taux de la BCE est le taux directeur qui influence les taux de marché, mais le TAEG est calculé par l'établissement prêteur en fonction du coût total du crédit.",
      "Correct – le TAEG inclut tous les frais et est supérieur au taux nominal.",
      "Les pénalités de remboursement anticipé (IRA) sont encadrées séparément par le Code de la consommation et ne définissent pas le TAEG.",
    ],
    sourceLabel: 'Code de la consommation – art. L. 314-1 / Directive crédit hypothécaire',
  },
  {
    id: 'iobsp-003',
    examId: 'iobsp-niveau-1',
    examLabel: 'IOBSP Niveau 1',
    theme: 'Devoir de conseil',
    difficulty: 'moyen',
    question:
      "Avant de formuler une recommandation de crédit, l'IOBSP doit procéder à une évaluation de la solvabilité de l'emprunteur. Sur quoi cette évaluation doit-elle principalement se baser ?",
    choices: [
      'Uniquement sur la valeur du bien immobilier servant de garantie',
      "Sur les revenus, charges, situation professionnelle et charges de remboursement existantes de l'emprunteur",
      'Sur la note de crédit (scoring) fournie par la banque centrale',
    ],
    correctAnswerIndex: 1,
    explanation:
      "L'évaluation de la solvabilité doit prendre en compte la capacité de remboursement de l'emprunteur : revenus réguliers, charges fixes, encours de crédits existants, situation professionnelle et familiale. La valeur du bien immobilier est pertinente pour la garantie mais ne suffit pas à démontrer la capacité de remboursement.",
    wrongExplanations: [
      "La valeur du bien est un élément de garantie (LTV – Loan To Value), pas un critère suffisant de solvabilité. Un bien de valeur ne garantit pas que l'emprunteur peut rembourser ses mensualités.",
      "Correct – la solvabilité repose sur la capacité de remboursement réelle de l'emprunteur.",
      "Il n'existe pas de scoring fourni par la banque centrale en France. Les scores de crédit sont des outils internes aux établissements ou fournis par des organismes privés.",
    ],
    sourceLabel: 'Directive crédit hypothécaire 2014/17/UE – art. 18',
  },
  {
    id: 'iobsp-004',
    examId: 'iobsp-niveau-1',
    examLabel: 'IOBSP Niveau 1',
    theme: 'Crédit à la consommation',
    difficulty: 'facile',
    question:
      "Quel est le délai de rétractation légal dont dispose un emprunteur après avoir signé une offre de crédit à la consommation ?",
    choices: ['7 jours calendaires', '14 jours calendaires', '30 jours calendaires'],
    correctAnswerIndex: 1,
    explanation:
      "Conformément à la directive 2008/48/CE et au Code de la consommation (art. L. 312-19), l'emprunteur dispose de 14 jours calendaires pour se rétracter d'un crédit à la consommation, sans avoir à se justifier. Ce délai court à compter de l'acceptation de l'offre.",
    wrongExplanations: [
      "7 jours est le délai de réflexion minimum obligatoire pour un crédit immobilier (délai Scrivener), pas le délai de rétractation d'un crédit à la consommation.",
      "Correct – 14 jours calendaires de rétractation pour le crédit à la consommation.",
      "30 jours n'est pas le délai légal de rétractation. Il peut correspondre à la durée de validité d'une offre préalable de crédit immobilier.",
    ],
    sourceLabel: 'Code de la consommation art. L. 312-19 / Directive 2008/48/CE',
  },
  {
    id: 'iobsp-005',
    examId: 'iobsp-niveau-1',
    examLabel: 'IOBSP Niveau 1',
    theme: 'Lutte anti-blanchiment',
    difficulty: 'difficile',
    question:
      "Dans le cadre de la LCB-FT (Lutte Contre le Blanchiment et le Financement du Terrorisme), qu'est-ce que la « vigilance renforcée » ?",
    choices: [
      'Une procédure déclenchée automatiquement pour tout crédit supérieur à 100 000 €',
      'Des mesures de diligence supplémentaires appliquées aux clients ou opérations présentant un risque élevé de blanchiment',
      'Le contrôle annuel obligatoire des dossiers clients par un auditeur externe',
    ],
    correctAnswerIndex: 1,
    explanation:
      "La vigilance renforcée (art. L. 561-10 et suivants CMF) s'applique lorsque le risque LCB-FT est élevé : clients dans des pays à risque, PPE (Personnes Politiquement Exposées), opérations atypiques ou complexes. Elle implique des vérifications d'identité approfondies, la recherche de l'origine des fonds et un suivi renforcé de la relation.",
    wrongExplanations: [
      "Le montant du crédit ne déclenche pas automatiquement la vigilance renforcée. C'est le niveau de risque LCB-FT associé au client ou à l'opération qui détermine le niveau de vigilance.",
      "Correct – vigilance renforcée = mesures supplémentaires pour les clients/opérations à risque élevé.",
      "L'audit externe est une obligation réglementaire distincte (contrôle interne, audit). La vigilance renforcée est une procédure opérationnelle quotidienne, pas un contrôle annuel externe.",
    ],
    sourceLabel: 'CMF art. L. 561-10 / Ordonnance LCB-FT',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// IAS Niveau 1 / COA — 5 questions d'exemple
// ─────────────────────────────────────────────────────────────────────────────
const iasQuestions: Question[] = [
  {
    id: 'ias-001',
    examId: 'ias-niveau-1',
    examLabel: 'IAS Niveau 1 / COA',
    theme: 'Réglementation assurance',
    difficulty: 'facile',
    question:
      "Qu'est-ce qu'un « intermédiaire en assurance » selon le Code des assurances ?",
    choices: [
      "Tout salarié d'une compagnie d'assurance qui gère les sinistres",
      "Toute personne qui, contre rémunération, présente, propose ou aide à conclure des contrats d'assurance",
      "Un expert indépendant chargé d'évaluer les sinistres pour le compte des assurés",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Selon l'article L. 511-1 du Code des assurances, est intermédiaire en assurance toute personne qui, contre rémunération (directe ou indirecte), exerce une activité de présentation, proposition, aide à la souscription ou conclusion de contrats d'assurance. Les gestionnaires de sinistres et experts sont des professions distinctes.",
    wrongExplanations: [
      "Les salariés gérant les sinistres sont des gestionnaires de sinistres internes à la compagnie ; ils ne sont pas des intermédiaires au sens réglementaire.",
      "Correct – définition légale de l'intermédiaire en assurance (Code des assurances art. L. 511-1).",
      "L'expert en assurance (expert d'assuré, expert d'assureur) est une profession distincte qui évalue les dommages ; ce n'est pas un intermédiaire en assurance.",
    ],
    sourceLabel: 'Code des assurances art. L. 511-1 / Directive DDA',
  },
  {
    id: 'ias-002',
    examId: 'ias-niveau-1',
    examLabel: 'IAS Niveau 1 / COA',
    theme: 'Devoir de conseil',
    difficulty: 'moyen',
    question:
      "Avant la conclusion d'un contrat d'assurance, le courtier doit remettre au client :",
    choices: [
      "Un document unique nommé « IPID » valable pour tous les types de contrats d'assurance",
      "Un document d'information précontractuelle adapté au produit (IPID pour les non-vie, DIC pour certains produits)",
      "Une lettre de mission décrivant uniquement sa rémunération",
    ],
    correctAnswerIndex: 1,
    explanation:
      "La directive DDA (Distribution en Assurance) impose la remise d'un document d'information précontractuelle. Pour les contrats non-vie, c'est l'IPID (Insurance Product Information Document), standardisé au niveau européen. Pour certains produits d'assurance-vie liés à un investissement (IBIP), c'est le DIC (Document d'Information Clé). Ces documents doivent être remis avant la souscription.",
    wrongExplanations: [
      "L'IPID existe uniquement pour les produits d'assurance non-vie. Il n'est pas universel : les produits vie d'investissement nécessitent un DIC (et éventuellement un KID PRIIP).",
      "Correct – IPID pour le non-vie, DIC pour les produits vie liés à un investissement.",
      "La lettre de mission / document d'information sur l'intermédiaire (DII) est obligatoire mais ne constitue pas le document précontractuel sur le produit. La rémunération est une information parmi d'autres.",
    ],
    sourceLabel: 'Directive DDA 2016/97/UE / Code des assurances art. L. 522-1',
  },
  {
    id: 'ias-003',
    examId: 'ias-niveau-1',
    examLabel: 'IAS Niveau 1 / COA',
    theme: "Produits d'assurance",
    difficulty: 'moyen',
    question:
      "Un contrat d'assurance-vie « multisupport » permet à l'assuré de :",
    choices: [
      'Couvrir simultanément plusieurs personnes sous un seul contrat familial',
      'Répartir son épargne entre un fonds en euros (capital garanti) et des unités de compte (UC)',
      "Choisir parmi plusieurs compagnies d'assurance au sein du même contrat",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Un contrat multisupport (ou « multi-support ») propose deux types d'investissement : le fonds en euros (capital garanti avec rendement modéré) et les unités de compte (UC), liées à des OPCVM, SCPI, etc., dont la valeur fluctue avec les marchés. L'assuré répartit librement son épargne entre ces supports.",
    wrongExplanations: [
      "La couverture de plusieurs personnes correspond à un contrat collectif ou à un contrat avec plusieurs têtes assurées, pas à la définition du multisupport.",
      "Correct – le multisupport combine fonds euros (garanti) et unités de compte (non garanties).",
      "Un contrat d'assurance-vie est souscrit auprès d'une seule compagnie. Le multisupport ne permet pas de panacher plusieurs assureurs dans un même contrat.",
    ],
    sourceLabel: 'Code des assurances / Code monétaire et financier',
  },
  {
    id: 'ias-004',
    examId: 'ias-niveau-1',
    examLabel: 'IAS Niveau 1 / COA',
    theme: 'Réglementation assurance',
    difficulty: 'difficile',
    question:
      "Dans le cadre de la directive Solvabilité II, qu'est-ce que le SCR (Solvency Capital Requirement) ?",
    choices: [
      "Le capital minimum légal exigé pour obtenir l'agrément d'une compagnie d'assurance",
      "Le capital requis pour absorber des pertes exceptionnelles sur une période d'un an avec une probabilité de ruine de 0,5 %",
      'Le montant des provisions techniques obligatoirement constituées pour couvrir les engagements envers les assurés',
    ],
    correctAnswerIndex: 1,
    explanation:
      "Sous Solvabilité II, le SCR est le capital réglementaire qu'une compagnie doit détenir pour faire face à des chocs financiers sévères sur un horizon d'un an, avec une probabilité de ruine de 0,5 % (VaR 99,5 %). C'est l'indicateur principal de solvabilité. Il diffère du MCR (Minimum Capital Requirement), plancher absolu en dessous duquel l'autorisation est retirée.",
    wrongExplanations: [
      "Le capital minimum légal pour obtenir un agrément est le MCR (Minimum Capital Requirement), pas le SCR. Le SCR est un exigence dynamique calculée en fonction du profil de risque de l'assureur.",
      "Correct – SCR = capital pour absorber des chocs sévères (VaR 99,5 % sur 1 an).",
      "Les provisions techniques sont un passif du bilan représentant les engagements envers les assurés ; elles sont distinctes du SCR qui est une exigence de fonds propres.",
    ],
    sourceLabel: 'Directive Solvabilité II 2009/138/CE',
  },
  {
    id: 'ias-005',
    examId: 'ias-niveau-1',
    examLabel: 'IAS Niveau 1 / COA',
    theme: 'Devoir de conseil',
    difficulty: 'moyen',
    question:
      "Un client souscrit une assurance habitation avec une garantie « valeur à neuf ». Qu'est-ce que cela signifie ?",
    choices: [
      "En cas de sinistre, l'assureur indemnise le bien à sa valeur d'origine sans déduire la vétusté",
      "En cas de sinistre, l'assureur remplace systématiquement le bien par un modèle neuf identique",
      "La garantie couvre uniquement les biens achetés depuis moins d'un an",
    ],
    correctAnswerIndex: 0,
    explanation:
      "La garantie « valeur à neuf » signifie que l'assureur indemnise le bien sinistré sans appliquer d'abattement pour vétusté (dépréciation due à l'usure). En revanche, la garantie « valeur réelle » ou « valeur de remplacement » tient compte de la vétusté. La valeur à neuf est plus protectrice mais les primes sont plus élevées.",
    wrongExplanations: [
      "Correct – valeur à neuf = indemnisation sans déduction de vétusté.",
      "L'assureur indemnise financièrement sans vétusté, mais ne remplace pas nécessairement par un modèle identique neuf. L'indemnisation est monétaire.",
      "La garantie valeur à neuf s'applique quelle que soit l'ancienneté du bien, pas seulement aux achats récents.",
    ],
    sourceLabel: 'Code des assurances / Pratiques de marché FFSA',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Export consolidé
// ─────────────────────────────────────────────────────────────────────────────

export const builtInQuestions: Question[] = [
  ...cifCgpQuestions,
  ...amfGeneralisteQuestions,
  ...amfFinanceDurableQuestions,
  ...iobspQuestions,
  ...iasQuestions,
  ...cifCgpQuestionsBlockA,
];

export const getQuestionsByExam = (examId: string, questions: Question[]): Question[] =>
  questions.filter((q) => q.examId === examId);

export const getThemesByExam = (examId: string, questions: Question[]): string[] =>
  [...new Set(questions.filter((q) => q.examId === examId).map((q) => q.theme))];
