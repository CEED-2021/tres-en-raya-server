import players from '../repositories/players_repository.js'
import { error } from  '../lib/utils.js'

async function getPlayer(req, res, next) {
  const id = parseInt(req.params.id);
  const player = await players.player(id)

  if(!player) return res.status(404).send(error('Unknown player'));

  req.player = player
  next();
}

export {
  getPlayer
}
