import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const getLanguageColor = (language) => {
    const colors = {
      html: '#e34c26',
      javascript: '#f7df1e',
      python: '#3776ab',
      java: '#007396'
    };
    return colors[language] || '#667eea';
  };

  return (
    <div className="game-card glass-card" onClick={() => navigate(`/play/${game.id}`)}>
      <div className="game-card-header">
        <div
          className="language-badge"
          style={{ backgroundColor: getLanguageColor(game.language) }}
        >
          {game.language.toUpperCase()}
        </div>
      </div>

      <div className="game-card-content">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">{game.description}</p>

        <div className="game-meta">
          <span className="game-author">👤 {game.author}</span>
          <div className="game-stats">
            <span>▶️ {game.plays || 0}</span>
            <span>❤️ {game.likes || 0}</span>
          </div>
        </div>
      </div>

      <div className="game-card-footer">
        <button className="play-button glass-button">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
