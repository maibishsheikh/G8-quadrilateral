// src/components/shared/QuadVisual.jsx
// Visual component for Quadrilaterals (TRD §5.1)
import React from 'react';
import { normalizeToBox, distortNotToScale, getCanonicalQuad } from '../../utils/quadGeometry.js';
import { PROPERTY_TABLE, REASONS } from '../../utils/quadProperties.js';

export default function QuadVisual({ type = 'figure', data = {}, compact = false }) {
  const width = compact ? 260 : 360;
  const height = compact ? 180 : 240;

  // Render Figure or Diagonals Overlay
  if (type === 'figure' || type === 'diagonals-overlay') {
    let rawPoints = data.points;
    if (!rawPoints || rawPoints.length !== 4) {
      rawPoints = getCanonicalQuad(data.species || 'parallelogram');
    }

    if (data.notToScale) {
      rawPoints = distortNotToScale(rawPoints, 0.12);
    }

    const pts = normalizeToBox(rawPoints, width, height, compact ? 28 : 38);
    const [A, B, C, D] = pts;
    const polygonPoints = pts.map(p => `${p.x},${p.y}`).join(' ');

    // Center intersection for diagonals
    const midX = (A.x + C.x + B.x + D.x) / 4;
    const midY = (A.y + C.y + B.y + D.y) / 4;
    const intersectionLabel = data.marks?.diagonalIntersection || 'X';

    // Build accessibility description
    const descParts = [];
    if (data.species) descParts.push(`Shape: ${data.species}`);
    if (data.marks?.parallelPairs?.length) descParts.push("Pairs of opposite sides are marked parallel.");
    if (data.marks?.equalSides?.length) descParts.push("All four sides marked equal.");
    if (data.marks?.equalSidesPairs?.length) descParts.push("Pairs of sides marked equal.");
    if (data.marks?.rightAngles?.length) descParts.push("Right angles marked.");
    if (data.notToScale) descParts.push("Diagram is not drawn to scale.");
    const a11yText = descParts.join(' ') || "Geometric quadrilateral figure.";

    // Helper for side midpoints
    const sideMid = (p1, p2) => ({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 });
    const sides = [
      { p1: A, p2: B, mid: sideMid(A, B), name: 'AB', idx: 0 },
      { p1: B, p2: C, mid: sideMid(B, C), name: 'BC', idx: 1 },
      { p1: C, p2: D, mid: sideMid(C, D), name: 'CD', idx: 2 },
      { p1: D, p2: A, mid: sideMid(D, A), name: 'DA', idx: 3 },
    ];

    return (
      <div className={`quad-visual-container ${compact ? 'compact' : ''}`} style={{ textAlign: 'center', margin: '0 auto' }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="quad-svg"
          role="img"
          aria-label={a11yText}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <defs>
            <linearGradient id="quadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3F8F8F" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Diagonals if required */}
          {(type === 'diagonals-overlay' || data.displayDiagonals) && (
            <g className="diagonals-group" stroke="rgba(224, 164, 88, 0.75)" strokeWidth="1.8" strokeDasharray="4 3">
              <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
              <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} />
              
              {/* Center point badge */}
              <circle cx={midX} cy={midY} r="4" fill="#E0A458" />
              <text x={midX + 8} y={midY - 8} fill="#ffe082" fontSize="12" fontWeight="bold">
                {intersectionLabel}
              </text>

              {data.marks?.rightAngleCenter && (
                <path
                  d={`M ${midX + 7} ${midY} L ${midX + 7} ${midY - 7} L ${midX} ${midY - 7}`}
                  stroke="#ffd54f"
                  strokeWidth="1.5"
                  fill="none"
                />
              )}
            </g>
          )}

          {/* Main Polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#quadGrad)"
            stroke="#ffca28"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Side tick marks */}
          {sides.map((s, i) => {
            const isAllEqual = data.marks?.equalSides?.includes(i);
            const isPairEqual = data.marks?.equalSidesPairs?.some(p => p.includes(i));
            if (!isAllEqual && !isPairEqual) return null;

            const dx = s.p2.x - s.p1.x;
            const dy = s.p2.y - s.p1.y;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            return (
              <line
                key={`tick-${i}`}
                x1={s.mid.x - nx * 6}
                y1={s.mid.y - ny * 6}
                x2={s.mid.x + nx * 6}
                y2={s.mid.y + ny * 6}
                stroke="#fff"
                strokeWidth="2.2"
              />
            );
          })}

          {/* Parallel arrows */}
          {data.marks?.parallelPairs?.map((pair, pIdx) => {
            return pair.map(sideIdx => {
              const s = sides[sideIdx];
              if (!s) return null;
              const dx = s.p2.x - s.p1.x;
              const dy = s.p2.y - s.p1.y;
              const len = Math.hypot(dx, dy) || 1;
              const ux = dx / len;
              const uy = dy / len;
              const nx = -uy;
              const ny = ux;

              return (
                <path
                  key={`par-${sideIdx}`}
                  d={`M ${s.mid.x - ux * 6 + nx * 5} ${s.mid.y - uy * 6 + ny * 5} L ${s.mid.x + ux * 2} ${s.mid.y + uy * 2} L ${s.mid.x - ux * 6 - nx * 5} ${s.mid.y - uy * 6 - ny * 5}`}
                  stroke="#4caf50"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            });
          })}

          {/* Side length labels */}
          {data.marks?.sideLabels &&
            Object.entries(data.marks.sideLabels).map(([idxStr, label]) => {
              const s = sides[parseInt(idxStr, 10)];
              if (!s) return null;
              return (
                <text
                  key={`slabel-${idxStr}`}
                  x={s.mid.x}
                  y={s.mid.y - 7}
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                  style={{ textShadow: '0 1px 4px #000' }}
                >
                  {label}
                </text>
              );
            })}

          {/* Vertices & vertex names */}
          {pts.map((p, i) => {
            const angleLabel = data.marks?.angleLabels?.[i];
            const vertexLabels = ['A', 'B', 'C', 'D'];
            const label = vertexLabels[i];

            // offset away from center
            const ox = p.x > midX ? 14 : -14;
            const oy = p.y > midY ? 14 : -14;

            return (
              <g key={`vert-${i}`}>
                <circle cx={p.x} cy={p.y} r="5" fill="#C9A227" stroke="#ffffff" strokeWidth="1.5" />
                <text
                  x={p.x + ox}
                  y={p.y + oy + 4}
                  fill="#ffe082"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {label}
                </text>

                {/* Angle label badge if provided */}
                {angleLabel && (
                  <text
                    x={p.x - ox * 0.9}
                    y={p.y - oy * 0.9 + 4}
                    fill="#4fc3f7"
                    fontSize="11"
                    fontWeight="700"
                    textAnchor="middle"
                    style={{ textShadow: '0 1px 3px #000' }}
                  >
                    {angleLabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Not drawn to scale badge */}
        {data.notToScale && (
          <div
            className="not-to-scale-badge"
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              marginTop: '4px',
            }}
          >
            ⚠️ Diagram not drawn to scale
          </div>
        )}
      </div>
    );
  }

  // Render Property Matrix
  if (type === 'property-matrix') {
    return (
      <div className="property-matrix-wrap" style={{ margin: '8px auto', maxWidth: '420px', fontSize: '0.8rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', background: 'rgba(20,20,50,0.6)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--gold-light)' }}>
              <th style={{ padding: '6px' }}>Species</th>
              <th style={{ padding: '6px' }}>Opp. Sides ||</th>
              <th style={{ padding: '6px' }}>4 Equal Sides</th>
              <th style={{ padding: '6px' }}>Diagonals Equal</th>
              <th style={{ padding: '6px' }}>Diagonals ⊥</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(PROPERTY_TABLE).slice(0, 6).map(([sp, p]) => (
              <tr key={sp} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'capitalize' }}>
                <td style={{ padding: '6px', fontWeight: 'bold', color: data.highlight?.toLowerCase() === sp ? 'var(--gold)' : '#fff' }}>{sp}</td>
                <td>{p.hasTwoParallelPairs ? '✅' : p.hasOneParallelPair ? '1 pr' : '❌'}</td>
                <td>{p.hasAllSidesEqual ? '✅' : '❌'}</td>
                <td>{p.diagonalsEqual ? '✅' : '❌'}</td>
                <td>{p.diagonalsPerpendicular ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Render Family Tree
  if (type === 'family-tree') {
    return (
      <div className="family-tree-card" style={{ padding: '12px', background: 'rgba(25, 30, 60, 0.8)', borderRadius: '12px', textAlign: 'center', margin: '8px auto', maxWidth: '380px' }}>
        <h4 style={{ color: 'var(--gold)', margin: '0 0 8px 0', fontSize: '0.9rem' }}>🌳 Quadrilateral Inclusion Tree</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '0.85rem' }}>Quadrilateral (4 sides)</div>
          <div style={{ width: '2px', height: '10px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <span style={{ padding: '4px 8px', background: '#3F8F8F33', borderRadius: '8px', fontSize: '0.78rem' }}>Trapezium (1 || pair)</span>
            <span style={{ padding: '4px 8px', background: '#B5651D33', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid #B5651D' }}>Parallelogram (2 || pairs)</span>
            <span style={{ padding: '4px 8px', background: '#E0A45833', borderRadius: '8px', fontSize: '0.78rem' }}>Kite (2 adj equal)</span>
          </div>
          <div style={{ width: '2px', height: '10px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <span style={{ padding: '4px 8px', background: '#7A9E3F33', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid #7A9E3F' }}>Rectangle (4 right ∠)</span>
            <span style={{ padding: '4px 8px', background: '#C9A22733', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid #C9A227' }}>Rhombus (4 equal sides)</span>
          </div>
          <div style={{ width: '2px', height: '10px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ padding: '4px 14px', background: '#ffc10733', border: '1.5px solid #ffc107', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 'bold', color: '#ffeb3b' }}>
            👑 Square (Rectangle + Rhombus)
          </div>
        </div>
      </div>
    );
  }

  // Render Step Reasons
  if (type === 'step-reasons' && data.steps) {
    return (
      <div className="step-reasons-card" style={{ padding: '10px', background: 'rgba(20, 20, 50, 0.7)', borderRadius: '10px', margin: '8px auto', maxWidth: '380px' }}>
        <h4 style={{ color: 'var(--gold)', margin: '0 0 6px 0', fontSize: '0.85rem' }}>📋 Step-by-Step Reasoning:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {data.steps.map((st, i) => (
            <div key={i} style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', textAlign: 'left', fontSize: '0.8rem' }}>
              <div style={{ fontWeight: '600', color: '#e0e0e0' }}>{st.statement}</div>
              <div style={{ color: '#81d4fa', fontSize: '0.75rem', marginTop: '2px' }}>
                ↳ <em>Because: {REASONS[st.reason] || st.reason}</em>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
