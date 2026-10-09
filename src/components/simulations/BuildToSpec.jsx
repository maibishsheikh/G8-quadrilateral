// src/components/simulations/BuildToSpec.jsx
// Station 1: Build-to-Target Challenge (TRD §6)
import React, { useState, useMemo } from 'react';
import { fromDiagonals, normalizeToBox } from '../../utils/quadGeometry.js';
import { evaluateProperties, mostSpecificName } from '../../utils/quadProperties.js';
import './Stations.css';

const TARGET_SPECS = [
  {
    id: 0,
    title: "Spec Alpha: The True Rhombus",
    description: "Diagonals must be perpendicular (meet at 90°) and bisect each other, but diagonals must NOT be equal in length.",
    targetSpecies: "Rhombus",
    checks: [
      { id: 'perp', label: "Diagonals Perpendicular (θ = 90°)", test: (p) => p.diagonalsPerpendicular },
      { id: 'bisect', label: "Diagonals Bisect Each Other (s₁ = s₂ = 0.5)", test: (p) => p.diagonalsBisect },
      { id: 'unequal', label: "Diagonals Not Equal in Length", test: (p) => !p.diagonalsEqual },
    ],
  },
  {
    id: 1,
    title: "Spec Beta: The Pure Rectangle",
    description: "Diagonals must be equal in length and bisect each other, but must NOT be perpendicular.",
    targetSpecies: "Rectangle",
    checks: [
      { id: 'equal', label: "Diagonals Equal in Length (d₁ = d₂)", test: (p) => p.diagonalsEqual },
      { id: 'bisect', label: "Diagonals Bisect Each Other (s₁ = s₂ = 0.5)", test: (p) => p.diagonalsBisect },
      { id: 'not_perp', label: "Diagonals Not Perpendicular (θ ≠ 90°)", test: (p) => !p.diagonalsPerpendicular },
    ],
  },
  {
    id: 2,
    title: "Spec Gamma: The Savanna Kite",
    description: "Diagonals must be perpendicular, but only one diagonal is bisected by the other.",
    targetSpecies: "Kite",
    checks: [
      { id: 'perp', label: "Diagonals Perpendicular (θ = 90°)", test: (p) => p.diagonalsPerpendicular },
      { id: 'one_bisect', label: "Only One Diagonal Bisected (s₂ = 0.5, s₁ ≠ 0.5)", test: (p, s1, s2) => Math.abs(s2 - 0.5) < 0.05 && Math.abs(s1 - 0.5) > 0.1 },
      { id: 'unequal', label: "Diagonals Not Equal", test: (p) => !p.diagonalsEqual },
    ],
  },
];

