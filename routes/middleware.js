import { error } from "../lib/utils.js";

function logHeaders(req, res, next) {
  console.log(JSON.stringify(req.headers));
  next();
}

function randomDelay(min, random){
  return ( req, res, next ) => {
    setTimeout(next, Math.floor( ( Math.random() * random ) + min ) );
  }
}

function checkSamePlayer(req, res, next) {
  const ownerId = req.player?.id || req.game?.player
  if(req.user.id !== ownerId)
    return res.status(403).send(error('Not authorized'))
  next()
}

export {
  randomDelay,
  logHeaders,
  checkSamePlayer
}
