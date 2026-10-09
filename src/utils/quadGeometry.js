// src/utils/quadGeometry.js
// Pure Geometry Engine for QuadQuest (TRD §4.4)
// Coordinates in, measurements out. No hand-typed facts live here.

export const TOLERANCE = 1e-4;
export const SLIDER_TOLERANCE = 0.05; // Looser tolerance for interactive sliders

/**
 * Builds vertices A, B, C, D from two diagonals AC and BD
 * @param {number} d1 Length of diagonal AC
 * @param {number} d2 Length of diagonal BD
 * @param {number} theta Angle in radians or degrees (if > Math.PI, treated as degrees)
 * @param {number} s1 Ratio dividing AC at intersection P (0 < s1 < 1)
 * @param {number} s2 Ratio dividing BD at intersection P (0 < s2 < 1)
 * @returns {Array<{x: number, y: number, name: string}>} [A, B, C, D]
 */
export function fromDiagonals(d1, d2, theta, s1 = 0.5, s2 = 0.5) {
  const rad = theta > Math.PI ? (theta * Math.PI) / 180 : theta;
  
  // P is at origin (0, 0)
  // AC lies along the x-axis: A is left of P, C is right of P
  const A = { x: -s1 * d1, y: 0, name: 'A' };
  const C = { x: (1 - s1) * d1, y: 0, name: 'C' };

  // BD lies along line at angle rad: B is opposite to D
  const B = {
    x: -s2 * d2 * Math.cos(rad),
    y: -s2 * d2 * Math.sin(rad),
    name: 'B',
  };
  const D = {
    x: (1 - s2) * d2 * Math.cos(rad),
    y: (1 - s2) * d2 * Math.sin(rad),
    name: 'D',
  };

  return [A, B, C, D];
}

/**
 * Distance between two points
 */
