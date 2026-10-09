// src/components/simulations/FileTheEntry.jsx
// Station 2: Multi-Step/Composite Construction (TRD §6)
import React, { useState } from 'react';
import QuadVisual from '../shared/QuadVisual.jsx';
import { REASONS } from '../../utils/quadProperties.js';
import './Stations.css';

export default function FileTheEntry({ onComplete, audioEnabled }) {
  // Mystery specimen measurements:
  // Shape ABCD:
  // - AB || DC and AD || BC (Two pairs of parallel sides)
  // - AB = 14 cm, BC = 9 cm (Adjacent sides unequal)
  // - Angle A = 64°
  // - Diagonals bisect each other, but are unequal and not perpendicular

  const [step, setStep] = useState(1); // 1 to 4
  const [checkedProps, setCheckedProps] = useState({
    twoParallel: false,
    allSidesEqual: false,
    diagonalsBisect: false,
    allRightAngles: false,
    diagonalsPerp: false,
  });
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [angleAnswer, setAngleAnswer] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [treePlacement, setTreePlacement] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Step 1 validation: confirm properties
  const handleStep1Submit = () => {
    if (checkedProps.twoParallel && checkedProps.diagonalsBisect && !checkedProps.allSidesEqual && !checkedProps.allRightAngles && !checkedProps.diagonalsPerp) {
      setErrorMsg('');
      setStep(2);
    } else {
      setErrorMsg('Check the specimen data carefully! It has two parallel pairs and bisecting diagonals, but sides are 14 cm & 9 cm (not all equal) and angle A = 64° (not right angles).');
    }
  };

  // Step 2 validation: most specific species
  const handleStep2Submit = () => {
    if (selectedSpecies === 'Parallelogram') {
      setErrorMsg('');
      setStep(3);
    } else {
      setErrorMsg('Remember: without equal sides (rhombus) or right angles (rectangle), the most specific species is Parallelogram.');
    }
  };

  // Step 3 validation: angle & reason (Angle B = 180° - 64° = 116°)
  const handleStep3Submit = () => {
    if (angleAnswer.trim() === '116' && selectedReason === 'co-interior-angles-parallel') {
      setErrorMsg('');
      setStep(4);
    } else {
      setErrorMsg('Adjacent angles between parallel sides sum to 180°: 180° − 64° = 116°. Stated reason must be Co-interior angles.');
    }
  };

  // Step 4 validation: place on tree
  const handleStep4Submit = (branch) => {
    setTreePlacement(branch);
    if (branch === 'parallelogram') {
      setErrorMsg('');
      setStep(5); // Complete!
    } else {
      setErrorMsg('This shape belongs on the Parallelogram branch!');
    }
  };

  return (
    <div className="station-container anim-fade-in">
      <div className="station-header">
        <div className="station-badge">Station 3 · Multi-Step Construction</div>
        <h2 className="station-title">File the Field-Guide Entry 📋</h2>
        <p className="station-desc">
          A new savanna specimen was found at Waterhole 4. Examine its raw measurements, verify its properties, compute its missing angle with a reason, and file its place on the family tree!
        </p>
      </div>

      <div className="station-grid-2col">
        {/* Left: Specimen Dossier & Live Field-Guide Card */}
        <div className="station-viz-card glass-card">
          <div className="specimen-dossier">
            <h3 className="dossier-title">📁 Specimen #804 Dossier</h3>
            <div className="dossier-field"><span>Markings:</span> <strong>AB ∥ DC and AD ∥ BC</strong></div>
            <div className="dossier-field"><span>Measurements:</span> <strong>AB = 14 cm, BC = 9 cm</strong></div>
            <div className="dossier-field"><span>Observed Angle:</span> <strong>∠A = 64°</strong></div>
            <div className="dossier-field"><span>Diagonals:</span> <strong>Bisect each other at X (unequal, θ = 68°)</strong></div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <QuadVisual
              type="figure"
              data={{
                species: "parallelogram",
                marks: {
                  parallelPairs: [[0, 2], [1, 3]],
                  sideLabels: { 0: "14 cm", 1: "9 cm" },
                  angleLabels: { 0: "64°", 1: step >= 4 ? "116°" : "?" },
                },
              }}
              compact={true}
            />
          </div>

          {/* Live Field Guide Preview */}
          <div className="field-guide-stamp-card">
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--gold)' }}>SAVANNA FIELD GUIDE CERTIFICATE</h4>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              <div>Species: <strong>{selectedSpecies || '_________________'}</strong></div>
              <div>Angle B: <strong>{angleAnswer ? `${angleAnswer}°` : '____°'}</strong> ({selectedReason ? REASONS[selectedReason] : 'Reason pending'})</div>
              <div>Tree Branch: <strong>{treePlacement ? treePlacement.toUpperCase() : 'PENDING'}</strong></div>
              <div>Status: <span style={{ color: step === 5 ? '#4caf50' : '#ffb300' }}>{step === 5 ? 'APPROVED & FILED ✓' : `IN PROGRESS (Step ${step}/4)`}</span></div>
            </div>
          </div>
        </div>

        {/* Right: Chained Steps */}
        <div className="station-controls-card glass-card">
          {errorMsg && <div className="station-error-pill anim-fade-in">{errorMsg}</div>}

          {/* STEP 1: Mark properties */}
          {step === 1 && (
            <div className="step-pane anim-slide-up">
              <h3 className="card-section-title">Step 1: Check Confirmed Features</h3>
              <p className="step-instruction">Select all properties proven by the dossier data:</p>
              
              <div className="checkbox-list">
                <label className="chk-label-row">
                  <input
                    type="checkbox"
                    checked={checkedProps.twoParallel}
                    onChange={e => setCheckedProps({ ...checkedProps, twoParallel: e.target.checked })}
                  />
                  <span>Two pairs of opposite sides are parallel</span>
                </label>
                <label className="chk-label-row">
                  <input
                    type="checkbox"
                    checked={checkedProps.allSidesEqual}
                    onChange={e => setCheckedProps({ ...checkedProps, allSidesEqual: e.target.checked })}
                  />
                  <span>All four sides are equal in length</span>
                </label>
                <label className="chk-label-row">
                  <input
                    type="checkbox"
                    checked={checkedProps.diagonalsBisect}
                    onChange={e => setCheckedProps({ ...checkedProps, diagonalsBisect: e.target.checked })}
                  />
                  <span>Diagonals bisect each other</span>
                </label>
                <label className="chk-label-row">
                  <input
                    type="checkbox"
                    checked={checkedProps.allRightAngles}
                    onChange={e => setCheckedProps({ ...checkedProps, allRightAngles: e.target.checked })}
                  />
                  <span>All four angles are 90° right angles</span>
                </label>
                <label className="chk-label-row">
                  <input
                    type="checkbox"
                    checked={checkedProps.diagonalsPerp}
                    onChange={e => setCheckedProps({ ...checkedProps, diagonalsPerp: e.target.checked })}
                  />
                  <span>Diagonals are perpendicular (meet at 90°)</span>
                </label>
              </div>

              <button className="btn btn-primary btn-md" style={{ marginTop: '16px' }} onClick={handleStep1Submit}>
                Confirm Features ➔
              </button>
            </div>
          )}

          {/* STEP 2: Name species */}
          {step === 2 && (
            <div className="step-pane anim-slide-up">
              <h3 className="card-section-title">Step 2: Most Specific Species Name</h3>
              <p className="step-instruction">Based on the confirmed features, which is the most specific name?</p>

              <div className="species-select-grid">
                {['Square', 'Rectangle', 'Rhombus', 'Parallelogram', 'Trapezium', 'Kite'].map(sp => (
                  <button
                    key={sp}
                    className={`species-option-btn ${selectedSpecies === sp ? 'active' : ''}`}
                    onClick={() => setSelectedSpecies(sp)}
                  >
                    {sp}
                  </button>
                ))}
              </div>

              <button className="btn btn-primary btn-md" style={{ marginTop: '16px' }} onClick={handleStep2Submit} disabled={!selectedSpecies}>
                Confirm Species ➔
              </button>
            </div>
          )}

          {/* STEP 3: Find unknown angle + reason */}
          {step === 3 && (
            <div className="step-pane anim-slide-up">
              <h3 className="card-section-title">Step 3: Calculate Angle B with a Reason</h3>
              <p className="step-instruction">Given ∠A = 64°, calculate adjacent angle ∠B and select the theorem:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label>Angle B = </label>
                  <input
                    type="number"
                    value={angleAnswer}
                    placeholder="e.g. 116"
                    onChange={e => setAngleAnswer(e.target.value)}
                    style={{ width: '90px', padding: '8px', borderRadius: '6px', border: '1px solid #777', background: '#111', color: '#fff' }}
                  />
                  <span>degrees (°)</span>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px' }}>Geometric Reason:</label>
                  <select
                    value={selectedReason}
                    onChange={e => setSelectedReason(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#222', color: '#fff' }}
                  >
                    <option value="">-- Select Geometric Reason --</option>
                    {Object.entries(REASONS).map(([k, label]) => (
                      <option key={k} value={k}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary btn-md" style={{ marginTop: '16px' }} onClick={handleStep3Submit} disabled={!angleAnswer || !selectedReason}>
                Verify Calculation ➔
              </button>
            </div>
          )}

          {/* STEP 4: Family tree branch placement */}
          {step === 4 && (
            <div className="step-pane anim-slide-up">
              <h3 className="card-section-title">Step 4: Place on the Family Tree</h3>
              <p className="step-instruction">Tap the branch where this specimen belongs in the savanna lineage:</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                <button className="tree-branch-btn" onClick={() => handleStep4Submit('trapezium')}>
                  Branch A: Trapezium (1 parallel pair)
                </button>
                <button className="tree-branch-btn highlight" onClick={() => handleStep4Submit('parallelogram')}>
                  Branch B: Parallelogram (2 parallel pairs, opposite sides equal)
                </button>
                <button className="tree-branch-btn" onClick={() => handleStep4Submit('kite')}>
                  Branch C: Kite (adjacent pairs equal)
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {step === 5 && (
            <div className="station-success anim-bounce-in">
              <span className="success-icon">🏆</span>
              <div className="success-text">
                <strong>Field Guide Entry Approved!</strong> You proved features, named the species, derived the missing angle with a reason, and placed it on the lineage tree.
              </div>
              <button className="btn btn-primary btn-md" onClick={onComplete}>
                Complete Station ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
