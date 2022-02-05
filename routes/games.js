import express from 'express'
import games from '../repositories/games_repository.js'
import { asyncRoute, error } from '../lib/utils.js';

const router = express.Router();

router.get('/game/:id', asyncRoute(async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await games.game(id)

  if(!game) return res.status(404).send(error('Unknown game'))

  res.send(game)
}))


export default router;
