# CertiFinance Trainer for Marmotty

Application web de révision pour les certifications financières françaises.

## Certifications couvertes

| Certification | Description |
|---|---|
| **CIF / CGP** | Conseiller en Investissement Financier / Conseil en Gestion de Patrimoine |
| **AMF Généraliste** | Certification AMF – Marchés financiers et réglementation |
| **AMF Finance Durable** | Certification AMF – ESG, investissement responsable |
| **IOBSP Niveau 1** | Intermédiaire en Opérations de Banque et Services de Paiement |
| **IAS Niveau 1 / COA** | Intermédiaire en Assurance |

## Fonctionnalités

- **Tableau de bord** – Progression globale et par examen
- **Cours** – Contenu pédagogique structuré par sections
- **Fiches mémo** – Fiches synthétiques filtrables par thème
- **QCM** – Questions avec correction immédiate et explications détaillées
- **Examen blanc** – Simulation d'examen (10, 20, 30 ou 50 questions)
- **Mes erreurs** – Révision ciblée des questions ratées
- **Ajout de contenu** – Ajoutez vos propres questions, fiches et cours
- **Persistance locale** – Progression sauvegardée dans localStorage

## Stack technique

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** pour le design
- Pas de backend, pas de connexion, pas de dépendances lourdes
- Déployable gratuitement sur Netlify

---

## Installation et lancement

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Installer les dépendances

```bash
cd certifinance-trainer
npm install
```

### Lancer en mode développement

```bash
npm run dev
```

L'application s'ouvre sur `http://localhost:5173`

### Construire pour la production

```bash
npm run build
```

Les fichiers buildés se trouvent dans le dossier `dist/`.

### Prévisualiser le build

```bash
npm run preview
```

---

## Déploiement sur Netlify

### Option 1 – Interface Netlify (recommandé)

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Cliquez **"Add new site"** → **"Import an existing project"**
3. Connectez votre dépôt GitHub/GitLab
4. Netlify détecte automatiquement la configuration via `netlify.toml` :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
5. Cliquez **"Deploy site"**

### Option 2 – Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

Le fichier `netlify.toml` gère les redirections pour le routing SPA.

---

## Structure du projet

```
src/
├── App.tsx                    # Composant racine, routage par état
├── main.tsx                   # Point d'entrée React
├── index.css                  # Styles globaux Tailwind
├── types/
│   └── index.ts               # Toutes les interfaces TypeScript
├── data/
│   ├── exams.ts               # Définition des 5 examens
│   ├── questions.ts           # 25+ questions QCM d'exemple
│   ├── courses.ts             # Cours structurés par examen
│   └── flashcards.ts          # Fiches mémo par examen
├── hooks/
│   ├── useLocalStorage.ts     # Hook générique localStorage
│   └── useProgress.ts         # Gestion de la progression globale
└── components/
    ├── Layout.tsx             # Navigation (desktop + mobile)
    ├── Dashboard.tsx          # Tableau de bord global
    ├── ExamHome.tsx           # Page d'accueil d'un examen
    ├── CourseViewer.tsx       # Lecteur de cours
    ├── FlashcardList.tsx      # Liste de fiches mémo
    ├── QuizEngine.tsx         # Moteur de QCM
    ├── MockExam.tsx           # Mode examen blanc
    ├── ErrorReview.tsx        # Révision des erreurs
    ├── ManualAddContent.tsx   # Formulaire d'ajout de contenu
    └── ProgressSummary.tsx    # Statistiques détaillées par examen
```

---

## Comment modifier le contenu

### Ajouter des questions

Éditez `src/data/questions.ts`. Chaque question respecte l'interface `Question` :

```typescript
{
  id: 'unique-id',
  examId: 'cif-cgp',           // Identifiant de l'examen
  examLabel: 'CIF / CGP',
  theme: 'Réglementation',
  difficulty: 'moyen',          // 'facile' | 'moyen' | 'difficile'
  question: 'Texte de la question ?',
  choices: ['Choix A', 'Choix B', 'Choix C'],  // exactement 3
  correctAnswerIndex: 1,        // 0, 1 ou 2
  explanation: 'Explication générale de la bonne réponse',
  wrongExplanations: [
    'Pourquoi A est faux',
    'Pourquoi B est juste (ou faux)',
    'Pourquoi C est faux'
  ],
  sourceLabel: 'Source réglementaire',
  sourceUrl: 'https://...',     // optionnel
}
```

### Identifiants des examens (`examId`)

| Examen | `examId` |
|---|---|
| CIF / CGP | `cif-cgp` |
| AMF Généraliste | `amf-generaliste` |
| AMF Finance Durable | `amf-finance-durable` |
| IOBSP Niveau 1 | `iobsp-niveau-1` |
| IAS Niveau 1 | `ias-niveau-1` |

### Ajouter des cours

Éditez `src/data/courses.ts`. Un cours contient un `id`, un `examId`, un `title` et un tableau de `sections` :

```typescript
{
  id: 'course-cif-003',
  examId: 'cif-cgp',
  title: 'Titre du cours',
  sections: [
    {
      heading: 'Titre de la section',
      content: 'Contenu pédagogique...'
    }
  ]
}
```

### Ajouter des fiches

Éditez `src/data/flashcards.ts`. Une fiche contient un `id`, un `examId`, un `theme`, un `title` et un tableau de `keyPoints` :

```typescript
{
  id: 'fc-cif-004',
  examId: 'cif-cgp',
  theme: 'Fiscalité',
  title: 'Titre de la fiche',
  keyPoints: [
    'Point clé 1',
    'Point clé 2',
    'Point clé 3',
  ]
}
```

### Ajouter du contenu sans coder

Utilisez l'onglet **"Ajouter"** dans l'application. Le contenu est sauvegardé en localStorage.

---

## Données et confidentialité

Toutes les données (progression, contenus personnalisés) sont stockées localement dans le navigateur via `localStorage`. Aucune donnée n'est envoyée à un serveur.

Pour réinitialiser la progression : allez dans n'importe quel examen → section Progression → "Réinitialiser toute la progression".

---

## Avertissement

Les questions d'exemple sont des QCM de **révision pédagogique** inspirés des référentiels officiels. Elles ne constituent pas des questions officielles et ne préjugent pas du contenu des examens réels délivrés par l'AMF, l'ACPR ou d'autres organismes certificateurs.
