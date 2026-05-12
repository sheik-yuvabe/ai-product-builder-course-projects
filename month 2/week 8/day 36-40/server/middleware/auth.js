import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'local_practice_secret'

export function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    jwtSecret,
    { expiresIn: '1d' },
  )
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Login is required.' })
  }

  try {
    req.user = jwt.verify(token, jwtSecret)
    next()
  } catch {
    res.status(401).json({ error: 'Session is invalid or expired.' })
  }
}
