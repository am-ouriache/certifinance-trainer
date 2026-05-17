import { cifRegulationQuestions } from './regulation.questions';
import { cifMif2Questions } from './mif2.questions';
import { cifLcbftQuestions } from './lcbft.questions';
import { cifProductsQuestions } from './products.questions';
import { cifFiscalityQuestions } from './fiscality.questions';

import { cifAssuranceVieQuestions } from './assurance_vie.questions';
import { cifEnveloppesQuestions } from './enveloppes.questions';
import { cifImmobilierScpiQuestions } from './immobilier_scpi.questions';
import { cifTransmissionQuestions } from './transmission.questions';
import { cifAllocationFiscalityQuestions } from './allocation_fiscality.questions';

import { cifRegulationCourses } from './regulation.courses';
import { cifMif2Courses } from './mif2.courses';
import { cifLcbftCourses } from './lcbft.courses';
import { cifPatrimoineCourses } from './patrimoine.courses';

import { cifFlashcardsV2Global } from './flashcards.v2';

export const cifQuestions = [
  ...cifRegulationQuestions,
  ...cifMif2Questions,
  ...cifLcbftQuestions,
  ...cifProductsQuestions,
  ...cifFiscalityQuestions,
  ...cifAssuranceVieQuestions,
  ...cifEnveloppesQuestions,
  ...cifImmobilierScpiQuestions,
  ...cifTransmissionQuestions,
  ...cifAllocationFiscalityQuestions,
];

export const cifCourses = [
  ...cifRegulationCourses,
  ...cifMif2Courses,
  ...cifLcbftCourses,
  ...cifPatrimoineCourses,
];

export const cifFlashcards = [
  ...cifFlashcardsV2Global,
];