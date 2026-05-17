import type { Course } from '../../types';

export const cifLcbftCourses: Course[] = [
  {
    id: "course-cif-lcbft-v2-001",
    examId: "cif-cgp",
    title: "LCB-FT : comprendre la logique anti-blanchiment",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "La LCB-FT ne doit pas être vue comme une formalité administrative. C’est une logique de détection du risque : qui est le client, d’où vient l’argent, pourquoi cette opération, est-ce cohérent ?"
      },
      {
        heading: "La logique",
        content: "Le blanchiment consiste à donner une apparence légale à des fonds d’origine illicite. Le financement du terrorisme peut porter sur des montants parfois faibles mais avec une finalité grave. Le professionnel doit donc détecter les incohérences, pas seulement les gros montants."
      },
      {
        heading: "Approche par les risques",
        content: "La réglementation repose sur une approche proportionnée. Le niveau de vigilance dépend de facteurs client, produit, géographiques, canal de distribution et comportement."
      },
      {
        heading: "Vigilance normale, simplifiée, renforcée",
        content: "Vigilance normale : situation standard. Vigilance simplifiée : risque faible, sous conditions. Vigilance renforcée : risque élevé, client PPE, opération atypique, pays à risque, origine des fonds incertaine, montage complexe."
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Croire que seul le cash est risqué. Faux.\n⚠️ Croire que seul un gros montant est risqué. Faux.\n⚠️ Croire qu’un client connu personnellement dispense de vigilance. Faux.\n⚠️ Croire que l’urgence commerciale justifie de sauter les contrôles. Faux."
      },
      {
        heading: "Cas pratique",
        content: "Un client aux revenus modestes veut investir rapidement 250 000 € via une structure étrangère récemment créée. Le montant, l’origine des fonds, la structure et l’urgence constituent des signaux d’alerte. Le bon réflexe est de renforcer les diligences, pas d’accélérer la souscription."
      },
    ]
  },
  {
    id: "course-cif-lcbft-v2-002",
    examId: "cif-cgp",
    title: "KYC, origine des fonds et bénéficiaire effectif",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Savoir ce qu’il faut identifier et pourquoi. Les questions mélangent souvent identité, origine des fonds, origine du patrimoine et bénéficiaire effectif."
      },
      {
        heading: "KYC",
        content: "KYC signifie Know Your Customer. Il ne s’agit pas seulement de récupérer une pièce d’identité. Il faut comprendre la relation : qui est le client, quelle est son activité, quels sont ses revenus, quel est son patrimoine, quel est l’objectif de l’opération ?"
      },
      {
        heading: "Origine des fonds vs origine du patrimoine",
        content: "Origine des fonds = d’où vient l’argent utilisé dans l’opération précise. Origine du patrimoine = comment le client a constitué son patrimoine global."
      },
      {
        heading: "Bénéficiaire effectif",
        content: "Pour une société ou une structure, il faut identifier la personne physique qui contrôle réellement l’entité. Le piège est de s’arrêter au dirigeant apparent sans comprendre la chaîne de contrôle."
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Pièce d’identité seule ≠ KYC complet.\n⚠️ Origine des fonds ≠ origine du patrimoine.\n⚠️ Dirigeant légal ≠ toujours bénéficiaire effectif.\n⚠️ Client ancien ≠ dossier jamais mis à jour."
      },
      {
        heading: "Cas pratique",
        content: "Une société française souhaite investir, mais son capital est détenu par deux holdings étrangères. Le conseiller doit comprendre la chaîne de détention et identifier les bénéficiaires effectifs. La simple identification du gérant français peut être insuffisante."
      },
    ]
  },
  {
    id: "course-cif-lcbft-v2-003",
    examId: "cif-cgp",
    title: "Tracfin et déclaration de soupçon",
    sections: [
      {
        heading: "Objectif du chapitre",
        content: "Savoir quand une déclaration de soupçon peut être nécessaire et surtout ce qu’il ne faut pas faire. Les examens aiment tester la confidentialité et l’interdiction d’alerter le client."
      },
      {
        heading: "Tracfin",
        content: "Tracfin est le service français de renseignement financier chargé de recevoir et traiter les déclarations de soupçon. Il ne donne pas le statut CIF, ne tient pas le registre ORIAS et ne garantit pas les placements."
      },
      {
        heading: "Déclaration de soupçon",
        content: "Lorsqu’une opération paraît suspecte et que les justifications obtenues ne permettent pas de lever le doute, le professionnel peut devoir déclarer à Tracfin selon sa procédure interne."
      },
      {
        heading: "Interdiction d’informer le client",
        content: "Le client ne doit pas être averti qu’une déclaration de soupçon est envisagée ou effectuée. C’est une règle essentielle : informer le client peut compromettre l’analyse et contrevenir au cadre légal."
      },
      {
        heading: "Pièges fréquents",
        content: "⚠️ Demander l’accord du client avant déclaration : faux.\n⚠️ Prévenir le client par transparence : faux.\n⚠️ Détruire le dossier pour éviter un conflit : faux.\n⚠️ Déclarer tout sans analyse : mauvaise pratique. Il faut documenter le raisonnement."
      },
      {
        heading: "Cas pratique",
        content: "Un client refuse de justifier l’origine de fonds importants et donne des explications contradictoires. Le conseiller documente les échanges, applique la procédure interne, peut refuser l’opération et envisager une déclaration de soupçon. Il ne doit pas dire au client : je vais vous déclarer à Tracfin."
      },
    ]
  },
];