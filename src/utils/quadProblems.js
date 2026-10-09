// src/utils/quadProblems.js
// Rule-Chain Problem Generators for QuadQuest (TRD §4.4)
import { REASONS, misconception, mostSpecificName, HIERARCHY } from './quadProperties.js';
import { getCanonicalQuad } from './quadGeometry.js';

// Random integer helper [min, max]
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random pick from array
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle array
function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 0: Identify Special Quadrilaterals
// ─────────────────────────────────────────────────────────────────────────────
export function generateIdentifyProblem(seed = 0) {
  const types = [
    {
      q: "A savanna fence enclosure has EXACTLY one pair of parallel sides. Which quadrilateral species is it?",
      correct: "Trapezium",
      distractors: ["Parallelogram", "Rhombus", "Kite"],
      explanation: "By definition, a trapezium has exactly one pair of parallel opposite sides.",
      species: "trapezium",
      marks: { parallelPairs: [[0, 2]] },
    },
    {
      q: "A ranger surveys an animal pen with two pairs of parallel sides and all four sides equal in length, but no right angles. Which species is this?",
      correct: "Rhombus",
      distractors: ["Square", "Rectangle", "Trapezium"],
      explanation: "A quadrilateral with all four sides equal and opposite sides parallel is a rhombus. Without right angles, it is not a square.",
      species: "rhombus",
      marks: { equalSides: [0, 1, 2, 3], parallelPairs: [[0, 2], [1, 3]] },
    },
    {
      q: "An animal shelter has four right angles and opposite sides of equal length (length ≠ width). What is its most accurate species name?",
      correct: "Rectangle",
      distractors: ["Rhombus", "Square", "Trapezium"],
      explanation: "A parallelogram with four right angles and unequal adjacent sides is a rectangle.",
      species: "rectangle",
      marks: { rightAngles: [0, 1, 2, 3], equalSidesPairs: [[0, 2], [1, 3]] },
    },
    {
      q: "A wildlife kite tracker has two pairs of equal adjacent sides, but opposite sides are NOT equal. Which species is it?",
      correct: "Kite",
      distractors: ["Parallelogram", "Rhombus", "Trapezium"],
      explanation: "A kite has two pairs of equal adjacent sides and no parallel opposite sides.",
      species: "kite",
      marks: { equalSidesPairs: [[0, 3], [1, 2]] },
    },
    {
      q: "A reserve observation tower has opposite sides that are equal and parallel, but none of its angles are 90° and adjacent sides are unequal. What species is it?",
      correct: "Parallelogram",
      distractors: ["Rectangle", "Trapezium", "Kite"],
      explanation: "A quadrilateral with two pairs of parallel and equal opposite sides is a parallelogram.",
      species: "parallelogram",
      marks: { parallelPairs: [[0, 2], [1, 3]], equalSidesPairs: [[0, 2], [1, 3]] },
    },
    {
      q: "A ranger tracks a boundary with 4 equal sides AND 4 right angles. What is its most specific species name?",
      correct: "Square",
      distractors: ["Rectangle", "Rhombus", "Parallelogram"],
      explanation: "A figure with four equal sides and four right angles is a square (the most specific classification).",
      species: "square",
      marks: { rightAngles: [0, 1, 2, 3], equalSides: [0, 1, 2, 3] },
    },
  ];

  const item = types[seed % types.length];
  const options = shuffle([item.correct, ...item.distractors]);

  return {
    category: "SPECIES IDENTIFICATION",
    questionText: item.q,
    options,
    correctAnswer: item.correct,
    explanation: item.explanation,
    hint1: "Look at the parallel sides and side length relationships.",
    hint2: "Remember: four equal sides = rhombus/square; one parallel pair = trapezium.",
    visual: "figure",
    visualData: {
      species: item.species,
      points: getCanonicalQuad(item.species),
      marks: item.marks,
      notToScale: false,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 1: Angle Sum of Quadrilateral (360°)
// ─────────────────────────────────────────────────────────────────────────────
export function generateAngleSumProblem(seed = 0) {
  // 3 angles given, find the 4th
  const a1 = randInt(65, 115);
  const a2 = randInt(70, 120);
  const a3 = randInt(60, 110);
  const a4 = 360 - (a1 + a2 + a3);

  const correct = `${a4}°`;
  const distractor1 = `${360 - a4}°`; // Gave sum of 3 angles instead
  const distractor2 = `${180 - (a1 + a2 - 90)}°`; // Confused with 180°
  const distractor3 = `${a4 + 10}°`;

  const options = shuffle(Array.from(new Set([correct, distractor1, `${Math.abs(180 - a1)}°`, distractor3])).slice(0, 4));
  while (options.length < 4) {
    options.push(`${a4 - 15}°`);
  }

  return {
    category: "ANGLE SUM 360°",
    questionText: `Three interior angles of a quadrilateral savanna zone are ${a1}°, ${a2}°, and ${a3}°. Find the fourth angle.`,
    options: shuffle(options),
    correctAnswer: correct,
    explanation: `The sum of interior angles in any quadrilateral is 360°. Fourth angle = 360° − (${a1}° + ${a2}° + ${a3}°) = 360° − ${a1 + a2 + a3}° = ${a4}°. (Reason: ${REASONS['angle-sum-quadrilateral']})`,
    hint1: "What is the total sum of all four interior angles in any quadrilateral?",
    hint2: `Add the three known angles (${a1} + ${a2} + ${a3} = ${a1 + a2 + a3}°), then subtract from 360°.`,
    visual: "figure",
    visualData: {
      species: "quadrilateral",
      points: getCanonicalQuad("quadrilateral"),
      marks: {
        angleLabels: { 0: `${a1}°`, 1: `${a2}°`, 2: `${a3}°`, 3: "?" },
      },
      notToScale: true,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 2: Parallel Pairs & Angle Properties
// ─────────────────────────────────────────────────────────────────────────────
export function generateAnglePropertiesProblem(seed = 0) {
  const shapeKind = seed % 3; // 0: parallelogram, 1: trapezium, 2: kite
  
  if (shapeKind === 0) {
    const angleA = randInt(55, 80);
    const angleB = 180 - angleA;
    const askAdjacent = seed % 2 === 0;

    const targetAngle = askAdjacent ? angleB : angleA;
    const targetLabel = askAdjacent ? "∠B (adjacent)" : "∠C (opposite)";
    const correct = `${targetAngle}°`;
    const distractor = askAdjacent ? `${angleA}°` : `${angleB}°`;

    const options = shuffle([correct, distractor, `${180 - targetAngle + 10}°`, `${targetAngle - 10}°`]);

    return {
      category: "PARALLELOGRAM ANGLES",
      questionText: `In parallelogram ABCD, angle A = ${angleA}°. Find ${targetLabel}.`,
      options,
      correctAnswer: correct,
      explanation: askAdjacent
        ? `In a parallelogram, adjacent (co-interior) angles sum to 180°. So ∠B = 180° − ${angleA}° = ${angleB}°. (Reason: ${REASONS['co-interior-angles-parallel']})`
        : `In a parallelogram, opposite angles are equal. So ∠C = ∠A = ${angleA}°. (Reason: ${REASONS['opposite-angles-parallelogram']})`,
      hint1: askAdjacent ? "Adjacent angles between parallel lines are co-interior: they sum to 180°." : "Opposite angles in a parallelogram are equal.",
      hint2: askAdjacent ? `Calculate 180° − ${angleA}°.` : `∠C is directly opposite to ∠A.`,
      visual: "figure",
      visualData: {
        species: "parallelogram",
        points: getCanonicalQuad("parallelogram"),
        marks: {
          parallelPairs: [[0, 2], [1, 3]],
          angleLabels: { 0: `${angleA}°`, 1: askAdjacent ? "?" : undefined, 2: !askAdjacent ? "?" : undefined },
        },
        notToScale: true,
      },
    };
  } else if (shapeKind === 1) {
    // Trapezium
    const baseAngle = randInt(60, 85);
    const coInterior = 180 - baseAngle;
    const correct = `${coInterior}°`;
    const options = shuffle([correct, `${baseAngle}°`, `${coInterior - 15}°`, `${360 - baseAngle}°`]);

    return {
      category: "TRAPEZIUM ANGLES",
      questionText: `ABCD is a trapezium with AB parallel to DC. If angle A = ${baseAngle}°, find angle D.`,
      options,
      correctAnswer: correct,
      explanation: `Sides AB and DC are parallel. Angles A and D are co-interior angles between parallel lines, so they sum to 180°. ∠D = 180° − ${baseAngle}° = ${coInterior}°. (Reason: ${REASONS['trapezium-co-interior']})`,
      hint1: "AD connects the two parallel sides AB and DC.",
      hint2: `Co-interior angles on parallel lines sum to 180°. Calculate 180° − ${baseAngle}°.`,
      visual: "figure",
      visualData: {
        species: "trapezium",
        points: getCanonicalQuad("trapezium"),
        marks: {
          parallelPairs: [[0, 2]],
          angleLabels: { 0: `${baseAngle}°`, 3: "?" },
        },
        notToScale: true,
      },
    };
  } else {
    // Kite
    const angleA = randInt(70, 95);
    const angleC = randInt(40, 60);
    const remaining = 360 - (angleA + angleC);
    const angleB = Math.round(remaining / 2);
    const correct = `${angleB}°`;
    const options = shuffle([correct, `${remaining}°`, `${angleA}°`, `${180 - angleA}°`]);

    return {
      category: "KITE ANGLES",
      questionText: `In kite ABCD (where AB = AD and CB = CD), angle A = ${angleA}° and angle C = ${angleC}°. Find angle B.`,
      options,
      correctAnswer: correct,
      explanation: `In a kite with AB = AD and CB = CD, the non-vertex opposite angles are equal: ∠B = ∠D. The four angles sum to 360°. ∠B + ∠D = 360° − (${angleA}° + ${angleC}°) = ${remaining}°. Thus ∠B = ${remaining}° ÷ 2 = ${angleB}°. (Reason: ${REASONS['kite-equal-angles']})`,
      hint1: "A kite has exactly one pair of equal opposite angles: ∠B = ∠D.",
      hint2: `Subtract ∠A and ∠C from 360°, then divide the remainder equally between ∠B and ∠D.`,
      visual: "figure",
      visualData: {
        species: "kite",
        points: getCanonicalQuad("kite"),
        marks: {
          equalSidesPairs: [[0, 3], [1, 2]],
          angleLabels: { 0: `${angleA}°`, 2: `${angleC}°`, 1: "?" },
        },
        notToScale: true,
      },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 3: Side Properties & Perimeter
// ─────────────────────────────────────────────────────────────────────────────
export function generateSidePerimeterProblem(seed = 0) {
  const kind = seed % 3; // 0: rhombus side, 1: parallelogram perimeter, 2: kite perimeter
  
  if (kind === 0) {
    const side = randInt(6, 16);
    const perim = side * 4;
    const askSide = seed % 2 === 0;

    if (askSide) {
      const correct = `${side} cm`;
      const options = shuffle([correct, `${perim / 2} cm`, `${side * 2} cm`, `${side - 2} cm`]);
      return {
        category: "RHOMBUS SIDES",
        questionText: `A rhombus animal enclosure has a perimeter of ${perim} cm. Find the length of each side.`,
        options,
        correctAnswer: correct,
        explanation: `A rhombus has 4 equal sides. Each side = Perimeter ÷ 4 = ${perim} ÷ 4 = ${side} cm. (Reason: ${REASONS['rhombus-all-sides-equal']})`,
        hint1: "All four sides of a rhombus are equal in length.",
        hint2: `Divide the total perimeter (${perim} cm) by 4.`,
        visual: "figure",
        visualData: {
          species: "rhombus",
          points: getCanonicalQuad("rhombus"),
          marks: { equalSides: [0, 1, 2, 3] },
        },
      };
    } else {
      const correct = `${perim} cm`;
      const options = shuffle([correct, `${side * 2} cm`, `${side * 3} cm`, `${perim + 8} cm`]);
      return {
        category: "RHOMBUS PERIMETER",
        questionText: `Each side of a rhombus habitat fence measures ${side} cm. What is its total perimeter?`,
        options,
        correctAnswer: correct,
        explanation: `A rhombus has 4 equal sides. Perimeter = 4 × ${side} cm = ${perim} cm. (Reason: ${REASONS['rhombus-all-sides-equal']})`,
        hint1: "A rhombus has 4 sides of equal length.",
        hint2: `Multiply ${side} cm by 4.`,
        visual: "figure",
        visualData: {
          species: "rhombus",
          points: getCanonicalQuad("rhombus"),
          marks: { sideLabels: { 0: `${side} cm` } },
        },
      };
    }
  } else if (kind === 1) {
    const a = randInt(7, 15);
    const b = randInt(4, 9);
    const perim = 2 * (a + b);
    const correct = `${perim} cm`;
    const options = shuffle([correct, `${a + b} cm`, `${2 * a + b} cm`, `${perim + 4} cm`]);

    return {
      category: "PARALLELOGRAM PERIMETER",
      questionText: `A parallelogram habitat reserve has adjacent sides measuring ${a} cm and ${b} cm. Find its perimeter.`,
      options,
      correctAnswer: correct,
      explanation: `Opposite sides of a parallelogram are equal: two sides of ${a} cm and two sides of ${b} cm. Perimeter = 2 × (${a} + ${b}) = 2 × ${a + b} = ${perim} cm. (Reason: ${REASONS['opposite-sides-parallelogram']})`,
      hint1: "Opposite sides of a parallelogram are equal.",
      hint2: `Add the two adjacent sides (${a} + ${b} = ${a + b} cm), then double the sum.`,
      visual: "figure",
      visualData: {
        species: "parallelogram",
        points: getCanonicalQuad("parallelogram"),
        marks: { sideLabels: { 0: `${a} cm`, 1: `${b} cm` } },
      },
    };
  } else {
    // Kite perimeter
    const a = randInt(6, 12);
    const b = randInt(13, 20);
    const perim = 2 * (a + b);
    const correct = `${perim} cm`;
    const options = shuffle([correct, `${a + b} cm`, `${a * 2 + b} cm`, `${perim - 6} cm`]);

    return {
      category: "KITE PERIMETER",
      questionText: `A kite boundary has adjacent sides of ${a} cm and ${b} cm. Find its total perimeter.`,
      options,
      correctAnswer: correct,
      explanation: `A kite has two pairs of equal adjacent sides: two of length ${a} cm and two of length ${b} cm. Perimeter = 2 × (${a} + ${b}) = ${perim} cm.`,
      hint1: "A kite has two pairs of equal adjacent sides.",
      hint2: `Multiply the sum of the two given side lengths by 2.`,
      visual: "figure",
      visualData: {
        species: "kite",
        points: getCanonicalQuad("kite"),
        marks: { equalSidesPairs: [[0, 3], [1, 2]], sideLabels: { 0: `${a} cm`, 1: `${b} cm` } },
      },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 4: Diagonal Properties
// ─────────────────────────────────────────────────────────────────────────────
export function generateDiagonalProblem(seed = 0) {
  const kind = seed % 3; // 0: rectangle diagonals, 1: rhombus diagonals 90°, 2: parallelogram diagonals bisect
  
  if (kind === 0) {
    const half = randInt(6, 14);
    const total = half * 2;
    const askHalf = seed % 2 === 0;

    if (askHalf) {
      const correct = `${half} cm`;
      const options = shuffle([correct, `${total} cm`, `${half * 3} cm`, `${half + 2} cm`]);
      return {
        category: "RECTANGLE DIAGONALS",
        questionText: `The diagonals of rectangle PQRS meet at X. If diagonal PR = ${total} cm, find the length of segment QX.`,
        options,
        correctAnswer: correct,
        explanation: `In a rectangle, diagonals are equal in length (QS = PR = ${total} cm) and bisect each other. Therefore, QX = QS ÷ 2 = ${total} ÷ 2 = ${half} cm. (Reason: ${REASONS['diagonals-rectangle-equal']})`,
        hint1: "The diagonals of a rectangle are equal and bisect each other.",
        hint2: `QS = PR = ${total} cm. QX is half of QS.`,
        visual: "diagonals-overlay",
        visualData: {
          species: "rectangle",
          points: getCanonicalQuad("rectangle"),
          marks: { diagonalIntersection: "X" },
        },
      };
    } else {
      const correct = `${total} cm`;
      const options = shuffle([correct, `${half} cm`, `${total + 4} cm`, `${half * 3} cm`]);
      return {
        category: "RECTANGLE DIAGONALS",
        questionText: `The diagonals of rectangle ABCD intersect at center P. If segment AP = ${half} cm, find diagonal BD.`,
        options,
        correctAnswer: correct,
        explanation: `Diagonals of a rectangle are equal and bisect each other. AC = 2 × AP = ${total} cm, and BD = AC = ${total} cm. (Reason: ${REASONS['diagonals-rectangle-equal']})`,
        hint1: "Rectangle diagonals are equal and bisect each other.",
        hint2: `Diagonal AC is twice AP. BD is equal to AC.`,
        visual: "diagonals-overlay",
        visualData: {
          species: "rectangle",
          points: getCanonicalQuad("rectangle"),
          marks: { diagonalIntersection: "P" },
        },
      };
    }
  } else if (kind === 1) {
    const correct = "90°";
    const options = shuffle(["90°", "60°", "45°", "180°"]);
    return {
      category: "RHOMBUS DIAGONALS",
      questionText: "The diagonals of a rhombus ABCD intersect at point X. What is the measure of angle AXB?",
      options,
      correctAnswer: correct,
      explanation: `The diagonals of any rhombus are perpendicular bisectors of each other. Therefore, the angle between them is always 90°. (Reason: ${REASONS['diagonals-rhombus-perpendicular']})`,
      hint1: "How do the diagonals of a rhombus intersect each other?",
      hint2: "Rhombus diagonals meet at right angles (perpendicular).",
      visual: "diagonals-overlay",
      visualData: {
        species: "rhombus",
        points: getCanonicalQuad("rhombus"),
        marks: { diagonalIntersection: "X", rightAngleCenter: true },
      },
    };
  } else {
    // Parallelogram bisecting
    const len = randInt(5, 12);
    const correct = `${len} cm`;
    const options = shuffle([correct, `${len * 2} cm`, `${len + 3} cm`, `${Math.max(2, len - 2)} cm`]);
    return {
      category: "PARALLELOGRAM DIAGONALS",
      questionText: `In parallelogram ABCD, the diagonals meet at point M. If AM = ${len} cm, find the length of segment MC.`,
      options,
      correctAnswer: correct,
      explanation: `The diagonals of a parallelogram bisect each other. Therefore, M is the midpoint of AC, so MC = AM = ${len} cm.`,
      hint1: "Do the diagonals of a parallelogram bisect each other?",
      hint2: "Point M cuts diagonal AC into two equal halves.",
      visual: "diagonals-overlay",
      visualData: {
        species: "parallelogram",
        points: getCanonicalQuad("parallelogram"),
        marks: { diagonalIntersection: "M" },
      },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 5: Classify from Properties (Most Specific Name)
// ─────────────────────────────────────────────────────────────────────────────
export function generateClassificationProblem(seed = 0) {
  const problems = [
    {
      q: "A quadrilateral's diagonals bisect each other and are equal in length. Nothing else is known. What is its MOST SPECIFIC name?",
      correct: "Rectangle",
      distractors: ["Parallelogram", "Square", "Rhombus"],
      explanation: "Bisecting diagonals makes it a parallelogram; equal diagonals makes it a rectangle. We cannot say square because perpendicularity is not known.",
    },
    {
      q: "A quadrilateral's diagonals bisect each other and are perpendicular (meet at 90°). What is its MOST SPECIFIC name?",
      correct: "Rhombus",
      distractors: ["Parallelogram", "Square", "Kite"],
      explanation: "Bisecting diagonals means parallelogram; perpendicular diagonals adds the rhombus property. Without knowing diagonals are equal, it cannot be called a square.",
    },
    {
      q: "A quadrilateral has diagonals that are equal, perpendicular, and bisect each other. What is its MOST SPECIFIC name?",
      correct: "Square",
      distractors: ["Rectangle", "Rhombus", "Parallelogram"],
      explanation: "Diagonals that are equal, perpendicular, and bisect each other satisfy the defining conditions for a square.",
    },
    {
      q: "A shape has two pairs of parallel opposite sides, but its diagonals are NEITHER equal nor perpendicular. What is its most specific name?",
      correct: "Parallelogram",
      distractors: ["Rectangle", "Rhombus", "Trapezium"],
      explanation: "Two pairs of parallel sides make it a parallelogram. Without equal diagonals (rectangle) or perpendicular diagonals (rhombus), it remains a general parallelogram.",
    },
    {
      q: "A quadrilateral has perpendicular diagonals, but only ONE diagonal is bisected by the other. What is its most specific name?",
      correct: "Kite",
      distractors: ["Rhombus", "Trapezium", "Square"],
      explanation: "Perpendicular diagonals with only one diagonal bisected is the signature property of a kite.",
    },
  ];

  const item = problems[seed % problems.length];
  const options = shuffle([item.correct, ...item.distractors]);

  return {
    category: "MOST SPECIFIC CLASSIFICATION",
    questionText: item.q,
    options,
    correctAnswer: item.correct,
    explanation: item.explanation,
    hint1: "List what each diagonal property gives: bisect = parallelogram, equal = rectangle, perpendicular = rhombus.",
    hint2: "Combine the given clues to choose the most specific title earned.",
    visual: "property-matrix",
    visualData: { highlight: item.correct },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 6: The Family Tree (Inclusion Hierarchy)
// ─────────────────────────────────────────────────────────────────────────────
export function generateHierarchyProblem(seed = 0) {
  const problems = [
    {
      q: "True or False: Every square is a rectangle.",
      correct: "True",
      distractors: ["False", "Only when sides are equal to width", "None of these"],
      explanation: "A rectangle is defined as a quadrilateral with four right angles. Every square has four right angles, so every square is a rectangle.",
    },
    {
      q: "True or False: Every rectangle is a square.",
      correct: "False",
      distractors: ["True", "Always true in Grade 8", "Only when rotated"],
      explanation: "A rectangle only has opposite sides equal. It is only a square if all four sides are equal.",
    },
    {
      q: "True or False: Every square is a rhombus.",
      correct: "True",
      distractors: ["False", "Only if tilted 45°", "Rhombuses have no right angles"],
      explanation: "A rhombus is a quadrilateral with 4 equal sides. Every square has 4 equal sides, so every square is a rhombus.",
    },
    {
      q: "Which statement is ALWAYS true about quadrilaterals?",
      correct: "All rhombuses are parallelograms",
      distractors: [
        "All parallelograms are rhombuses",
        "All rectangles are squares",
        "All trapeziums are parallelograms",
      ],
      explanation: "A rhombus has opposite sides parallel and equal, so it belongs to the parallelogram family.",
    },
    {
      q: "Which of the following describes the relationship between squares and rectangles?",
      correct: "A square is a special type of rectangle with four equal sides",
      distractors: [
        "A square and a rectangle have no properties in common",
        "A rectangle is a special type of square",
        "A square is never a rectangle",
      ],
      explanation: "Squares sit below rectangles in the hierarchy tree: they inherit all rectangle traits plus four equal sides.",
    },
  ];

  const item = problems[seed % problems.length];
  const options = shuffle([item.correct, ...item.distractors]);

  return {
    category: "INCLUSION HIERARCHY",
    questionText: item.q,
    options,
    correctAnswer: item.correct,
    explanation: item.explanation,
    hint1: "Think of the animal family tree: a golden retriever is always a dog, but not every dog is a retriever.",
    hint2: "Check if the first shape satisfies all defining properties of the second shape.",
    visual: "family-tree",
    visualData: {},
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 7: X Marks the Angle (Algebraic Equations)
// ─────────────────────────────────────────────────────────────────────────────
export function generateAlgebraicProblem(seed = 0) {
  const kind = seed % 2; // 0: adjacent angles sum to 180°, 1: opposite angles equal

  if (kind === 0) {
    // (a*x + c) + (b*x + d) = 180
    // Let x = randInt(15, 35)
    const x = pick([15, 20, 25, 30, 35]);
    const a = randInt(2, 3);
    const b = randInt(2, 3);
    // (a + b)*x + c + d = 180
    const sumCoeff = a + b;
    const targetConst = 180 - sumCoeff * x;
    const c = Math.floor(targetConst / 2);
    const d = targetConst - c;

    const angle1 = a * x + c;
    const angle2 = b * x + d;

    const correct = `${x}`;
    const options = shuffle([
      correct,
      `${Math.abs(Math.round((c - d) / (a - b || 1))) || x + 10}`, // Distractor: set equal
      `${x - 5}`,
      `${x + 10}`,
    ]);

    return {
      category: "ALGEBRAIC ANGLES",
      questionText: `In parallelogram ABCD, angle A = (${a}x + ${c})° and adjacent angle B = (${b}x + ${d})°. Find the value of x.`,
      options,
      correctAnswer: correct,
      explanation: `Adjacent angles in a parallelogram are co-interior between parallel lines, so they sum to 180°: (${a}x + ${c}) + (${b}x + ${d}) = 180° ⇒ ${sumCoeff}x + ${c + d} = 180° ⇒ ${sumCoeff}x = ${180 - (c + d)} ⇒ x = ${x}. (Angle A = ${angle1}°, Angle B = ${angle2}°).`,
      hint1: "Adjacent angles of a parallelogram sum to 180° (co-interior).",
      hint2: `Set up the equation: (${a}x + ${c}) + (${b}x + ${d}) = 180.`,
      visual: "figure",
      visualData: {
        species: "parallelogram",
        points: getCanonicalQuad("parallelogram"),
        marks: {
          angleLabels: { 0: `(${a}x+${c})°`, 1: `(${b}x+${d})°` },
        },
        notToScale: true,
      },
    };
  } else {
    // Opposite angles equal: (a*x + c) = (b*x - d)
    const x = pick([18, 22, 25, 30]);
    const a = 3;
    const b = 2;
    // 3x - c = 2x + d => x = c + d
    const c = randInt(10, 25);
    const d = x - c;

    const correct = `${x}`;
    const options = shuffle([correct, `${x + 5}`, `${x - 6}`, `${Math.round((180 - c) / 5)}`]);

    return {
      category: "ALGEBRAIC ANGLES",
      questionText: `In parallelogram ABCD, opposite angles are angle A = (${a}x − ${c})° and angle C = (${b}x + ${d})°. Find the value of x.`,
      options,
      correctAnswer: correct,
      explanation: `Opposite angles of a parallelogram are equal: ${a}x − ${c} = ${b}x + ${d} ⇒ ${a}x − ${b}x = ${d} + ${c} ⇒ x = ${x}. (Both angles equal ${a * x - c}°).`,
      hint1: "Opposite angles in a parallelogram are equal.",
      hint2: `Set them equal: ${a}x − ${c} = ${b}x + ${d}, and solve for x.`,
      visual: "figure",
      visualData: {
        species: "parallelogram",
        points: getCanonicalQuad("parallelogram"),
        marks: {
          angleLabels: { 0: `(${a}x−${c})°`, 2: `(${b}x+${d})°` },
        },
        notToScale: true,
      },
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 8: Give Your Reasons (Multi-step with reasons)
// ─────────────────────────────────────────────────────────────────────────────
export function generateMultiStepReasonProblem(seed = 0) {
  const problems = [
    {
      q: "In rhombus ABCD, angle ABC = 70°, and diagonals meet at P. Find angle PAB, with a stated reason.",
      correct: "55° (Co-interior angles sum to 180°, then diagonal AC bisects angle BAD)",
      distractors: [
        "70° (Opposite angles are equal)",
        "35° (Opposite angles halved directly)",
        "90° (Diagonals are perpendicular)",
      ],
      explanation: "Step 1: In rhombus ABCD, AD || BC, so ∠BAD = 180° − 70° = 110° (co-interior angles). Step 2: Diagonal AC bisects ∠BAD, so ∠PAB = 110° ÷ 2 = 55° (diagonals of a rhombus bisect interior angles).",
      steps: [
        { statement: "∠BAD = 180° − 70° = 110°", reason: "co-interior-angles-parallel" },
        { statement: "∠PAB = 110° ÷ 2 = 55°", reason: "diagonals-rhombus-bisect-angles" },
      ],
      correctAnswer: "55° (Co-interior angles sum to 180°, then diagonal AC bisects angle BAD)",
    },
    {
      q: "In rectangle PQRS, diagonals meet at X. Angle XPQ = 32°. Find angle PXQ with reasons.",
      correct: "116° (Diagonals equal & bisect make triangle PXQ isosceles; angle sum of triangle is 180°)",
      distractors: [
        "64° (Gave 2 × 32° instead of angle PXQ)",
        "90° (Assumed diagonals are perpendicular)",
        "58° (Complementary angle subtracted from 90°)",
      ],
      explanation: "Step 1: Diagonals of a rectangle are equal and bisect each other, so PX = QX, making ΔPXQ isosceles with ∠XQP = ∠XPQ = 32°. Step 2: In ΔPXQ, ∠PXQ = 180° − (32° + 32°) = 116° (angle sum of triangle).",
      steps: [
        { statement: "PX = QX, so ∠XQP = 32°", reason: "diagonals-rectangle-equal" },
        { statement: "∠PXQ = 180° − 64° = 116°", reason: "angle-sum-triangle" },
      ],
      correctAnswer: "116° (Diagonals equal & bisect make triangle PXQ isosceles; angle sum of triangle is 180°)",
    },
    {
      q: "In kite ABCD (AB = AD, BC = CD), angle BCD = 44° and angle BAD = 100°. The diagonals meet at M. Find angle MBC.",
      correct: "68° (Diagonal AC bisects angle BCD, and diagonals intersect at 90°)",
      distractors: [
        "44° (Assumed angle equals BCD)",
        "56° (Subtract from 100°)",
        "90° (Gave the intersection angle)",
      ],
      explanation: "Step 1: The main diagonal AC bisects ∠BCD, so ∠MCB = 44° ÷ 2 = 22°. Step 2: Kite diagonals meet at 90° (∠BMC = 90°). Step 3: In right triangle BMC, ∠MBC = 180° − (90° + 22°) = 68°.",
      steps: [
        { statement: "∠MCB = 44° ÷ 2 = 22°", reason: "kite-equal-angles" },
        { statement: "∠BMC = 90°", reason: "diagonals-rhombus-perpendicular" },
        { statement: "∠MBC = 180° − 112° = 68°", reason: "angle-sum-triangle" },
      ],
      correctAnswer: "68° (Diagonal AC bisects angle BCD, and diagonals intersect at 90°)",
    },
  ];

  const item = problems[seed % problems.length];
  const options = shuffle([item.correct, ...item.distractors]);

  return {
    category: "MULTI-STEP WITH REASONS",
    questionText: item.q,
    options,
    correctAnswer: item.correct,
    explanation: item.explanation,
    hint1: "Break the problem into two steps: first find the intermediate angle, then use the triangle or diagonal property.",
    hint2: "Every claim requires a geometric justification.",
    visual: "step-reasons",
    visualData: { steps: item.steps },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORLD 9: The Grand Field Guide (Mixed Review)
// ─────────────────────────────────────────────────────────────────────────────
export function generateMixedReviewProblem(seed = 0) {
  const pool = [
    generateIdentifyProblem,
    generateAngleSumProblem,
    generateAnglePropertiesProblem,
    generateSidePerimeterProblem,
    generateDiagonalProblem,
    generateClassificationProblem,
    generateHierarchyProblem,
    generateAlgebraicProblem,
    generateMultiStepReasonProblem,
  ];

  const generator = pool[seed % pool.length];
  const problem = generator(seed + 17);
  problem.category = `GRAND REVIEW · ${problem.category}`;
  return problem;
}
