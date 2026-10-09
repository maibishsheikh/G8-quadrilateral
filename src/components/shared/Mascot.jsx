// src/components/shared/Mascot.jsx
import React, { useState } from 'react';
import './Mascot.css';
import gigiImg from '../../assets/gigi.png';

export default function Mascot({ mood = 'curious', message, size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const emoji = mood === 'celebrate' ? '🦒' : mood === 'thinking' ? '🦒' : '🦒';

  return (
    <div className={`mascot-row-wrap mascot-${size}`}>
      <div className={`mascot-avatar-circle mood-${mood}`}>
        {!imgError ? (
          <img
            src={gigiImg}
            alt="Gigi the Ranger Giraffe"
            className="mascot-img-avatar"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="mascot-avatar-emoji">{emoji}</span>
        )}
      </div>
      {message && (
        <div className="mascot-speech-bubble anim-fade-in">
          <span className="speech-text">{message}</span>
        </div>
      )}
    </div>
  );
}
