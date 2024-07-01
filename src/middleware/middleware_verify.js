import jwt from 'jsonwebtoken'
import { secretKey } from '../utils/utils.js'

const extractToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) { return res.status(401).json({ error: 'No token provided' }) }
  return token
}

const verifyToken = (token) => {
  const payload = jwt.verify(token, secretKey)
  if (!token) { return { error: 'incorrect Token' } }
  return payload
}

export const authMiddleware = (req, res, next) => {
  try {
    req.user = verifyToken(extractToken(req))
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({ error: 'Invalid token' })
  }
}
