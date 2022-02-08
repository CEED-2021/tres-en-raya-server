import express from 'express'

import players from '../repositories/players_repository.js'
import { asyncRoute, error } from '../lib/utils.js';
import games from '../repositories/games_repository.js';

const router = express.Router();

async function getPlayer(req, res, next) {
  const id = parseInt(req.params.id);
  const player = await players.player(id)

  if(!player) return res.status(404).send(error('Unknown player'));

  req.player = {...player}
  next();
}

router.get('/player/:id', getPlayer, asyncRoute(async (req, res) => {
  delete req.player.password
  res.send(req.player)
}))

router.get('/player/:id/games', getPlayer, asyncRoute(async (req, res) => {
  const playerGames = await games.getByPlayerId(req.player.id)
  const gameIds = playerGames.map( game => game.id )

  res.send(gameIds)
}))

export default router;
