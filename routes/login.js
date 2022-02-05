import express from 'express'
import { asyncRoute, error } from '../lib/utils.js';
import players from '../repositories/players_repository.js'
import {
  generateAccessToken,
  DEFAULT_TOLKEN_EXPIRATION
} from '../lib/jwt.js';

const router = express.Router();

router.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      req.user = JSON.parse(buf);
    } catch(e) {
      res.status(404).send('Invalid JSON');
      throw "Received invalid JSON"
    }
  }
}));

function checkJSONContent(req, res, next) {
  if(req.get('Content-Type') !== 'application/json')
    return res.status(400).send(error('Invalid content type'))

  next()
}

router.post('/login', checkJSONContent, asyncRoute(async (req, res) => {

  const player = await players.searchByUsername(req.user.username)
  if(player?.password !== req.user.password) return res.status(401).send(error('Invalid login'))

  // create token
  const tokenData = {
    id: player.id
  }

  const token = generateAccessToken(tokenData)

  const response =  {
      "access_token": token,
      "token_type":"Bearer",
      "expires_in":DEFAULT_TOLKEN_EXPIRATION,
      // No refresh for the exercise
      // "refresh_token":"IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk",
      "player_id": player.id
    }

  res.header('Cache-Control', 'no-store')
  res.json(response)
}))

export default router;
