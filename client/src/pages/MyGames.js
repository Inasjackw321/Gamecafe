import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './MyGames.css';

const MyGames = ({ user }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyGames();
  }, []);

  const fetchMyGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/games');
      const myGames = response.data.filter(game => game.authorId === user.id);
      setGames(myGames);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching games:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your games...</p>
      </div>
    );
  }

  return (
    <div className="my-games-page">
      <div className="page-header glass-card">
        <h1>My Games</h1>
        <p>Manage and view your created games</p>
        <button className="glass-button create-button" onClick={() => navigate('/create')}>
          + Create New Game
        </button>
      </div>

      {games.length === 0 ? (
        <div className="no-games glass-card">
          <h2>You haven't created any games yet</h2>
          <p>Start creating your first game and share it with the world!</p>
          <button className="glass-button" onClick={() => navigate('/create')}>
            Create Your First Game
          </button>
        </div>
      ) : (
        <div className="games-grid">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGames;
