// src/components/IntroScreen.jsx
import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';

const JOURNEY = [
  { num: '01', icon: '🔍', label: 'Wonder',   desc: 'The enclosure mystery' },
  { num: '02', icon: '📖', label: 'Story',    desc: 'Hui Min & Sanjay\'s guide' },
  { num: '03', icon: '🧪', label: 'Simulate', desc: '4 interactive ranger labs' },
  { num: '04', icon: '🎮', label: 'Practice', desc: '10 savanna worlds & bosses' },
  { num: '05', icon: '📓', label: 'Reflect',  desc: 'Debrief & scorecard' },
];

export default function IntroScreen({ state, dispatch }) {
  const hasSaved = state?.phaseComplete && Object.values(state.phaseComplete).some(Boolean);

  function startFresh() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  function resumeSession() {
    dispatch({ type: 'SET_PHASE', payload: state.savedPhase || 'wonder' });
  }

  return (
    <div className="intro-wrap">
      {/* Top Badge */}
      <div className="intro-top-badge">
        ✨ Grade 8 Geometry · The Savanna Ranger Academy
      </div>

      {/* Main Title */}
      <h1 className="intro-title">
        <span className="text-orange">Quad</span><span className="text-white">Quest</span>
      </h1>
      <h2 className="intro-subtitle">QuadQuest · Master Sides, Angles, Diagonals &amp; Inclusions</h2>

      {/* Mascot Row */}
      <div className="intro-mascot-row">
        <div className="intro-mascot-circle">🦒</div>
        <div className="intro-speech-bubble">
          Hi! I'm Gigi the Giraffe. Ready to stop naming shapes by how they LOOK<br />and start proving them by what can be SHOWN? 🦒📏📐
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc">
        Explore the six special quadrilaterals (trapezium, parallelogram, rectangle, rhombus, square, kite), find missing angles with proven reasons, solve algebraic side equations, and climb the family tree of inclusion!
      </p>

      {/* Journey Card */}
      <div className="journey-card">
        <div className="journey-card-title">YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START</div>

        <div className="journey-steps-container">
          <div className="journey-row top-row">
            {JOURNEY.slice(0, 3).map((j, i) => (
              <React.Fragment key={j.num}>
                <div
                  className="journey-step-item clickable-step"
                  onClick={() => dispatch({ type: 'SET_PHASE', payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase() })}
                  role="button"
                  tabIndex={0}
                  title={`Click to open ${j.label} phase`}
                >
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                <span className={`journey-arrow ${i === 2 ? 'fade-arrow' : ''}`}>→</span>
              </React.Fragment>
            ))}
          </div>

          <div className="journey-row bottom-row">
            {JOURNEY.slice(3, 5).map((j, i) => (
              <React.Fragment key={j.num}>
                <div
                  className="journey-step-item clickable-step"
                  onClick={() => dispatch({ type: 'SET_PHASE', payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase() })}
                  role="button"
                  tabIndex={0}
                  title={`Click to open ${j.label} phase`}
                >
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                {i === 0 && <span className="journey-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="intro-btn-row">
        {hasSaved ? (
          <>
            <button className="btn btn-outline btn-lg" onClick={startFresh} aria-label="Start fresh session">
              Restart Journey 🔄
            </button>
            <button className="btn btn-primary btn-lg pulse-glow" onClick={resumeSession} aria-label="Resume existing session">
              Resume Journey ➔
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-lg pulse-glow" onClick={startFresh} aria-label="Begin learning journey">
            Begin QuadQuest Journey 🚀
          </button>
        )}
      </div>
    </div>
  );
}
