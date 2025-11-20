const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');

// In-memory game storage (replace with database in production)
const games = new Map();

// Get all games
router.get('/', (req, res) => {
  const gamesList = Array.from(games.values()).map(game => ({
    id: game.id,
    title: game.title,
    description: game.description,
    language: game.language,
    author: game.author,
    createdAt: game.createdAt,
    plays: game.plays,
    likes: game.likes
  }));
  res.json(gamesList);
});

// Get single game
router.get('/:id', (req, res) => {
  const game = games.get(req.params.id);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game);
});

// Create game (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, code, language } = req.body;

    const gameId = uuidv4();
    const game = {
      id: gameId,
      title,
      description,
      code,
      language,
      author: req.user.username,
      authorId: req.user.id,
      createdAt: new Date(),
      plays: 0,
      likes: 0
    };

    games.set(gameId, game);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Update game (protected)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const game = games.get(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to edit this game' });
    }

    const { title, description, code, language } = req.body;

    game.title = title || game.title;
    game.description = description || game.description;
    game.code = code || game.code;
    game.language = language || game.language;
    game.updatedAt = new Date();

    games.set(req.params.id, game);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// Delete game (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const game = games.get(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    if (game.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this game' });
    }

    games.delete(req.params.id);
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

// Increment play count
router.post('/:id/play', (req, res) => {
  const game = games.get(req.params.id);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  game.plays = (game.plays || 0) + 1;
  games.set(req.params.id, game);
  res.json({ plays: game.plays });
});

// Like game
router.post('/:id/like', authMiddleware, (req, res) => {
  const game = games.get(req.params.id);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  game.likes = (game.likes || 0) + 1;
  games.set(req.params.id, game);
  res.json({ likes: game.likes });
});

module.exports = router;
