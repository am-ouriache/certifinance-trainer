import type { Course } from '../types';

export const builtInCourses: Course[] = [
  // ─── CIF / CGP ─────────────────────────────────────────────────────────────
  {
    id: 'course-cif-001',
    examId: 'cif-cgp',
    title: 'Le cadre réglementaire du CIF',
    sections: [
      {
        heading: 'Définition et statut du CIF',
        content:
          "Le Conseiller en Investissement Financier (CIF) est un professionnel habilité à fournir des conseils à titre principal sur des instruments financiers. Son statut est défini par les articles L. 541-1 et suivants du Code monétaire et financier (CMF). Il doit être immatriculé auprès d'une association professionnelle agréée par l'AMF (ex. ANACOFI, CNCIF, COMPAGNIE DES CGP…). \n\nLe CIF se distingue des prestataires de services d'investissement (PSI) car il ne gère pas lui-même les actifs de ses clients : il formule des recommandations personnalisées.",
      },
      {
        heading: 'Obligations réglementaires',
        content:
          "Avant tout conseil, le CIF doit :\n• Conclure une convention écrite (lettre de mission) avec le client\n• Réaliser un bilan patrimonial et une évaluation du profil investisseur (connaissance, expérience, situation financière, objectifs, tolérance au risque)\n• Informer le client sur ses conflits d'intérêts éventuels\n• Respecter les obligations de lutte anti-blanchiment (LCB-FT)\n\nLe CIF est soumis au devoir de conseil : ses recommandations doivent être adaptées à la situation personnelle du client (« adéquates » au sens de MIF 2).",
      },
      {
        heading: 'Formation et capacité professionnelle',
        content:
          "Le CIF doit justifier d'une capacité professionnelle, obtenue par :\n• Un diplôme de niveau II (Bac+3) en finance, droit, économie, ou\n• Une expérience professionnelle validée dans les domaines financiers\n\nIl doit également suivre une formation continue annuelle (minimum 40 heures sur 3 ans selon les associations). L'assurance responsabilité civile professionnelle (RCP) est obligatoire.",
      },
    ],
  },
  {
    id: 'course-cif-002',
    examId: 'cif-cgp',
    title: 'La directive MIF 2 et la protection des investisseurs',
    sections: [
      {
        heading: 'Objectifs de MIF 2',
        content:
          "La directive MIF 2 (Markets in Financial Instruments Directive – 2014/65/UE), transposée en droit français, vise à :\n• Renforcer la transparence des marchés financiers\n• Améliorer la protection des investisseurs\n• Encadrer les rémunérations (commissions, rétrocessions)\n• Harmoniser les règles au niveau européen\n\nElle distingue les clients de détail (protection maximale), les clients professionnels et les contreparties éligibles.",
      },
      {
        heading: 'Catégorisation des clients',
        content:
          "MIF 2 impose de classer chaque client dans une catégorie :\n\n1. Client de détail : toute personne ne relevant pas des deux catégories suivantes. Bénéficie du niveau de protection le plus élevé.\n\n2. Client professionnel par nature : établissements de crédit, entreprises d'investissement, assureurs, grandes entreprises (critères quantitatifs). Protection allégée.\n\n3. Contrepartie éligible : banques, PSI, organismes de retraite. Niveau de protection minimal dans les transactions entre professionnels.\n\nUn client peut demander à changer de catégorie sous conditions (client professionnel sur option).",
      },
      {
        heading: "Test d'adéquation (suitability)",
        content:
          "Avant toute recommandation personnalisée, le CIF/conseiller doit réaliser un test d'adéquation évaluant :\n• Connaissances et expérience en matière financière\n• Situation financière (revenus, patrimoine, capacité à supporter des pertes)\n• Objectifs d'investissement (horizon, appétit au risque)\n\nLa recommandation doit être « adéquate » : cohérente avec le profil du client. Si les informations sont insuffisantes, le conseiller ne peut pas recommander.",
      },
    ],
  },
  // ─── AMF Généraliste ────────────────────────────────────────────────────────
  {
    id: 'course-amf-gen-001',
    examId: 'amf-generaliste',
    title: 'Les marchés financiers : organisation et acteurs',
    sections: [
      {
        heading: 'Organisation des marchés',
        content:
          "Les marchés financiers se divisent en :\n\n• Marchés primaires : émission de nouveaux titres (IPO, augmentations de capital, émissions obligataires). Les entreprises lèvent des fonds auprès des investisseurs.\n\n• Marchés secondaires : négociation de titres déjà émis entre investisseurs (Bourse). Euronext Paris est le principal marché réglementé français.\n\n• Marchés de gré à gré (OTC – Over The Counter) : transactions bilatérales hors marché organisé. Courants pour les dérivés, obligations, produits structurés.",
      },
      {
        heading: 'Les principaux instruments financiers',
        content:
          "MIF 2 liste les instruments financiers :\n\n1. Actions : titres de capital représentant une fraction du capital social. Dividendes + plus-values.\n\n2. Obligations : titres de créance émis par des États ou entreprises. Coupons + remboursement du principal.\n\n3. Instruments du marché monétaire : maturité ≤ 1 an (billets de trésorerie, bons du Trésor).\n\n4. Organismes de placement collectif : OPCVM, FIA.\n\n5. Instruments dérivés : options, futures, swaps, CDS – valeur dérivée d'un sous-jacent.",
      },
      {
        heading: 'Les acteurs des marchés',
        content:
          "• Émetteurs : États, collectivités, entreprises qui lèvent des capitaux\n• Investisseurs institutionnels : assureurs, fonds de pension, OPCVM\n• Investisseurs particuliers (retail)\n• Intermédiaires financiers : banques, courtiers, sociétés de gestion\n• Infrastructures de marché : Euronext (marché), Euroclear (dépositaire central), LCH (chambre de compensation)\n• Régulateurs : AMF (France), ESMA (Europe), BCE/ACPR (supervision bancaire)",
      },
    ],
  },
  // ─── AMF Finance Durable ────────────────────────────────────────────────────
  {
    id: 'course-amf-dur-001',
    examId: 'amf-finance-durable',
    title: 'Introduction à la finance durable et aux critères ESG',
    sections: [
      {
        heading: "Qu'est-ce que la finance durable ?",
        content:
          "La finance durable (ou finance responsable) désigne l'intégration de critères non financiers – environnementaux, sociaux et de gouvernance (ESG) – dans les décisions d'investissement et de financement. Elle vise à orienter les capitaux vers des activités contribuant à un développement économique durable.\n\nLe Plan d'action de l'UE pour la finance durable (2018) en est le cadre stratégique européen.",
      },
      {
        heading: 'Les trois piliers ESG',
        content:
          "• Environnemental (E) : changement climatique, émissions de CO₂, biodiversité, gestion de l'eau et des déchets, efficacité énergétique.\n\n• Social (S) : conditions de travail, droits humains, diversité et inclusion, relations avec les communautés, santé et sécurité.\n\n• Gouvernance (G) : composition et indépendance du conseil d'administration, rémunération des dirigeants, transparence comptable, lutte anti-corruption, droits des actionnaires.",
      },
      {
        heading: 'Le cadre réglementaire européen',
        content:
          "Trois réglements clés structurent la finance durable en Europe :\n\n1. SFDR (2019/2088) : classification des produits financiers en Article 6 (pas de promotion ESG), Article 8 (promotion de caractéristiques E/S) et Article 9 (investissement durable comme objectif).\n\n2. Taxonomie (2020/852) : définit les 6 objectifs environnementaux et les critères pour qualifier une activité économique de « durable ».\n\n3. CSRD (2022) : directive sur le reporting extra-financier des entreprises, remplace la NFRD.",
      },
    ],
  },
  // ─── IOBSP ──────────────────────────────────────────────────────────────────
  {
    id: 'course-iobsp-001',
    examId: 'iobsp-niveau-1',
    title: 'Le crédit immobilier : cadre réglementaire et processus',
    sections: [
      {
        heading: 'Les acteurs du crédit immobilier',
        content:
          "• Emprunteurs : particuliers ou professionnels finançant un bien immobilier\n• Établissements de crédit : banques habilitées à octroyer des crédits\n• IOBSP : courtiers, mandataires et agents qui distribuent les crédits pour le compte de banques\n• Organismes de caution : Crédit Logement, SACCEF, mutuelles (alternative à l'hypothèque)\n• Notaires : instrumentent la vente et les garanties hypothécaires",
      },
      {
        heading: 'Le TAEG et le coût total du crédit',
        content:
          "Le Taux Annuel Effectif Global (TAEG) intègre :\n• Les intérêts (taux nominal)\n• Les frais de dossier\n• Le coût de l'assurance emprunteur\n• Les frais de garantie (caution ou hypothèque)\n• Les frais d'ouverture et de tenue de compte liés au crédit\n\nIl permet de comparer les offres sur une base commune et doit figurer sur tout document précontractuel (FISE – Fiche d'Information Standardisée Européenne).",
      },
      {
        heading: "Protection de l'emprunteur",
        content:
          "• Délai de réflexion : 10 jours à compter de la réception de l'offre (délai Scrivener immobilier) – l'emprunteur ne peut pas accepter avant le 11e jour\n• Droit de rétractation : 14 jours pour le crédit à la consommation\n• Loi Lemoine (2022) : droit à la résiliation de l'assurance emprunteur à tout moment, droit à l'oubli réduit à 5 ans pour certaines pathologies\n• Taux d'usure : taux maximal légal au-delà duquel un crédit est usuraire (fixé par la Banque de France chaque trimestre)",
      },
    ],
  },
  // ─── IAS ────────────────────────────────────────────────────────────────────
  {
    id: 'course-ias-001',
    examId: 'ias-niveau-1',
    title: "La distribution d'assurance et la directive DDA",
    sections: [
      {
        heading: "Les catégories d'intermédiaires en assurance",
        content:
          "Selon le Code des assurances (art. R. 511-2), il existe 5 catégories d'IAS :\n\n1. Courtier d'assurance : indépendant, travaille avec plusieurs compagnies, représente le client\n2. Agent général d'assurance : mandataire d'une compagnie, lié par mandat\n3. Mandataire d'assurance : personne morale mandatée par une compagnie\n4. Mandataire d'intermédiaire d'assurance : mandaté par un courtier ou agent\n5. Entreprise d'assurance distribuant directement (succursale, démarchage)",
      },
      {
        heading: "La directive DDA (Distribution d'Assurance)",
        content:
          "La directive IDD/DDA (2016/97/UE) harmonise les règles de distribution d'assurance en Europe. Ses principes :\n\n• Devoir de conseil : analyser les besoins du client avant toute recommandation\n• Remise de documents précontractuels : IPID (non-vie), DIC (IBIP)\n• Transparence sur la rémunération et les conflits d'intérêts\n• Formation continue : minimum 15 heures par an pour tous les distributeurs\n• Traitement équitable des clients",
      },
      {
        heading: 'Le devoir de conseil en assurance',
        content:
          "Avant toute souscription, l'IAS doit :\n1. Recueillir les besoins et exigences du client (analyse des besoins)\n2. Formuler une recommandation motivée (pourquoi ce produit correspond au client)\n3. Remettre le document précontractuel (IPID ou DIC)\n4. Informer sur sa nature d'intermédiaire et sa rémunération (DII – Document d'Information sur l'Intermédiaire)\n\nPour les produits d'investissement en assurance (IBIP), des règles supplémentaires s'appliquent : test d'adéquation ou de caractère approprié, document KID (PRIIP).",
      },
    ],
  },
];

export const getCoursesByExam = (examId: string, courses: Course[]): Course[] =>
  courses.filter((c) => c.examId === examId);
