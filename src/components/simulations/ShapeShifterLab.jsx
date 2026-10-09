// src/components/simulations/ShapeShifterLab.jsx
// Station 0: Concept Discovery Lab (TRD §6)
import React, { useState, useMemo } from 'react';
import { fromDiagonals, normalizeToBox } from '../../utils/quadGeometry.js';
import { evaluateProperties, mostSpecificName } from '../../utils/quadProperties.js';
import './Stations.css';

export default function ShapeShifterLab({ onComplete, audioEnabled }) {
  // 5 Sliders feeding fromDiagonals(d1, d2, theta, s1, s2)
  const [d1, setD1] = useState(120);
  const [d2, setD2] = useState(80);
  const [theta, setTheta] = useState(65); // degrees
  const [s1, setS1] = useState(0.5);
  const [s2, setS2] = useState(0.5);

  // Track discovered species
  const [discovered, setDiscovered] = useState(new Set(['Parallelogram']));
  const [confirmationAnswer, setConfirmationAnswer] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Calculate coordinates & properties
  const rad = (theta * Math.PI) / 180;
  const rawPoints = useMemo(() => fromDiagonals(d1, d2, rad, s1, s2), [d1, d2, rad, s1, s2]);
  const properties = useMemo(() => evaluateProperties(rawPoints, 0.03), [rawPoints]);
  const currentSpecies = useMemo(() => mostSpecificName(properties) || 'Quadrilateral', [properties]);

  // Update discovered set
  React.useEffect(() => {
    if (currentSpecies && !discovered.has(currentSpecies)) {
      setDiscovered(prev => new Set([...prev, currentSpecies]));
    }
  }, [currentSpecies, discovered]);

  const pts = normalizeToBox(rawPoints, 320, 220, 32);
  const polygonPoints = pts.map(p => `${p.x},${p.y}`).join(' ');
  const [A, B, C, D] = pts;
  const midX = (A.x + C.x + B.x + D.x) / 4;
  const midY = (A.y + C.y + B.y + D.y) / 4;

  const canAttemptConfirmation = discovered.size >= 4;

  // Preset buttons to help students snap to exact geometric species
  const applyPreset = (type) => {
    switch (type) {
      case 'square':
        setD1(100); setD2(100); setTheta(90); setS1(0.5); setS2(0.5); break;
      case 'rhombus':
        setD1(120); setD2(75); setTheta(90); setS1(0.5); setS2(0.5); break;
      case 'rectangle':
        setD1(110); setD2(110); setTheta(60); setS1(0.5); setS2(0.5); break;
      case 'parallelogram':
        setD1(120); setD2(80); setTheta(60); setS1(0.5); setS2(0.5); break;
      case 'kite':
        setD1(120); setD2(80); setTheta(90); setS1(0.3); setS2(0.5); break;
      case 'trapezium':
        setD1(110); setD2(80); setTheta(65); setS1(0.35); setS2(0.35); break;
      default:
        break;
    }
  };

  const handleConfirm = (ans) => {
    setConfirmationAnswer(ans);
    if (ans === 'equal_diagonals') {
      setIsConfirmed(true);
    }
  };

  return (
    <div className="station-container anim-fade-in">
      <div className="station-header">
        <div className="station-badge">Station 1 · Concept Discovery Lab</div>
        <h2 className="station-title">The Shape Shifter Lab 🧪</h2>
        <p className="station-desc">
          Reshape a creature built from its crossing diagonals. Watch how changing diagonal lengths, angles, and split points transforms one species into another!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="station-grid-2col">
        {/* Left: SVG Canvas & Live Species Badge */}
        <div className="station-viz-card glass-card">
          <div className="species-live-pill">
            <span className="pill-label">Detected Species:</span>
            <span className="pill-species">{currentSpecies}</span>
          </div>

          <svg width="320" height="220" viewBox="0 0 320 220" className="station-svg">
            <defs>
              <linearGradient id="shifterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3F8F8F" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Diagonals */}
            <g stroke="#E0A458" strokeWidth="1.8" strokeDasharray="4 3">
              <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
              <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} />
              <circle cx={midX} cy={midY} r="4" fill="#E0A458" />
              <text x={midX + 7} y={midY - 7} fill="#ffe082" fontSize="11" fontWeight="bold">P</text>
            </g>

            {/* Polygon */}
            <polygon
              points={polygonPoints}
              fill="url(#shifterGrad)"
              stroke="#ffca28"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Vertices */}
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4.5" fill="#C9A227" stroke="#fff" strokeWidth="1.2" />
                <text
                  x={p.x + (p.x > midX ? 12 : -12)}
                  y={p.y + (p.y > midY ? 12 : -12) + 4}
                  fill="#ffe082"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {['A', 'B', 'C', 'D'][i]}
                </text>
              </g>
            ))}
          </svg>

          {/* Quick Presets */}
          <div className="preset-bar">
            <span className="preset-label">Snap Presets:</span>
            <div className="preset-btns">
              <button className="preset-btn" onClick={() => applyPreset('parallelogram')}>Parallelogram</button>
              <button className="preset-btn" onClick={() => applyPreset('rectangle')}>Rectangle</button>
              <button className="preset-btn" onClick={() => applyPreset('rhombus')}>Rhombus</button>
              <button className="preset-btn" onClick={() => applyPreset('square')}>Square</button>
              <button className="preset-btn" onClick={() => applyPreset('kite')}>Kite</button>
              <button className="preset-btn" onClick={() => applyPreset('trapezium')}>Trapezium</button>
            </div>
          </div>
        </div>

        {/* Right: 5 Sliders & Live Property Checklist */}
        <div className="station-controls-card glass-card">
          <h3 className="card-section-title">Diagonal Parameters</h3>

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
              <span>Intersection Angle (θ): <strong>{theta}°</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setTheta(v => Math.max(30, v - 5))}>−</button>
                <button onClick={() => setTheta(v => Math.min(150, v + 5))}>+</button>
              </div>
            </div>
            <input type="range" min="30" max="150" value={theta} onChange={e => setTheta(Number(e.target.value))} />
          </div>

          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>P divides AC (s₁): <strong>{s1.toFixed(2)}</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setS1(v => Math.max(0.2, +(v - 0.05).toFixed(2)))}>−</button>
                <button onClick={() => setS1(v => Math.min(0.8, +(v + 0.05).toFixed(2)))}>+</button>
              </div>
            </div>
            <input type="range" min="0.2" max="0.8" step="0.05" value={s1} onChange={e => setS1(Number(e.target.value))} />
          </div>

          <div className="control-slider-group">
            <div className="slider-label-row">
              <span>P divides BD (s₂): <strong>{s2.toFixed(2)}</strong></span>
              <div className="kbd-btns">
                <button onClick={() => setS2(v => Math.max(0.2, +(v - 0.05).toFixed(2)))}>−</button>
                <button onClick={() => setS2(v => Math.min(0.8, +(v + 0.05).toFixed(2)))}>+</button>
              </div>
            </div>
            <input type="range" min="0.2" max="0.8" step="0.05" value={s2} onChange={e => setS2(Number(e.target.value))} />
          </div>

          {/* Live Property Checklist */}
          <div className="live-facts-box">
            <div className="fact-item">{properties.diagonalsEqual ? '✅' : '❌'} Diagonals Equal ({d1} vs {d2})</div>
            <div className="fact-item">{properties.diagonalsPerpendicular ? '✅' : '❌'} Diagonals ⊥ (θ = {theta}°)</div>
            <div className="fact-item">{properties.diagonalsBisect ? '✅' : '❌'} Diagonals Bisect Each Other (s₁=s₂=0.5)</div>
            <div className="fact-item">{properties.hasAllSidesEqual ? '✅' : '❌'} All 4 Sides Equal</div>
          </div>
        </div>
      </div>

      {/* Species Discovery Meter */}
      <div className="discovery-meter-card glass-card">
        <div className="meter-header">
          <span>Species Discovered: <strong>{discovered.size} / 4 required</strong></span>
          <div className="meter-tags">
            {['Parallelogram', 'Rectangle', 'Rhombus', 'Square', 'Kite', 'Trapezium'].map(sp => (
              <span key={sp} className={`sp-tag ${discovered.has(sp) ? 'unlocked' : ''}`}>
                {discovered.has(sp) ? '✓ ' : '🔒 '}{sp}
              </span>
            ))}
          </div>
        </div>

        {/* Confirmation Question Gate */}
        {canAttemptConfirmation && !isConfirmed && (
          <div className="confirmation-box anim-slide-up">
            <h4 className="conf-q">🔎 Confirmation Challenge: Which change turns a general parallelogram into a rectangle?</h4>
            <div className="conf-options">
              <button
                className={`conf-btn ${confirmationAnswer === 'equal_diagonals' ? 'correct' : ''}`}
                onClick={() => handleConfirm('equal_diagonals')}
              >
                Making both diagonals equal in length (d₁ = d₂)
              </button>
              <button
                className="conf-btn"
                onClick={() => handleConfirm('perpendicular')}
              >
                Making diagonals perpendicular (θ = 90°)
              </button>
              <button
                className="conf-btn"
                onClick={() => handleConfirm('shift_p')}
              >
                Shifting the crossing point P away from 0.5
              </button>
            </div>
          </div>
        )}

        {isConfirmed && (
          <div className="station-success anim-bounce-in">
            <span className="success-icon">🎉</span>
            <div className="success-text">
              <strong>Discovery Confirmed!</strong> Equal bisecting diagonals prove a rectangle, while perpendicular bisecting diagonals prove a rhombus!
            </div>
            <button className="btn btn-primary btn-md" onClick={onComplete}>
              Complete Station ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
