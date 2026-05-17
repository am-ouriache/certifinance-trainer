import { cifRegulationQuestions } from './regulation.questions';
import { cifMif2Questions } from './mif2.questions';
import { cifLcbftQuestions } from './lcbft.questions';
import { cifProductsQuestions } from './products.questions';
import { cifFiscalityQuestions } from './fiscality.questions';

import { cifRegulationCourses } from './regulation.courses';
import { cifMif2Courses } from './mif2.courses';
import { cifLcbftCourses } from './lcbft.courses';

import { cifRegulationFlashcards } from './regulation.flashcards';
import { cifMif2Flashcards } from './mif2.flashcards';
import { cifLcbftFlashcards } from './lcbft.flashcards';

export const cifQuestions = [
  ...cifRegulationQuestions,
  ...cifMif2Questions,
  ...cifLcbftQuestions,
  ...cifProductsQuestions,
  ...cifFiscalityQuestions,
];

export const cifCourses = [
  ...cifRegulationCourses,
  ...cifMif2Courses,
  ...cifLcbftCourses,
];

export const cifFlashcards = [
  ...cifRegulationFlashcards,
  ...cifMif2Flashcards,
  ...cifLcbftFlashcards,
];