export default function BuildToSpec({ onComplete, audioEnabled }) {
  const [specIndex, setSpecIndex] = useState(0);
  const [completedSpecs, setCompletedSpecs] = useState(new Set());

  // Sliders
  const [d1, setD1] = useState(120);
  const [d2, setD2] = useState(90);
  const [theta, setTheta] = useState(60);
  const [s1, setS1] = useState(0.5);
  const [s2, setS2] = useState(0.5);

  const currentSpec = TARGET_SPECS[specIndex];

  // Coordinates & evaluated properties
  const rad = (theta * Math.PI) / 180;
  const rawPoints = useMemo(() => fromDiagonals(d1, d2, rad, s1, s2), [d1, d2, rad, s1, s2]);
  const properties = useMemo(() => evaluateProperties(rawPoints, 0.04), [rawPoints]);
  const currentSpecies = useMemo(() => mostSpecificName(properties) || 'Quadrilateral', [properties]);

  // Check conditions
  const checkResults = useMemo(() => {
    return currentSpec.checks.map(chk => ({
      id: chk.id,
      label: chk.label,
      passed: chk.test(properties, s1, s2),
    }));
  }, [currentSpec, properties, s1, s2]);

  const allPassed = checkResults.every(r => r.passed);

  React.useEffect(() => {
    if (allPassed && !completedSpecs.has(specIndex)) {
      setCompletedSpecs(prev => new Set([...prev, specIndex]));
    }
  }, [allPassed, specIndex, completedSpecs]);

  const pts = normalizeToBox(rawPoints, 300, 210, 30);
  const polygonPoints = pts.map(p => `${p.x},${p.y}`).join(' ');
  const [A, B, C, D] = pts;

  const nextSpec = () => {
    setSpecIndex((specIndex + 1) % TARGET_SPECS.length);
    // Reset sliders to a neutral starting point
    setD1(120);
    setD2(80);
    setTheta(55);
    setS1(0.4);
    setS2(0.6);
  };

  return (
    <div className="station-container anim-fade-in">
      <div className="station-header">
        <div className="station-badge">Station 2 · Build-to-Target Challenge</div>
        <h2 className="station-title">Build to Spec 📐</h2>
        <p className="station-desc">
          Ranger mission: adjust the diagonal sliders until your quadrilateral fulfills every requirement on the habitat specification card!
        </p>
      </div>

      <div className="station-grid-2col">
        {/* Left: Spec Card & Visual */}
        <div className="station-viz-card glass-card">
          <div className="target-spec-banner">
            <span className="spec-tag">MISSION TARGET</span>
            <h3 className="spec-title">{currentSpec.title}</h3>
            <p className="spec-desc">{currentSpec.description}</p>
          </div>

          <svg width="300" height="210" viewBox="0 0 300 210" className="station-svg">
            <defs>
              <linearGradient id="specGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7A9E3F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C9A227" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            <g stroke="#E0A458" strokeWidth="1.8" strokeDasharray="4 3">
              <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
              <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} />
            </g>

            <polygon
              points={polygonPoints}
              fill="url(#specGrad)"
              stroke={allPassed ? "#4caf50" : "#ffca28"}
              strokeWidth="2.5"
            />

            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#C9A227" stroke="#fff" strokeWidth="1.5" />
            ))}
          </svg>

          {/* Current Species detection tag */}
          <div className="current-built-tag">
            Current Built Species: <strong style={{ color: allPassed ? '#4caf50' : 'var(--gold)' }}>{currentSpecies}</strong>
          </div>
        </div>

        {/* Right: Checklist & Sliders */}
        <div className="station-controls-card glass-card">
          <h3 className="card-section-title">Spec Checklist</h3>
          <div className="spec-checklist">
            {checkResults.map(chk => (
              <div key={chk.id} className={`checklist-item ${chk.passed ? 'passed' : 'pending'}`}>
                <span className="chk-icon">{chk.passed ? '✅' : '⚪'}</span>
                <span className="chk-label">{chk.label}</span>
                <span className="chk-status">{chk.passed ? 'MET' : 'NOT MET'}</span>
              </div>
            ))}
          </div>

          <h3 className="card-section-title" style={{ marginTop: '16px' }}>Controls</h3>
          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>Diagonal 1 (AC): <strong>{d1}</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setD1(v => Math.max(50, v - 5))}>−</button>
                <button onClick={() => setD1(v => Math.min(150, v + 5))}>+</button>
              </div>
            </div>
            <input type="range" min="50" max="150" value={d1} onChange={e => setD1(Number(e.target.value))} />
          </div>

          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>Diagonal 2 (BD): <strong>{d2}</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setD2(v => Math.max(50, v - 5))}>−</button>
                <button onClick={() => setD2(v => Math.min(150, v + 5))}>+</button>
              </div>
            </div>
            <input type="range" min="50" max="150" value={d2} onChange={e => setD2(Number(e.target.value))} />
          </div>

          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>Angle (θ): <strong>{theta}°</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setTheta(v => Math.max(30, v - 5))}>−</button>
                <button onClick={() => setTheta(v => Math.min(150, v + 5))}>+</button>
              </div>
            </div>
            <input type="range" min="30" max="150" value={theta} onChange={e => setTheta(Number(e.target.value))} />
          </div>

          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>Split s₁ / s₂: <strong>{s1.toFixed(2)} / {s2.toFixed(2)}</strong></span>
              <div className="kbd-btns">
                <button onClick={() => { setS1(0.5); setS2(0.5); }}>Snap 0.5</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="range" min="0.2" max="0.8" step="0.05" value={s1} onChange={e => setS1(Number(e.target.value))} />
              <input type="range" min="0.2" max="0.8" step="0.05" value={s2} onChange={e => setS2(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      {/* Completion or Try Next Spec bar */}
      <div className="spec-bottom-bar glass-card">
        {allPassed ? (
          <div className="station-success anim-bounce-in" style={{ width: '100%' }}>
            <span className="success-icon">🎯</span>
            <div className="success-text">
              <strong>Spec Met!</strong> You successfully constructed the required {currentSpec.targetSpecies}!
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline btn-sm" onClick={nextSpec}>
                Try Another Spec 🔄
              </button>
              <button className="btn btn-primary btn-md" onClick={onComplete}>
                Complete Station ✓
              </button>
            </div>
          </div>
        ) : (
          <div className="spec-hint-text">
            💡 Adjust the sliders until all three checklist items above show <strong>MET</strong>.
          </div>
        )}
      </div>
    </div>
  );
}
