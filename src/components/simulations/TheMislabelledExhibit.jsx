// src/components/simulations/TheMislabelledExhibit.jsx
// Station 3: Error-Detective (TRD §6)
import React, { useState } from 'react';
import { misconception } from '../../utils/quadProperties.js';
import './Stations.css';

const EXHIBITS = [
  {
    id: 0,
    species: "Rhombus Exhibit",
    officer: "Junior Ranger Leo",
    lines: [
      { id: 0, text: "All four sides of the habitat are measured and confirmed equal in length." },
      { id: 1, text: "Opposite sides are parallel, forming a member of the parallelogram family." },
      { id: 2, text: "The two crossing diagonals are equal in length.", isError: true, misconceptionKey: 'rhombusDiagonalsEqual' },
      { id: 3, text: "The diagonals bisect each other and meet at right angles (perpendicular)." },
    ],
    correctionOptions: [
      { text: "Diagonals of a rhombus are perpendicular, but only equal if it is a square.", isCorrect: true },
      { text: "A rhombus actually has five sides.", isCorrect: false },
      { text: "Diagonals never meet at 90 degrees.", isCorrect: false },
    ],
  },
  {
    id: 1,
    species: "Parallelogram Exhibit",
    officer: "Cadet Mia",
    lines: [
      { id: 0, text: "Opposite sides AB and DC are parallel and equal." },
      { id: 1, text: "Angle A is 70°, so adjacent angle B must also be 70°.", isError: true, misconceptionKey: 'adjacentAnglesEqual' },
      { id: 2, text: "Opposite angles ∠A and ∠C are equal to each other." },
      { id: 3, text: "Diagonals bisect each other at the center." },
    ],
    correctionOptions: [
      { text: "Adjacent angles of a parallelogram sum to 180° (co-interior), so angle B is 110°.", isCorrect: true },
      { text: "Angle B must be 90°.", isCorrect: false },
      { text: "Parallelograms do not have adjacent angles.", isCorrect: false },
    ],
  },
  {
    id: 2,
    species: "Savanna Kite Exhibit",
    officer: "Ranger Noah",
    lines: [
      { id: 0, text: "The kite has two pairs of equal adjacent sides." },
      { id: 1, text: "The kite has two pairs of parallel opposite sides.", isError: true, misconceptionKey: 'kiteParallel' },
      { id: 2, text: "One pair of opposite angles are equal." },
      { id: 3, text: "The diagonals are perpendicular, with the longer diagonal bisecting the shorter one." },
    ],
    correctionOptions: [
      { text: "A kite has no parallel sides; its sides meet at non-parallel angles.", isCorrect: true },
      { text: "A kite has all four sides equal.", isCorrect: false },
      { text: "Kite diagonals never meet at 90°.", isCorrect: false },
    ],
  },
];

export default function TheMislabelledExhibit({ onComplete, audioEnabled }) {
  const [exhibitIdx, setExhibitIdx] = useState(0);
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [selectedFix, setSelectedFix] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong-line' | 'wrong-fix'
  const [solvedCount, setSolvedCount] = useState(0);

  const currentExhibit = EXHIBITS[exhibitIdx];

  const handleLineClick = (lineId) => {
    setSelectedLineId(lineId);
    setSelectedFix(null);
    setFeedback(null);
  };

  const handleFixSubmit = () => {
    const line = currentExhibit.lines.find(l => l.id === selectedLineId);
    if (!line) return;

    if (!line.isError) {
      setFeedback('wrong-line');
      return;
    }

    if (selectedFix && selectedFix.isCorrect) {
      setFeedback('correct');
      setSolvedCount(c => c + 1);
    } else {
      setFeedback('wrong-fix');
    }
  };

  const nextExhibit = () => {
    setExhibitIdx((exhibitIdx + 1) % EXHIBITS.length);
    setSelectedLineId(null);
    setSelectedFix(null);
    setFeedback(null);
  };

  return (
    <div className="station-container anim-fade-in">
      <div className="station-header">
        <div className="station-badge">Station 4 · Error-Detective</div>
        <h2 className="station-title">The Mislabelled Exhibit 🔍</h2>
        <p className="station-desc">
          A fellow savanna ranger filed a field-guide plaque with one seeded misconception. Inspect the lines, tap the false claim, and submit the scientific correction!
        </p>
      </div>

      <div className="station-grid-2col">
        {/* Left: The Exhibit Plaque */}
        <div className="station-viz-card glass-card">
          <div className="plaque-header">
            <span className="plaque-tag">EXHIBIT PLAQUE #{exhibitIdx + 1}</span>
            <h3 className="plaque-species">{currentExhibit.species}</h3>
            <span className="plaque-officer">Recorded by: {currentExhibit.officer}</span>
          </div>

          <div className="plaque-lines">
            {currentExhibit.lines.map(line => (
              <div
                key={line.id}
                className={`plaque-line-item ${selectedLineId === line.id ? 'selected' : ''}`}
                onClick={() => handleLineClick(line.id)}
                role="button"
                tabIndex={0}
              >
                <span className="line-num">{line.id + 1}.</span>
                <span className="line-text">{line.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            💡 Tap any line above to flag it as the mistake.
          </div>
        </div>

        {/* Right: Correction Panel */}
        <div className="station-controls-card glass-card">
          <h3 className="card-section-title">Detective Action</h3>

          {selectedLineId === null ? (
            <div className="detective-prompt-box">
              <span>👈 Select a line on the exhibit plaque that contains a false geometric claim.</span>
            </div>
          ) : (
            <div className="correction-options-box anim-slide-up">
              <p className="subhead-instruction">
                Line {selectedLineId + 1} flagged. Now choose the correct scientific fix:
              </p>

              <div className="fix-options-list">
                {currentExhibit.correctionOptions.map((opt, i) => (
                  <button
                    key={i}
                    className={`fix-option-btn ${selectedFix === opt ? 'active' : ''}`}
                    onClick={() => setSelectedFix(opt)}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-primary btn-md"
                style={{ marginTop: '14px', width: '100%' }}
                onClick={handleFixSubmit}
                disabled={!selectedFix}
              >
                Submit Detective Fix 🔍
              </button>
            </div>
          )}

          {/* Feedback Display */}
          {feedback === 'wrong-line' && (
            <div className="station-error-pill anim-fade-in" style={{ marginTop: '12px' }}>
              ❌ That line is actually a true property! Keep looking for the misconception.
            </div>
          )}

          {feedback === 'wrong-fix' && (
            <div className="station-error-pill anim-fade-in" style={{ marginTop: '12px' }}>
              ❌ That correction is not geometrically accurate. Review the definition rules!
            </div>
          )}

          {feedback === 'correct' && (
            <div className="station-success anim-bounce-in" style={{ marginTop: '12px' }}>
              <span className="success-icon">🎯</span>
              <div className="success-text">
                <strong>Mystery Solved!</strong> You caught the false claim and fixed the exhibit plaque!
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button className="btn btn-outline btn-sm" onClick={nextExhibit}>
                  Next Exhibit 🔄
                </button>
                <button className="btn btn-primary btn-md" onClick={onComplete}>
                  Complete Station ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
