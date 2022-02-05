import jwt from 'jsonwebtoken';
import { error } from  './utils.js'

const TOKEN_SECRET = '12345678901234567890123456789012'
const DEFAULT_TOLKEN_EXPIRATION = 300;

const NON_SECURE_PATHS = ['/login'];

function invalidClient(){
  return error('Invalid authentication token')
}

function invalidGrant(problem){
  return error('Invalid authentication token', problem)
}

function generateAccessToken(username) {
  return jwt.sign(username, TOKEN_SECRET, { expiresIn: DEFAULT_TOLKEN_EXPIRATION });
}

function authenticateToken(req, res, next) {
  if (NON_SECURE_PATHS.includes(req.path)) return next();

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send(invalidClient())

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send(invalidGrant(err.message))
    req.user = user
    next()
  })
}

export {
  authenticateToken,
  generateAccessToken,
  DEFAULT_TOLKEN_EXPIRATION
}
