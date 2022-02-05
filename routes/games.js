import express from 'express'
import games from '../repositories/games_repository.js'
import { asyncRoute, error } from '../lib/utils.js';
import { enc, dec } from '../lib/crypt.js'

const ENC_KEY = 'patata';

const router = express.Router();

router.get('/game/:id', asyncRoute(async (req, res) => {
  // TO-DO: check if the game belongs to the user
  const id = parseInt(req.params.id);
  const game = await games.game(id)

  if(!game) return res.status(404).send(error('Unknown game'))

  //TO-DO: send first movement

  res.send(game)
}))


router.get('/game/:id/movements/:movid', asyncRoute(async (req, res) => {

  //TO-DO: decode movid to gameid/movement number
  //https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/

  res.send('TO-DO')
}))

export default router;
