import bcrypt from 'bcryptjs'
import express from 'express'
import { createToken, requireAuth } from '../middleware/auth.js'
import { query } from '../db.js'

const router = express.Router()

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email }
}

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await query(
      `insert into users (name, email, password_hash)
       values ($1, lower($2), $3)
       returning id, name, email`,
      [name.trim(), email.trim(), passwordHash],
    )
    const user = result.rows[0]

    res.status(201).json({ user: publicUser(user), token: createToken(user) })
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'This email is already registered.' })
    }

    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const result = await query('select * from users where email = lower($1)', [
      email.trim(),
    ])
    const user = result.rows[0]
    const passwordMatches = user
      ? await bcrypt.compare(password, user.password_hash)
      : false

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Email or password is wrong.' })
    }

    res.json({ user: publicUser(user), token: createToken(user) })
  } catch (error) {
    next(error)
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

export default router
