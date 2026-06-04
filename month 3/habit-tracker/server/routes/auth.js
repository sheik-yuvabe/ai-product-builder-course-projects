import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = express.Router()

function createToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
}

function validateAuthInput({ name, email, password }, isSignup) {
  if (isSignup && !name?.trim()) {
    return 'Name is required'
  }

  if (!email?.trim()) {
    return 'Email is required'
  }

  if (!email.includes('@')) {
    return 'Enter a valid email address'
  }

  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters'
  }

  return ''
}

router.post('/signup', async (request, response) => {
  const { name, email, password } = request.body
  const validationError = validateAuthInput({ name, email, password }, true)

  if (validationError) {
    return response.status(400).json({ message: validationError })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const passwordHash = await bcrypt.hash(password, 10)

  try {
    const result = await pool.query(
      `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email
      `,
      [name.trim(), normalizedEmail, passwordHash],
    )
    const user = result.rows[0]

    return response.status(201).json({
      user,
      token: createToken(user),
    })
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({ message: 'Email already exists' })
    }

    throw error
  }
})

router.post('/login', async (request, response) => {
  const { email, password } = request.body
  const validationError = validateAuthInput({ email, password }, false)

  if (validationError) {
    return response.status(400).json({ message: validationError })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const result = await pool.query(
    'SELECT id, name, email, password_hash FROM users WHERE email = $1',
    [normalizedEmail],
  )

  if (result.rowCount === 0) {
    return response.status(401).json({ message: 'Invalid email or password' })
  }

  const user = result.rows[0]
  const passwordMatches = await bcrypt.compare(password, user.password_hash)

  if (!passwordMatches) {
    return response.status(401).json({ message: 'Invalid email or password' })
  }

  return response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: createToken(user),
  })
})

export default router
