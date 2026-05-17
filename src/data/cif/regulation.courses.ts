import type { Course } from '../../types';

export const cifRegulationCourses: Course[] = [
  {
    id: "course-cif-reg-v2-001",
    examId: "cif-cgp",
    title: "Statut CIF : comprendre le périmètre exact pour ne pas se faire piéger",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "À la fin de ce chapitre, tu dois savoir reconnaître immédiatement quand une activité relève du statut CIF et quand elle sort de ce périmètre. C’est un point très piégeux, car les questions mélangent souvent les mots CGP, CIF, conseil, gestion, assurance, crédit, commercialisation et transmission d’ordres."
      },
      {
        heading: "La logique à comprendre",
        content: "Le CIF est d’abord un professionnel du conseil en investissement. Il formule une recommandation personnalisée portant sur des instruments financiers. Le mot-clé est personnalisée. Une information générale sur les marchés n’est pas forcément un conseil CIF. En revanche, recommander un fonds ou une allocation à un client précis après analyse de son profil entre dans une logique CIF."
      },
      {
        heading: "Ce qu’il faut retenir",
        content: "1. CIF = conseil en investissement. 2. CGP n’est pas un statut réglementaire unique. 3. Le CIF ne reçoit pas de dépôts du public. 4. Le CIF ne fait pas de crédit sans statut IOBSP. 5. Le CIF ne distribue pas automatiquement de l’assurance sans statut IAS. 6. Le CIF ne gère pas librement un portefeuille client sans agrément adapté."
      },
      {
        heading: "Tableau mental",
        content: "Situation | Réflexe examen\nRecommandation personnalisée sur un fonds | CIF probable\nSouscription assurance-vie | IAS à vérifier\nRecherche d’un crédit immobilier | IOBSP\nGestion libre d’un portefeuille | Agrément de gestion nécessaire\nInformation générale sur les marchés | Pas forcément CIF"
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Piège 1 : croire que CGP suffit. Faux, ce sont les activités qui déterminent les statuts.\n⚠️ Piège 2 : confondre conseil et gestion. Conseiller = recommander. Gérer = décider pour le client.\n⚠️ Piège 3 : croire qu’un accord écrit du client autorise tout. Faux, le client ne peut pas autoriser une activité réglementée exercée sans cadre adapté."
      },
      {
        heading: "Cas pratique type examen",
        content: "Un client demande à un CGP de recommander une allocation entre fonds actions, obligations et SCPI. Le professionnel analyse sa situation, son horizon et son profil de risque, puis recommande plusieurs supports. On est dans une logique de conseil personnalisé. Si les supports sont des instruments financiers, le statut CIF peut être nécessaire. Si le même professionnel fait souscrire une assurance-vie, il faut aussi regarder IAS."
      },
    ]
  },
  {
    id: "course-cif-reg-v2-002",
    examId: "cif-cgp",
    title: "ORIAS, AMF, association professionnelle : qui fait quoi ?",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Tu dois éviter une confusion classique : mélanger ORIAS, AMF, ACPR, association professionnelle et Tracfin. L’examen adore demander qui immatricule, qui contrôle, qui agrée, qui reçoit les déclarations et qui protège l’épargne investie."
      },
      {
        heading: "Carte mentale",
        content: "ORIAS = registre d’immatriculation des intermédiaires. AMF = régulateur des marchés financiers et protection de l’épargne investie. Association professionnelle CIF = organisme agréé AMF auquel le CIF adhère. ACPR = banque, assurance et contrôle prudentiel. Tracfin = renseignement financier et déclarations de soupçon."
      },
      {
        heading: "Ce qu’il faut retenir",
        content: "1. ORIAS n’est pas le régulateur des marchés. 2. L’AMF n’est pas le registre ORIAS. 3. L’association professionnelle ne garantit pas le capital. 4. Tracfin ne délivre pas le statut CIF. 5. ACPR et AMF sont différentes, même si certains guides sont communs."
      },
      {
        heading: "Tableau récapitulatif",
        content: "Organisme | Rôle | Piège classique\nORIAS | Immatriculation | Croire qu’il garantit les placements\nAMF | Régulation marchés | Croire qu’elle rembourse les pertes\nAssociation CIF | Suivi des membres | Croire qu’elle vend les produits\nACPR | Banque/assurance | La confondre avec l’AMF\nTracfin | Déclarations soupçon | La confondre avec ORIAS"
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Être inscrit au RCS ne suffit pas pour être CIF.\n⚠️ L’ORIAS ne garantit pas la performance.\n⚠️ L’association professionnelle ne protège pas le capital du client.\n⚠️ L’AMF ne fixe pas les taux directeurs."
      },
      {
        heading: "Cas pratique",
        content: "Un client reçoit une proposition d’investissement par un consultant patrimonial indépendant. Premier réflexe : vérifier ORIAS et la catégorie exacte. Ensuite, vérifier l’association professionnelle si l’activité relève du CIF. Enfin, analyser la documentation : statut, rémunération, conflits d’intérêts, lettre de mission et adéquation."
      },
    ]
  },
  {
    id: "course-cif-reg-v2-003",
    examId: "cif-cgp",
    title: "Conditions d’accès au statut CIF : compétence, honorabilité, RCP",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Comprendre les conditions d’accès au statut CIF et ne pas confondre compétence, honorabilité, assurance, association professionnelle et immatriculation."
      },
      {
        heading: "Conditions principales",
        content: "Pour exercer comme CIF, il faut notamment justifier d’une compétence professionnelle, respecter une condition d’honorabilité, disposer d’une assurance responsabilité civile professionnelle, adhérer à une association professionnelle agréée par l’AMF et être immatriculé à l’ORIAS."
      },
      {
        heading: "Compétence professionnelle",
        content: "La compétence professionnelle vise à vérifier que le conseiller comprend les produits, les risques, la réglementation et les obligations envers le client. Elle peut être justifiée par diplôme, formation ou expérience selon les règles applicables. Avoir investi personnellement en bourse ne suffit pas."
      },
      {
        heading: "Honorabilité",
        content: "L’honorabilité signifie que le professionnel ne doit pas présenter certains antécédents incompatibles avec une activité financière réglementée. C’est une condition de confiance envers les clients et le marché."
      },
      {
        heading: "RCP",
        content: "La RCP couvre certaines conséquences de fautes professionnelles. Exemple : conseil manifestement inadapté, mal documenté ou formulé sans recueil suffisant d’informations. Mais la RCP ne garantit pas les marchés ni la performance du placement."
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ RCP ≠ garantie de performance.\n⚠️ Compétence professionnelle ≠ expérience personnelle d’investisseur.\n⚠️ Honorabilité ≠ recommandation par des clients.\n⚠️ ORIAS ≠ assurance RCP.\n⚠️ Association professionnelle ≠ autorisation bancaire."
      },
      {
        heading: "Question type examen",
        content: "Un client perd de l’argent après un investissement risqué. Le CIF est-il automatiquement responsable ? Non. Il faut analyser si le conseil était adapté, si les risques étaient expliqués, si la documentation était correcte et si le client avait la capacité de supporter le risque."
      },
    ]
  },
  {
    id: "course-cif-reg-v2-004",
    examId: "cif-cgp",
    title: "Lettre de mission, DER et documents de relation client",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Savoir distinguer les documents de la relation CIF : document d’entrée en relation, lettre de mission, recueil d’informations, déclaration d’adéquation et support commercial."
      },
      {
        heading: "La logique documentaire",
        content: "Le conseil financier doit être traçable. La documentation n’est pas une formalité vide : elle sert à prouver que le conseiller a informé le client, compris son profil, défini la mission, expliqué sa rémunération et justifié sa recommandation."
      },
      {
        heading: "Document d’entrée en relation",
        content: "Il présente le professionnel : identité, statut, immatriculation, association professionnelle, mode de rémunération, conflits d’intérêts éventuels. Il répond à la question : qui est ce professionnel et dans quel cadre intervient-il ?"
      },
      {
        heading: "Lettre de mission",
        content: "Elle définit la prestation : périmètre du conseil, modalités d’intervention, rémunération et engagements. Elle répond à la question : quelle mission précise est confiée au conseiller ?"
      },
      {
        heading: "Recueil d’informations",
        content: "Il permet de connaître le client : objectifs, horizon, situation financière, connaissances, expérience, tolérance au risque, capacité à subir des pertes et besoin de liquidité."
      },
      {
        heading: "Déclaration d’adéquation",
        content: "Elle explique pourquoi la recommandation est adaptée au client. Elle répond à la question : pourquoi ce conseil est cohérent avec ce client précis ?"
      },
      {
        heading: "Tableau récapitulatif",
        content: "Document | Question centrale\nDER | Qui est le professionnel ?\nLettre de mission | Quelle prestation ?\nRecueil client | Qui est le client ?\nDéclaration d’adéquation | Pourquoi ce conseil ?\nBrochure produit | Quelles caractéristiques du produit ?"
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ La lettre de mission ne remplace pas le recueil d’informations.\n⚠️ Une brochure commerciale ne justifie pas l’adéquation.\n⚠️ Une signature client ne valide pas automatiquement un mauvais conseil.\n⚠️ Une décharge de responsabilité ne supprime pas le devoir de conseil."
      },
    ]
  },
  {
    id: "course-cif-reg-v2-005",
    examId: "cif-cgp",
    title: "Conflits d’intérêts et rémunération : la logique de protection client",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Comprendre pourquoi les conflits d’intérêts sont un sujet central. Les questions ne demandent pas seulement ce qu’est un conflit, mais comment un conseiller doit réagir."
      },
      {
        heading: "Définition simple",
        content: "Un conflit d’intérêts apparaît lorsqu’un intérêt du conseiller, du cabinet, d’un partenaire ou d’un fournisseur peut influencer le conseil donné au client. Exemple : recommander un produit parce qu’il verse une meilleure commission, alors qu’un autre produit serait plus adapté."
      },
      {
        heading: "Rémunération et rétrocessions",
        content: "La rémunération n’est pas interdite en soi. Mais elle doit être comprise, transparente et compatible avec l’intérêt du client. Les rétrocessions peuvent créer un biais de conseil. Le professionnel doit donc les identifier, les gérer et démontrer que le conseil reste adapté."
      },
      {
        heading: "Réflexe professionnel",
        content: "Face à un conflit potentiel : identifier le conflit, l’éviter si possible, le gérer par des procédures, informer le client si nécessaire et prouver que la recommandation reste adaptée."
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Un conflit n’interdit pas toujours le conseil, mais il doit être géré.\n⚠️ Le silence du client ne supprime pas l’obligation de transparence.\n⚠️ Le produit le mieux rémunéré n’est pas automatiquement interdit, mais il doit être adapté.\n⚠️ La transparence seule ne suffit pas toujours : il faut servir l’intérêt du client."
      },
      {
        heading: "Cas pratique",
        content: "Deux fonds sont comparables. Le fonds A rémunère mieux le cabinet, mais il est plus cher et moins adapté. Le fonds B rémunère moins mais correspond mieux au profil. Le conseiller doit privilégier l’intérêt du client et pouvoir justifier son choix."
      },
    ]
  },
];