import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GamePlayer.css';

const GamePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchGame();
    incrementPlayCount();
  }, [id]);

  const fetchGame = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${id}`);
      setGame(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching game:', error);
      setLoading(false);
    }
  };

  const incrementPlayCount = async () => {
    try {
      await axios.post(`http://localhost:5000/api/games/${id}/play`);
    } catch (error) {
      console.error('Error incrementing play count:', error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to like games');
        return;
      }

      await axios.post(
        `http://localhost:5000/api/games/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLiked(true);
      setGame({ ...game, likes: (game.likes || 0) + 1 });
    } catch (error) {
      console.error('Error liking game:', error);
    }
  };

  const renderGame = () => {
    if (!game) return null;

    if (game.language === 'html') {
      return (
        <iframe
          srcDoc={game.code}
          className="game-iframe"
          title={game.title}
          sandbox="allow-scripts"
        />
      );
    } else if (game.language === 'javascript') {
      const htmlWrapper = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #1a1a1a;
              color: white;
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <script>${game.code}</script>
        </body>
        </html>
      `;
      return (
        <iframe
          srcDoc={htmlWrapper}
          className="game-iframe"
          title={game.title}
          sandbox="allow-scripts"
        />
      );
    } else {
      return (
        <div className="code-display glass-card">
          <pre><code>{game.code}</code></pre>
          <p className="execution-note">
            {game.language === 'python' && 'Python games require server-side execution.'}
            {game.language === 'java' && 'Java games require server-side execution.'}
          </p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="error-container glass-card">
        <h2>Game not found</h2>
        <button className="glass-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="game-player-page">
      <div className="game-info glass-card">
        <div className="game-header">
          <div>
            <h1 className="game-title">{game.title}</h1>
            <p className="game-author">Created by {game.author}</p>
          </div>
          <div className="game-actions">
            <button
              className={`glass-button like-button ${liked ? 'liked' : ''}`}
              onClick={handleLike}
              disabled={liked}
            >
              ❤️ {game.likes || 0}
            </button>
            <button className="glass-button" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        </div>

        <p className="game-description">{game.description}</p>

        <div className="game-meta">
          <span className="meta-item">
            <strong>Language:</strong> {game.language.toUpperCase()}
          </span>
          <span className="meta-item">
            <strong>Plays:</strong> {game.plays || 0}
          </span>
          <span className="meta-item">
            <strong>Created:</strong> {new Date(game.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="game-container glass-card">
        {renderGame()}
      </div>
    </div>
  );
};

export default GamePlayer;