export function dist(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Calculates side lengths [AB, BC, CD, DA]
 */
export function sideLengths(q) {
  const [A, B, C, D] = q;
  return [
    dist(A, B),
    dist(B, C),
    dist(C, D),
    dist(D, A),
  ];
}

/**
 * Angle at vertex B formed by rays BA and BC in degrees
 */
export function angleBetween(p1, pCenter, p2) {
  const v1 = { x: p1.x - pCenter.x, y: p1.y - pCenter.y };
  const v2 = { x: p2.x - pCenter.x, y: p2.y - pCenter.y };
  
  const dot = v1.x * v2.x + v1.y * v2.y;
  const cross = v1.x * v2.y - v1.y * v2.x;
  
  let angle = Math.atan2(Math.abs(cross), dot) * (180 / Math.PI);
  return angle;
}

/**
 * Calculates interior angles [∠A, ∠B, ∠C, ∠D] in degrees
 */
export function interiorAngles(q) {
  const [A, B, C, D] = q;
  return [
    angleBetween(D, A, B), // ∠A (D-A-B)
    angleBetween(A, B, C), // ∠B (A-B-C)
    angleBetween(B, C, D), // ∠C (B-C-D)
    angleBetween(C, D, A), // ∠D (C-D-A)
  ];
}

/**
 * Vector between two points
 */
function vec(p1, p2) {
  return { x: p2.x - p1.x, y: p2.y - p1.y };
}

/**
 * Cross product of 2D vectors
 */
function crossProduct(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

/**
 * Dot product of 2D vectors
 */
function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

/**
 * Checks if quadrilateral is convex
 */
export function isConvex(q) {
  if (!q || q.length !== 4) return false;
  let prevSign = 0;
  for (let i = 0; i < 4; i++) {
    const p1 = q[i];
    const p2 = q[(i + 1) % 4];
    const p3 = q[(i + 2) % 4];
    const cp = crossProduct(vec(p1, p2), vec(p2, p3));
    if (Math.abs(cp) < 1e-7) return false; // collinear
    const sign = Math.sign(cp);
    if (prevSign === 0) {
      prevSign = sign;
    } else if (sign !== prevSign) {
      return false;
    }
  }
  return true;
}

/**
 * Tests if side i is parallel to side j
 * Side 0: AB, 1: BC, 2: CD, 3: DA
 */
export function areParallel(q, i, j, tol = TOLERANCE) {
  const v1 = vec(q[i], q[(i + 1) % 4]);
  const v2 = vec(q[j], q[(j + 1) % 4]);
  const len1 = Math.hypot(v1.x, v1.y);
  const len2 = Math.hypot(v2.x, v2.y);
  if (len1 < tol || len2 < tol) return false;
  
  // normalized cross product
  const cross = Math.abs(crossProduct(v1, v2)) / (len1 * len2);
  return cross < tol;
}

/**
 * Diagonal facts computed directly from coordinates
 */
export function diagonalFacts(q, tol = TOLERANCE) {
  const [A, B, C, D] = q;
  const dAC = dist(A, C);
  const dBD = dist(B, D);

  // Equal
  const equal = Math.abs(dAC - dBD) / Math.max(dAC, dBD) < tol;

  // Midpoints
  const midAC = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const midBD = { x: (B.x + D.x) / 2, y: (B.y + D.y) / 2 };
  const bisectEachOther = dist(midAC, midBD) / Math.max(dAC, dBD) < tol;

  // Perpendicular
  const vAC = vec(A, C);
  const vBD = vec(B, D);
  const dot = Math.abs(dotProduct(vAC, vBD)) / (dAC * dBD);
  const perpendicular = dot < tol;

  // Bisect angles: check if diagonal AC bisects ∠A and ∠C
  const angleA1 = angleBetween(D, A, C);
  const angleA2 = angleBetween(C, A, B);
  const angleC1 = angleBetween(B, C, A);
  const angleC2 = angleBetween(A, C, D);
  const bisectAngles =
    Math.abs(angleA1 - angleA2) < tol * 180 &&
    Math.abs(angleC1 - angleC2) < tol * 180;

  return { equal, bisectEachOther, perpendicular, bisectAngles };
}

/**
 * Generates canonical construction for a named special quadrilateral
 */
export function getCanonicalQuad(speciesName) {
  switch (speciesName.toLowerCase()) {
    case 'square':
      return fromDiagonals(100, 100, Math.PI / 2, 0.5, 0.5);
    case 'rhombus':
      return fromDiagonals(120, 80, Math.PI / 2, 0.5, 0.5);
    case 'rectangle':
      return fromDiagonals(100, 100, Math.PI / 3, 0.5, 0.5);
    case 'parallelogram':
      return fromDiagonals(120, 80, Math.PI / 3, 0.5, 0.5);
    case 'kite':
      return fromDiagonals(110, 80, Math.PI / 2, 0.3, 0.5);
    case 'trapezium':
      // s1 = s2 != 0.5 gives AB || CD with AD not parallel to BC
      return fromDiagonals(110, 90, (70 * Math.PI) / 180, 0.35, 0.35);
    default:
      // General convex quadrilateral
      return fromDiagonals(110, 85, (65 * Math.PI) / 180, 0.35, 0.6);
  }
}

/**
 * Distorts a quadrilateral specification for "Not drawn to scale" rendering.
 * Modifies visual aspect ratio or angles slightly while keeping labeled relations intact.
 */
export function distortNotToScale(points, factor = 0.15) {
  // Apply a subtle non-uniform shear/scale so angle measurements cannot be visual
  return points.map(p => ({
    x: p.x * (1 + factor * 0.4) + p.y * 0.08,
    y: p.y * (1 - factor * 0.3) + p.x * 0.05,
    name: p.name,
  }));
}

/**
 * Center and scale points to fit comfortably in an SVG box (w, h)
 */
export function normalizeToBox(points, width = 240, height = 180, padding = 25) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min((width - 2 * padding) / spanX, (height - 2 * padding) / spanY);
  
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  
  return points.map(p => ({
    x: Math.round((width / 2 + (p.x - cx) * scale) * 10) / 10,
    y: Math.round((height / 2 + (p.y - cy) * scale) * 10) / 10,
    name: p.name,
  }));
}
