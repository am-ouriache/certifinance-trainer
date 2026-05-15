import type { Question } from '../types';

export const cifCgpQuestionsBlockA: Question[] = [
  {
    id: "CIF-A-001",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Statut CIF",
    difficulty: "facile",
    question: "Quelle est l’activité principale d’un conseiller en investissements financiers ?",
    choices: [
      "Fournir des recommandations personnalisées sur des instruments financiers",
      "Recevoir des dépôts du public comme une banque",
      "Fixer les taux directeurs applicables aux crédits"
    ],
    correctAnswerIndex: 0,
    explanation:
      "Le CIF exerce principalement une activité de conseil en investissement, c’est-à-dire qu’il fournit des recommandations personnalisées adaptées à la situation du client.",
    wrongExplanations: [
      "Bonne réponse.",
      "La réception de dépôts du public relève de l’activité bancaire, pas du statut CIF.",
      "Les taux directeurs relèvent de la politique monétaire, notamment de la Banque centrale européenne."
    ],
    sourceLabel: "AMF - Conseillers en investissements financiers",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-002",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Conditions d’accès",
    difficulty: "facile",
    question: "Parmi les éléments suivants, lequel fait partie des conditions d’exercice du CIF ?",
    choices: [
      "L’adhésion à une association professionnelle agréée par l’AMF",
      "L’obligation d’être salarié d’une banque",
      "L’obligation d’avoir un capital social minimum de 10 millions d’euros"
    ],
    correctAnswerIndex: 0,
    explanation:
      "Le CIF doit notamment adhérer à une association professionnelle agréée par l’AMF. Cette adhésion fait partie du cadre d’exercice du statut.",
    wrongExplanations: [
      "Bonne réponse.",
      "Un CIF peut exercer sous différentes formes, il n’a pas l’obligation d’être salarié d’une banque.",
      "Le statut CIF n’impose pas un capital social de 10 millions d’euros."
    ],
    sourceLabel: "AMF - Conditions d’accès CIF",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-003",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "ORIAS",
    difficulty: "facile",
    question: "Quel est le rôle de l’ORIAS pour un CIF ?",
    choices: [
      "Tenir le registre des intermédiaires et permettre la vérification de leur immatriculation",
      "Garantir la performance des produits financiers conseillés",
      "Décider de la fiscalité applicable aux placements"
    ],
    correctAnswerIndex: 0,
    explanation:
      "L’ORIAS tient le registre unique des intermédiaires. L’immatriculation permet de vérifier qu’un professionnel est autorisé à exercer certaines activités réglementées.",
    wrongExplanations: [
      "Bonne réponse.",
      "L’ORIAS ne garantit pas la performance des placements.",
      "La fiscalité relève de la loi fiscale, pas de l’ORIAS."
    ],
    sourceLabel: "ORIAS / AMF - Immatriculation des intermédiaires",
    sourceUrl: "https://www.orias.fr"
  },
  {
    id: "CIF-A-004",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "AMF",
    difficulty: "facile",
    question: "Quel organisme encadre les conseillers en investissements financiers en matière de marchés financiers ?",
    choices: [
      "L’Autorité des marchés financiers",
      "La Banque centrale européenne uniquement",
      "La mairie du lieu d’exercice"
    ],
    correctAnswerIndex: 0,
    explanation:
      "L’AMF est l’autorité de régulation des marchés financiers en France. Elle intervient notamment dans l’encadrement des CIF et agrée leurs associations professionnelles.",
    wrongExplanations: [
      "Bonne réponse.",
      "La Banque centrale européenne joue un rôle monétaire et prudentiel, mais elle n’est pas l’autorité principale d’encadrement des CIF.",
      "La mairie n’encadre pas l’activité CIF."
    ],
    sourceLabel: "AMF - Rôle de l’AMF",
    sourceUrl: "https://www.amf-france.org"
  },
  {
    id: "CIF-A-005",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "RCP",
    difficulty: "facile",
    question: "À quoi sert principalement l’assurance responsabilité civile professionnelle du CIF ?",
    choices: [
      "Couvrir certaines conséquences financières de fautes professionnelles",
      "Garantir au client qu’il ne perdra jamais d’argent",
      "Remplacer l’obligation de compétence professionnelle"
    ],
    correctAnswerIndex: 0,
    explanation:
      "La RCP permet de couvrir certaines conséquences financières liées à la responsabilité professionnelle du conseiller. Elle ne garantit pas le rendement des produits.",
    wrongExplanations: [
      "Bonne réponse.",
      "Aucun placement financier risqué ne peut être garanti par la seule RCP du conseiller.",
      "La RCP ne remplace pas la compétence professionnelle, les deux obligations sont distinctes."
    ],
    sourceLabel: "AMF - Obligations professionnelles CIF",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-006",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Honorabilité",
    difficulty: "facile",
    question: "Que signifie l’exigence d’honorabilité pour un CIF ?",
    choices: [
      "Ne pas avoir fait l’objet de certaines condamnations ou interdictions incompatibles avec l’activité",
      "Avoir obligatoirement travaillé dix ans dans une banque",
      "Être recommandé par au moins trois clients"
    ],
    correctAnswerIndex: 0,
    explanation:
      "L’honorabilité vise à vérifier que le professionnel ne présente pas d’antécédents incompatibles avec l’exercice d’une activité financière réglementée.",
    wrongExplanations: [
      "Bonne réponse.",
      "L’expérience bancaire peut être utile, mais ce n’est pas la définition de l’honorabilité.",
      "La recommandation par des clients ne remplace pas la condition réglementaire d’honorabilité."
    ],
    sourceLabel: "AMF - Conditions d’accès CIF",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-007",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Compétence professionnelle",
    difficulty: "facile",
    question: "Pourquoi la compétence professionnelle est-elle exigée pour exercer comme CIF ?",
    choices: [
      "Pour s’assurer que le conseiller possède les connaissances nécessaires à un conseil adapté",
      "Pour garantir automatiquement un rendement positif au client",
      "Pour permettre au conseiller de vendre n’importe quel produit sans autre obligation"
    ],
    correctAnswerIndex: 0,
    explanation:
      "La compétence professionnelle vise à s’assurer que le CIF dispose d’un niveau de connaissances suffisant pour conseiller correctement ses clients.",
    wrongExplanations: [
      "Bonne réponse.",
      "Même un conseiller compétent ne peut pas garantir la performance d’un placement risqué.",
      "La compétence ne supprime pas les obligations d’information, de conseil, de transparence et d’adéquation."
    ],
    sourceLabel: "AMF - Conditions d’accès CIF",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-008",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Association professionnelle",
    difficulty: "moyen",
    question: "Quel est le rôle d’une association professionnelle agréée dans le cadre du statut CIF ?",
    choices: [
      "Encadrer, suivre et contrôler ses membres CIF selon les règles applicables",
      "Garantir fiscalement les placements proposés par les CIF",
      "Accorder directement des crédits aux clients des CIF"
    ],
    correctAnswerIndex: 0,
    explanation:
      "L’association professionnelle agréée par l’AMF participe à l’encadrement des CIF, au suivi de leurs obligations et au contrôle professionnel de ses membres.",
    wrongExplanations: [
      "Bonne réponse.",
      "Une association CIF ne garantit pas la fiscalité ni la performance des produits.",
      "L’octroi de crédits relève d’établissements habilités, pas d’une association CIF."
    ],
    sourceLabel: "AMF - Associations professionnelles CIF",
    sourceUrl: "https://www.amf-france.org/fr/espace-professionnels/autres-profils/conseillers-en-investissements-financiers-cif"
  },
  {
    id: "CIF-A-009",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "Périmètre d’activité",
    difficulty: "moyen",
    question: "Quelle activité n’entre pas dans le cœur du statut CIF ?",
    choices: [
      "La gestion discrétionnaire d’un portefeuille pour le compte d’un client",
      "Le conseil personnalisé sur des instruments financiers",
      "L’analyse de la situation patrimoniale du client avant recommandation"
    ],
    correctAnswerIndex: 0,
    explanation:
      "La gestion discrétionnaire de portefeuille pour compte de tiers relève d’un autre cadre réglementaire. Le CIF fournit principalement un conseil personnalisé.",
    wrongExplanations: [
      "Bonne réponse.",
      "Le conseil personnalisé est au cœur de l’activité CIF.",
      "Le recueil et l’analyse de la situation client sont essentiels pour formuler un conseil adapté."
    ],
    sourceLabel: "ACPR-AMF - Guide EI/CIF",
    sourceUrl: "https://acpr.banque-france.fr"
  },
  {
    id: "CIF-A-010",
    examId: "cif-cgp",
    examLabel: "CIF / CGP",
    theme: "CGP",
    difficulty: "moyen",
    question: "Pourquoi dit-on que CGP n’est pas un statut réglementaire unique ?",
    choices: [
      "Parce que le CGP peut exercer plusieurs activités relevant chacune d’un statut spécifique",
      "Parce que le CGP n’a jamais d’obligations réglementaires",
      "Parce que le CGP est automatiquement agréé par la Banque de France"
    ],
    correctAnswerIndex: 0,
    explanation:
      "Le terme CGP décrit une activité globale de conseil patrimonial. Les obligations dépendent des statuts réellement exercés : CIF, IAS, IOBSP, immobilier, etc.",
    wrongExplanations: [
      "Bonne réponse.",
      "Un CGP peut avoir de nombreuses obligations réglementaires selon les activités qu’il exerce.",
      "Le CGP n’est pas automatiquement agréé par la Banque de France."
    ],
    sourceLabel: "AMF / ACPR - Statuts réglementés",
    sourceUrl: "https://www.amf-france.org"
  }
];
