import express from 'express'
import games from '../repositories/games_repository.js'
import { asyncRoute, error } from '../lib/utils.js';
import { enc, dec } from '../lib/crypt.js'
import { checkSamePlayer } from './middleware.js';

const router = express.Router();

function encodeMovement(id, num) {
  return enc(JSON.stringify({game: id, movement: num}))
}

function decodeMovement(codedMovement) {
  return JSON.parse(dec(codedMovement))
}

async function getGame(req, res, next) {
  const id = parseInt(req.params.id);
  const game = await games.game(id)

  if(!game) return res.status(404).send(error('Unknown game'))

  req.game = game
  next()
}

async function getMovementInfo(req, res, next) {
  const game = req.game

  try {

    const movInfo = decodeMovement(req.params.movid)

    if(movInfo.game === undefined || movInfo.movement === undefined) throw "Invalid data"
    if(movInfo.game !== game.id) throw "Movement not belongs to this game"
    if(movInfo.movement >= game.movements.length) throw 'Invalid movement'
    if(movInfo.movement < 0) throw 'Movements start at 0'

    req.movement = movInfo

  } catch(err) {
    return res.status(404).send(error('Invalid movement'))
  }

  next()
}

router.get('/game/:id', getGame, checkSamePlayer, asyncRoute(async (req, res) => {
  const game = { ...req.game }

  delete game.movements
  game.first_movement = encodeMovement(game.id, 0)

  res.send(game)
}))

router.get('/game/:id/movements/:movid', getGame, checkSamePlayer, getMovementInfo, asyncRoute(async (req, res) => {

  const game = req.game
  const movInfo = req.movement

  let nextMovement = movInfo.movement + 1
  if(nextMovement >= game.movements.length) nextMovement = null;

  const data = {
    movement: game.movements[movInfo.movement],
    next: nextMovement ? encodeMovement(game.id, nextMovement) : null
  }

  res.send(data)
}))

export default router;
