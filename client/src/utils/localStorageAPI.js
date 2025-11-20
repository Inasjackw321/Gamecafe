// Client-side API implementation using localStorage for GitHub Pages deployment
// This replaces the backend API calls when running on GitHub Pages

const STORAGE_KEYS = {
  USERS: 'gamecafe_users',
  GAMES: 'gamecafe_games',
  CURRENT_USER: 'gamecafe_current_user',
  AUTH_TOKEN: 'token'
};

// Helper to generate UUIDs
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Helper to hash passwords (simple hash for demo purposes)
const simpleHash = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Initialize storage with demo data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
    // Add some demo games
    const demoGames = [
      {
        id: generateId(),
        title: 'Bouncing Ball Demo',
        description: 'A simple HTML5 canvas game with a bouncing ball',
        language: 'html',
        code: `<!DOCTYPE html>
<html>
<head>
    <title>Bouncing Ball</title>
    <style>
        body { margin: 0; background: #1a1a1a; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        canvas { border: 2px solid white; }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let x = 200, y = 200, dx = 2, dy = 2, radius = 20;

        function draw() {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            if (x + dx > canvas.width - radius || x + dx < radius) dx = -dx;
            if (y + dy > canvas.height - radius || y + dy < radius) dy = -dy;
            x += dx; y += dy;
            requestAnimationFrame(draw);
        }
        draw();
    </script>
</body>
</html>`,
        author: 'Gamecafe Team',
        authorId: 'demo',
        createdAt: new Date().toISOString(),
        plays: 42,
        likes: 15
      }
    ];
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(demoGames));
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    initializeStorage();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));

    // Check if user exists
    if (users.find(u => u.email === email || u.username === username)) {
      throw new Error('User already exists');
    }

    const userId = generateId();
    const hashedPassword = await simpleHash(password);
    const user = {
      id: userId,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const token = btoa(JSON.stringify({ id: userId, username }));
    const userData = { id: userId, username, email };

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));

    return { user: userData, token };
  },

  login: async (username, password) => {
    initializeStorage();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.username === username);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = await simpleHash(password);
    if (user.password !== hashedPassword) {
      throw new Error('Invalid credentials');
    }

    const token = btoa(JSON.stringify({ id: user.id, username: user.username }));
    const userData = { id: user.id, username: user.username, email: user.email };

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));

    return { user: userData, token };
  }
};

// Games API
export const gamesAPI = {
  getAll: async () => {
    initializeStorage();
    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    return games.map(({ id, title, description, language, author, createdAt, plays, likes, authorId }) => ({
      id, title, description, language, author, createdAt, plays, likes, authorId
    }));
  },

  getById: async (id) => {
    initializeStorage();
    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const game = games.find(g => g.id === id);
    if (!game) throw new Error('Game not found');
    return game;
  },

  create: async (gameData) => {
    initializeStorage();
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (!user) throw new Error('Not authenticated');

    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const game = {
      id: generateId(),
      ...gameData,
      author: user.username,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      plays: 0,
      likes: 0
    };

    games.push(game);
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    return game;
  },

  update: async (id, gameData) => {
    initializeStorage();
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (!user) throw new Error('Not authenticated');

    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const index = games.findIndex(g => g.id === id);

    if (index === -1) throw new Error('Game not found');
    if (games[index].authorId !== user.id) throw new Error('Not authorized');

    games[index] = { ...games[index], ...gameData, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    return games[index];
  },

  delete: async (id) => {
    initializeStorage();
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (!user) throw new Error('Not authenticated');

    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const index = games.findIndex(g => g.id === id);

    if (index === -1) throw new Error('Game not found');
    if (games[index].authorId !== user.id) throw new Error('Not authorized');

    games.splice(index, 1);
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    return { message: 'Game deleted' };
  },

  incrementPlays: async (id) => {
    initializeStorage();
    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const game = games.find(g => g.id === id);
    if (game) {
      game.plays = (game.plays || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
      return { plays: game.plays };
    }
    return { plays: 0 };
  },

  like: async (id) => {
    initializeStorage();
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    if (!user) throw new Error('Not authenticated');

    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES));
    const game = games.find(g => g.id === id);
    if (game) {
      game.likes = (game.likes || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
      return { likes: game.likes };
    }
    return { likes: 0 };
  }
};

// Detect if running on GitHub Pages
export const isGitHubPages = () => {
  return window.location.hostname.includes('github.io') ||
         process.env.REACT_APP_USE_LOCAL_STORAGE === 'true';
};
