// scripts/qa_audit.js
// Comprehensive QA and Stress Test Suite for QuadQuest (TRD §10)
import { questionBank, DISTRICTS } from '../src/data/questionBank.js';
import { PROPERTY_TABLE, HIERARCHY, mostSpecificName, BORDERLINE_RELATIONS } from '../src/utils/quadProperties.js';
import { isConvex, sideLengths, interiorAngles, diagonalFacts, getCanonicalQuad } from '../src/utils/quadGeometry.js';
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
} from '../src/utils/quadProblems.js';

console.log("==================================================");
console.log("       QUADQUEST TRD §10 QA AUDIT SUITE           ");
console.log("==================================================");

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    totalPassed++;
  } else {
    totalFailed++;
    console.error(`❌ FAILED: ${message}`);
  }
}

// ─── 1. Question Bank Schema & Stress Test ──────────────────────────────────
console.log("\n[Test 1] Validating active questionBank (100 questions)...");
assert(questionBank.length === 100, `Question bank length should be 100, got ${questionBank.length}`);
assert(DISTRICTS.length === 10, `DISTRICTS length should be 10, got ${DISTRICTS.length}`);

questionBank.forEach((q, idx) => {
  assert(q.id > 0, `Q${idx} missing valid id`);
  assert(q.districtId >= 0 && q.districtId < 10, `Q${idx} invalid districtId ${q.districtId}`);
  assert(typeof q.questionText === 'string' && q.questionText.length > 5, `Q${idx} invalid questionText`);
  assert(Array.isArray(q.options) && q.options.length === 4, `Q${idx} must have exactly 4 options`);
  assert(new Set(q.options).size === 4, `Q${idx} has duplicate options: ${JSON.stringify(q.options)}`);
  assert(q.options.includes(q.correctAnswer), `Q${idx} correctAnswer '${q.correctAnswer}' not in options`);
  assert(typeof q.explanation === 'string' && q.explanation.length > 10, `Q${idx} missing explanation`);
  assert(typeof q.hint1 === 'string' && q.hint1.length > 5, `Q${idx} missing hint1`);
  assert(typeof q.hint2 === 'string' && q.hint2.length > 5, `Q${idx} missing hint2`);
});

// ─── 2. Randomized Stress Test (≥300 generations per concept = 3,000 runs) ─
console.log("\n[Test 2] Running randomized stress test (3,000 generated problems)...");
const generators = [
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
];

let stressErrors = 0;
for (let genIdx = 0; genIdx < generators.length; genIdx++) {
  const gen = generators[genIdx];
  for (let seed = 0; seed < 300; seed++) {
    try {
      const p = gen(seed + genIdx * 1000);
      if (!p.questionText || !p.options || p.options.length !== 4) stressErrors++;
      if (new Set(p.options).size !== 4) stressErrors++;
      if (!p.options.includes(p.correctAnswer)) stressErrors++;
      if (p.visualData?.points && !isConvex(p.visualData.points)) stressErrors++;
    } catch (err) {
      stressErrors++;
    }
  }
}
assert(stressErrors === 0, `Randomized stress test had ${stressErrors} errors`);

// ─── 3. Property Table Audit ────────────────────────────────────────────────
console.log("\n[Test 3] Auditing PROPERTY_TABLE computed from geometry...");
assert(PROPERTY_TABLE.square.hasAllSidesEqual === true, "Square must have all sides equal");
assert(PROPERTY_TABLE.square.hasAllRightAngles === true, "Square must have all right angles");
assert(PROPERTY_TABLE.square.diagonalsEqual === true, "Square diagonals must be equal");
assert(PROPERTY_TABLE.square.diagonalsPerpendicular === true, "Square diagonals must be perpendicular");
assert(PROPERTY_TABLE.rhombus.hasAllSidesEqual === true, "Rhombus must have all sides equal");
assert(PROPERTY_TABLE.rhombus.diagonalsPerpendicular === true, "Rhombus diagonals must be perpendicular");
assert(PROPERTY_TABLE.rectangle.diagonalsEqual === true, "Rectangle diagonals must be equal");
assert(PROPERTY_TABLE.parallelogram.hasTwoParallelPairs === true, "Parallelogram must have 2 parallel pairs");
assert(PROPERTY_TABLE.parallelogram.diagonalsBisect === true, "Parallelogram diagonals must bisect");
assert(PROPERTY_TABLE.trapezium.hasOneParallelPair === true, "Trapezium must have exactly 1 parallel pair");

// ─── 4. Inclusion Hierarchy Audit ───────────────────────────────────────────
console.log("\n[Test 4] Auditing HIERARCHY...");
assert(HIERARCHY.square.includes('rectangle'), "Square must include rectangle in hierarchy");
assert(HIERARCHY.square.includes('rhombus'), "Square must include rhombus in hierarchy");
assert(HIERARCHY.rectangle.includes('parallelogram'), "Rectangle must include parallelogram");
assert(HIERARCHY.rhombus.includes('parallelogram'), "Rhombus must include parallelogram");

// ─── 5. Definition Policy & Borderline Exclusion Audit ──────────────────────
console.log("\n[Test 5] Auditing BORDERLINE_RELATIONS exclusion...");
questionBank.forEach((q, idx) => {
  const text = q.questionText.toLowerCase();
  assert(
    !text.includes("is a parallelogram a trapezium") &&
    !text.includes("is a rhombus a kite") &&
    !text.includes("is a square a kite"),
    `Q${idx} contains borderline relation question`
  );
});

// ─── 6. Classification Uniqueness Audit ─────────────────────────────────────
console.log("\n[Test 6] Auditing mostSpecificName uniqueness...");
assert(mostSpecificName({ hasAllSidesEqual: true, hasAllRightAngles: true }) === 'Square', "4 equal sides + right angles must be Square");
assert(mostSpecificName({ hasAllSidesEqual: true, hasAllRightAngles: false }) === 'Rhombus', "4 equal sides must be Rhombus");
assert(mostSpecificName({ hasAllSidesEqual: false, hasAllRightAngles: true }) === 'Rectangle', "4 right angles must be Rectangle");
assert(mostSpecificName({ hasTwoParallelPairs: true, hasAllSidesEqual: false, hasAllRightAngles: false }) === 'Parallelogram', "2 parallel pairs must be Parallelogram");
assert(mostSpecificName({ hasOneParallelPair: true }) === 'Trapezium', "1 parallel pair must be Trapezium");
assert(mostSpecificName({ hasTwoAdjacentPairsEqual: true }) === 'Kite', "2 adjacent pairs must be Kite");

console.log("==================================================");
console.log(`TOTAL AUDIT CHECKS: Passed: ${totalPassed}, Failed: ${totalFailed}`);
console.log("==================================================");

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL AUDIT CHECKS PASSED PERFECTLY!\n");
}
