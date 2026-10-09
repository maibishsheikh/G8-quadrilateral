// src/utils/quadProperties.js
// Computed Property Table, Inclusion Hierarchy, Reasons & Misconceptions (TRD §4.4)
import {
  fromDiagonals,
  sideLengths,
  interiorAngles,
  diagonalFacts,
  areParallel,
  isConvex,
  dist,
  getCanonicalQuad,
  TOLERANCE,
} from './quadGeometry.js';

export const DEFINITION_POLICY = {
  trapezium: 'exactly_one_pair_parallel',
  kite: 'two_pairs_equal_adjacent_not_all_equal',
};

export const BORDERLINE_RELATIONS = [
  'parallelogram_in_trapezium',
  'rhombus_in_kite',
  'square_in_kite',
];

/**
 * Evaluates geometric properties of a given polygon points [A, B, C, D]
 */
export function evaluateProperties(q, tol = TOLERANCE) {
  if (!isConvex(q)) {
    return {
      convex: false,
      hasOneParallelPair: false,
      hasTwoParallelPairs: false,
      hasOppositeSidesEqual: false,
      hasAllSidesEqual: false,
      hasTwoAdjacentPairsEqual: false,
      hasAllRightAngles: false,
      hasOppositeAnglesEqual: false,
      diagonalsEqual: false,
      diagonalsBisect: false,
      diagonalsPerpendicular: false,
      diagonalsBisectAngles: false,
      species: 'Unknown',
    };
  }

  const s = sideLengths(q);
  const a = interiorAngles(q);
  const d = diagonalFacts(q, tol);

  // Parallel sides: AB (0) vs CD (2), BC (1) vs DA (3)
  const par02 = areParallel(q, 0, 2, tol);
  const par13 = areParallel(q, 1, 3, tol);
  const hasTwoParallelPairs = par02 && par13;
  const hasOneParallelPair = (par02 || par13) && !hasTwoParallelPairs;

  // Sides
  const sMax = Math.max(...s);
  const oppEqual = Math.abs(s[0] - s[2]) / sMax < tol && Math.abs(s[1] - s[3]) / sMax < tol;
  const allEqual =
    Math.abs(s[0] - s[1]) / sMax < tol &&
    Math.abs(s[1] - s[2]) / sMax < tol &&
    Math.abs(s[2] - s[3]) / sMax < tol;
  
  // Kite adjacent sides: (AB = AD && BC = CD) or (AB = BC && CD = DA)
  const kiteSides1 = Math.abs(s[0] - s[3]) / sMax < tol && Math.abs(s[1] - s[2]) / sMax < tol;
  const kiteSides2 = Math.abs(s[0] - s[1]) / sMax < tol && Math.abs(s[2] - s[3]) / sMax < tol;
  const hasTwoAdjacentPairsEqual = (kiteSides1 || kiteSides2) && !allEqual;

  // Angles
  const allRightAngles = a.every(ang => Math.abs(ang - 90) < tol * 180);
  const oppAnglesEqual =
    Math.abs(a[0] - a[2]) < tol * 180 && Math.abs(a[1] - a[3]) < tol * 180;

  return {
    convex: true,
    hasOneParallelPair,
    hasTwoParallelPairs,
    hasOppositeSidesEqual: oppEqual,
    hasAllSidesEqual: allEqual,
    hasTwoAdjacentPairsEqual,
    hasAllRightAngles: allRightAngles,
    hasOppositeAnglesEqual: oppAnglesEqual,
    diagonalsEqual: d.equal,
    diagonalsBisect: d.bisectEachOther,
    diagonalsPerpendicular: d.perpendicular,
    diagonalsBisectAngles: d.bisectAngles,
  };
}

// Canonical species list
export const SPECIES_LIST = [
  'square',
  'rectangle',
  'rhombus',
  'parallelogram',
  'trapezium',
  'kite',
  'quadrilateral',
];

/**
 * PROPERTY_TABLE computed dynamically from canonical constructions
 */
export const PROPERTY_TABLE = (function buildPropertyTable() {
  const table = {};
  for (const sp of SPECIES_LIST) {
    const q = getCanonicalQuad(sp);
    table[sp] = evaluateProperties(q, 1e-3);
  }
  return table;
})();

/**
 * Hierarchy of inclusions
 */
export const HIERARCHY = {
  square: ['rectangle', 'rhombus', 'parallelogram', 'quadrilateral'],
  rectangle: ['parallelogram', 'quadrilateral'],
  rhombus: ['parallelogram', 'quadrilateral'],
  parallelogram: ['quadrilateral'],
  trapezium: ['quadrilateral'],
  kite: ['quadrilateral'],
  quadrilateral: [],
};

/**
 * Return most specific name from a set of confirmed property flags
 */
