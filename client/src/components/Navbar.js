import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎮</span>
          <span className="logo-text">Gamecafe</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Discover</Link>
          {user && (
            <>
              <Link to="/create" className="navbar-link">Create</Link>
              <Link to="/my-games" className="navbar-link">My Games</Link>
            </>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-username">{user.username}</span>
              <button onClick={handleLogout} className="glass-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register">
                <button className="glass-button">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
