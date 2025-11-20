import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import GameCard from '../components/GameCard';
import './HomePage.css';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await api.games.getAll();
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  const filteredGames = filter === 'all'
    ? games
    : games.filter(game => game.language === filter);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content glass-card animate-float">
          <h1 className="hero-title">Welcome to Gamecafe</h1>
          <p className="hero-subtitle">
            Create amazing games with code. Share them with the world.
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">💻</span>
              <span>Code in Multiple Languages</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎮</span>
              <span>Play Instantly</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🌐</span>
              <span>Share Worldwide</span>
            </div>
          </div>
        </div>
      </div>

      <div className="games-section">
        <div className="section-header">
          <h2 className="section-title">Discover Games</h2>
          <div className="filter-buttons">
            <button
              className={`filter-btn glass-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn glass-button ${filter === 'html' ? 'active' : ''}`}
              onClick={() => setFilter('html')}
            >
              HTML
            </button>
            <button
              className={`filter-btn glass-button ${filter === 'javascript' ? 'active' : ''}`}
              onClick={() => setFilter('javascript')}
            >
              JavaScript
            </button>
            <button
              className={`filter-btn glass-button ${filter === 'python' ? 'active' : ''}`}
              onClick={() => setFilter('python')}
            >
              Python
            </button>
            <button
              className={`filter-btn glass-button ${filter === 'java' ? 'active' : ''}`}
              onClick={() => setFilter('java')}
            >
              Java
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading games...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="no-games glass-card">
            <p>No games found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="games-grid">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
