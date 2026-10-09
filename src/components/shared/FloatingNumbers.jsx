// src/components/shared/FloatingNumbers.jsx
import React, { useMemo } from 'react';
import './FloatingNumbers.css';

const SAVANNA_GEOMETRY_SYMBOLS = [
  '🦒', '📐', '📏', '🔷', '🟩', '🦏', '✨', '🌿', '🪵', '🧭',
  '🐆', '🐊', '🐍', '🦜', '360°', '90°', '180°', '∥', '⊥', 'x°'
];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: SAVANNA_GEOMETRY_SYMBOLS[i % SAVANNA_GEOMETRY_SYMBOLS.length],
      left: `${(i * 5.6 + 3) % 94}%`,
      delay: `${(i * 1.3) % 15}s`,
      duration: `${18 + (i % 5) * 4}s`,
      size: `${1.1 + (i % 4) * 0.4}rem`,
    }));
  }, []);

  return (
    <div className="floating-symbols-container" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-money-symbol"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
