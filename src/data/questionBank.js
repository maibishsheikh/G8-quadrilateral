// src/data/questionBank.js
// Procedural Question Bank (100 Questions: 10 Worlds × 10 Questions) for QuadQuest
import { WORLDS } from '../config/worlds.config.js';
import {
  generateIdentifyProblem,
  generateAngleSumProblem,
  generateAnglePropertiesProblem,
  generateSidePerimeterProblem,
  generateDiagonalProblem,
  generateClassificationProblem,
  generateHierarchyProblem,
  generateAlgebraicProblem,
  generateMultiStepReasonProblem,
  generateMixedReviewProblem,
} from '../utils/quadProblems.js';

export const DISTRICTS = WORLDS;

const GENERATORS_BY_WORLD = [
  generateIdentifyProblem,        // World 0: Meet the Species
  generateAngleSumProblem,        // World 1: Four Corners
  generateAnglePropertiesProblem, // World 2: Parallel Pairs
  generateSidePerimeterProblem,   // World 3: Side by Side
  generateDiagonalProblem,        // World 4: Cross Paths
  generateClassificationProblem,  // World 5: Name That Shape
  generateHierarchyProblem,       // World 6: The Family Tree
  generateAlgebraicProblem,       // World 7: X Marks the Angle
  generateMultiStepReasonProblem, // World 8: Give Your Reasons
  generateMixedReviewProblem,     // World 9: The Grand Field Guide
];

export function buildQuestionBank() {
  const bank = [];
  let globalId = 1;

  for (let worldIdx = 0; worldIdx < 10; worldIdx++) {
    const generator = GENERATORS_BY_WORLD[worldIdx];
    const worldMeta = WORLDS[worldIdx];

    for (let qIdx = 0; qIdx < 10; qIdx++) {
      const seed = worldIdx * 10 + qIdx;
      const prob = generator(seed);

      bank.push({
        id: globalId++,
        districtId: worldIdx,
        category: prob.category || worldMeta.name.toUpperCase(),
        visual: prob.visual || 'figure',
        questionText: prob.questionText,
        options: prob.options,
        correctAnswer: prob.correctAnswer,
        explanation: prob.explanation,
        hint1: prob.hint1 || 'Inspect the geometric properties and markings.',
        hint2: prob.hint2 || 'Recall the definitions and angle theorems for this species.',
        visualData: prob.visualData || {},
        steps: prob.steps,
      });
    }
  }

  return bank;
}

export const questionBank = buildQuestionBank();
export default questionBank;
