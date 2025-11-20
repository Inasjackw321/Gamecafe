import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import CodeEditor from '../components/CodeEditor';
import './CreateGame.css';

const CreateGame = ({ user }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState(getDefaultCode('html'));
  const [saving, setSaving] = useState(false);

  function getDefaultCode(lang) {
    const templates = {
      html: `<!DOCTYPE html>
<html>
<head>
    <title>My Game</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            color: white;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        canvas {
            border: 2px solid white;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Your game code here
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(50, 50, 100, 100);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Create Your Game!', 100, 250);
    </script>
</body>
</html>`,
      javascript: `// Create a simple game
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Game loop
function draw() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(150, 150, 100, 100);

    requestAnimationFrame(draw);
}

draw();`,
      python: `# Python Game Example
# Note: This requires server-side Python execution

def create_game():
    print("Welcome to my Python game!")
    score = 0

    # Your game logic here
    print(f"Score: {score}")

create_game()`,
      java: `// Java Game Example
// Note: This requires server-side Java execution

public class Game {
    public static void main(String[] args) {
        System.out.println("Welcome to my Java game!");

        int score = 0;
        // Your game logic here

        System.out.println("Score: " + score);
    }
}`
    };
    return templates[lang] || templates.html;
  }

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your game');
      return;
    }

    setSaving(true);
    try {
      const game = await api.games.create({ title, description, code, language });
      alert('Game created successfully!');
      navigate(`/play/${game.id}`);
    } catch (error) {
      console.error('Error saving game:', error);
      alert('Failed to save game. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="create-game-page">
      <div className="create-container">
        <div className="create-header glass-card">
          <h1>Create Your Game</h1>
          <p>Code your masterpiece and share it with the world</p>
        </div>

        <div className="create-form glass-card">
          <div className="form-group">
            <label>Game Title</label>
            <input
              type="text"
              className="glass-input"
              placeholder="Enter game title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="glass-input"
              placeholder="Describe your game..."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Programming Language</label>
            <div className="language-selector">
              {['html', 'javascript', 'python', 'java'].map(lang => (
                <button
                  key={lang}
                  className={`glass-button ${language === lang ? 'active' : ''}`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <CodeEditor
          code={code}
          onChange={(value) => setCode(value)}
          language={language}
        />

        <div className="create-actions">
          <button
            className="glass-button save-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save & Publish'}
          </button>
          <button
            className="glass-button cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
