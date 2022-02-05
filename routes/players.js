import express from 'express'
import { asyncRoute } from '../lib/utils.js';
import games from '../repositories/games_repository.js';

import { getPlayer } from './middleware.js';

const router = express.Router();

router.get('/player/:id', getPlayer, asyncRoute(async (req, res) => {
  delete req.player.password
  res.send(req.player)
}))

router.get('/player/:id/games', getPlayer, asyncRoute(async (req, res) => {
  const playerGames = await games.getByPlayerId(req.player.id)
  res.send(playerGames)
}))

export default router;
