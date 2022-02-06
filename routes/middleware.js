import players from '../repositories/players_repository.js'
import { error } from  '../lib/utils.js'

async function getPlayer(req, res, next) {
  const id = parseInt(req.params.id);
  const player = await players.player(id)

  if(!player) return res.status(404).send(error('Unknown player'));

  req.player = player
  next();
}

function logHeaders(req, res, next) {
  console.log(JSON.stringify(req.headers));
  next();
}

function randomDelay(min, random){
  return ( req, res, next ) => {
    setTimeout(next, Math.floor( ( Math.random() * random ) + min ) );
  }
}

export {
  getPlayer,
  randomDelay,
  logHeaders
}