export function mostSpecificName(p) {
  if (!p) return null;

  // Square: 4 equal sides + 4 right angles (or diagonals equal + perp + bisect)
  if (
    (p.hasAllSidesEqual && p.hasAllRightAngles) ||
    (p.diagonalsEqual && p.diagonalsPerpendicular && p.diagonalsBisect)
  ) {
    return 'Square';
  }

  // Rhombus: 4 equal sides (or diagonals perp + bisect)
  if (
    p.hasAllSidesEqual ||
    (p.diagonalsPerpendicular && p.diagonalsBisect) ||
    (p.hasOppositeSidesEqual && p.diagonalsPerpendicular)
  ) {
    return 'Rhombus';
  }

  // Rectangle: 4 right angles (or diagonals equal + bisect)
  if (
    p.hasAllRightAngles ||
    (p.diagonalsEqual && p.diagonalsBisect) ||
    (p.hasOppositeSidesEqual && p.diagonalsEqual)
  ) {
    return 'Rectangle';
  }

  // Parallelogram: opposite sides parallel / bisecting diagonals
  if (
    p.hasTwoParallelPairs ||
    p.diagonalsBisect ||
    (p.hasOppositeSidesEqual && p.hasOppositeAnglesEqual)
  ) {
    return 'Parallelogram';
  }

  // Kite: two pairs of equal adjacent sides, perpendicular diagonals (one bisected)
  if (
    p.hasTwoAdjacentPairsEqual ||
    (p.diagonalsPerpendicular && !p.diagonalsBisect)
  ) {
    return 'Kite';
  }

  // Trapezium: exactly one pair of parallel sides
  if (p.hasOneParallelPair) {
    return 'Trapezium';
  }

  return 'Quadrilateral';
}

/**
 * Standard reasons for geometric arguments
 */
export const REASONS = {
  'angle-sum-quadrilateral': 'Angle sum of a quadrilateral is 360°',
  'opposite-angles-parallelogram': 'Opposite angles of a parallelogram are equal',
  'co-interior-angles-parallel': 'Co-interior angles between parallel lines sum to 180°',
  'diagonals-rhombus-perpendicular': 'Diagonals of a rhombus intersect at 90° (perpendicular)',
  'diagonals-rhombus-bisect-angles': 'Diagonals of a rhombus bisect the interior angles',
  'angle-sum-triangle': 'Angle sum of a triangle is 180°',
  'kite-equal-angles': 'One pair of opposite angles of a kite are equal',
  'diagonals-rectangle-equal': 'Diagonals of a rectangle are equal and bisect each other',
  'opposite-sides-parallelogram': 'Opposite sides of a parallelogram are equal',
  'rhombus-all-sides-equal': 'All four sides of a rhombus are equal',
  'trapezium-co-interior': 'Angles between parallel sides of a trapezium sum to 180°',
};

/**
 * Misconception generator for realistic distractors and error-detective tasks
 */
export const misconception = {
  classifyByLooks: {
    statement: "It looks slanted and tilted, so it cannot be a rectangle.",
    correction: "Classify by features (right angles & equal diagonals), never by orientation or appearance.",
  },
  squareOnlySquare: {
    statement: "A square is only a square; it is not a rectangle.",
    correction: "A square has four right angles and opposite sides parallel, so it IS a rectangle.",
  },
  rhombusDiagonalsEqual: {
    statement: "The diagonals of any rhombus are equal in length.",
    correction: "Diagonals of a rhombus are perpendicular, but only equal if it is a square.",
  },
  rectangleDiagonalsPerpendicular: {
    statement: "The diagonals of a rectangle meet at 90 degrees.",
    correction: "Rectangle diagonals are equal and bisect each other, but only perpendicular if it is a square.",
  },
  confuseEqualVsBisect: {
    statement: "Parallelogram diagonals are equal in length.",
    correction: "Parallelogram diagonals bisect each other, but are not necessarily equal.",
  },
  adjacentAnglesEqual: {
    statement: "Adjacent angles of a parallelogram are equal.",
    correction: "Adjacent angles of a parallelogram sum to 180° (co-interior), while opposite angles are equal.",
  },
  oppositeAnglesSupplementary: {
    statement: "Opposite angles of a parallelogram sum to 180°.",
    correction: "Opposite angles of a parallelogram are equal; adjacent angles sum to 180°.",
  },
  kiteOppositeSidesEqual: {
    statement: "A kite has opposite sides equal.",
    correction: "A kite has two pairs of equal ADJACENT sides, not opposite sides.",
  },
  kiteParallel: {
    statement: "A kite has two pairs of parallel sides.",
    correction: "A standard kite has no parallel sides.",
  },
  angleSum180: {
    statement: "The sum of interior angles of a quadrilateral is 180°.",
    correction: "The sum of interior angles of a quadrilateral is 360° (twice a triangle's 180°).",
  },
  lessSpecificAsMostSpecific: {
    statement: "A shape with 4 equal sides and 4 right angles is called a Parallelogram.",
    correction: "While it is a parallelogram, its MOST SPECIFIC name is Square.",
  },
};
