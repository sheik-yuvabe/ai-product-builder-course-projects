import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const userId = request.user.id
  const result = await pool.query(
    `
      SELECT
        habits.id,
        habits.name,
        habits.created_at,
        habit_completions.completed_date IS NOT NULL AS completed
      FROM habits
      LEFT JOIN habit_completions
        ON habits.id = habit_completions.habit_id
        AND habit_completions.completed_date = CURRENT_DATE
      WHERE user_id = $1
      ORDER BY habits.created_at DESC
    `,
    [userId],
  )

  response.json(result.rows)
})

router.post('/', async (request, response) => {
  const { name } = request.body
  const trimmedName = name?.trim()

  if (!trimmedName) {
    return response.status(400).json({ message: 'Habit name is required' })
  }

  if (trimmedName.length > 80) {
    return response.status(400).json({ message: 'Habit name is too long' })
  }

  const userId = request.user.id
  const result = await pool.query(
    `
      INSERT INTO habits (user_id, name)
      VALUES ($1, $2)
      RETURNING id, name, created_at
    `,
    [userId, trimmedName],
  )

  return response.status(201).json(result.rows[0])
})

router.put('/:id', async (request, response) => {
  const habitId = Number(request.params.id)
  const { name } = request.body
  const trimmedName = name?.trim()

  if (!Number.isInteger(habitId)) {
    return response.status(400).json({ message: 'Invalid habit id' })
  }

  if (!trimmedName) {
    return response.status(400).json({ message: 'Habit name is required' })
  }

  if (trimmedName.length > 80) {
    return response.status(400).json({ message: 'Habit name is too long' })
  }

  const userId = request.user.id
  const result = await pool.query(
    `
      UPDATE habits
      SET name = $1
      WHERE id = $2 AND user_id = $3
      RETURNING id, name, created_at
    `,
    [trimmedName, habitId, userId],
  )

  if (result.rowCount === 0) {
    return response.status(404).json({ message: 'Habit not found' })
  }

  return response.json(result.rows[0])
})

router.delete('/:id', async (request, response) => {
  const habitId = Number(request.params.id)

  if (!Number.isInteger(habitId)) {
    return response.status(400).json({ message: 'Invalid habit id' })
  }

  const userId = request.user.id
  const result = await pool.query(
    'DELETE FROM habits WHERE id = $1 AND user_id = $2',
    [habitId, userId],
  )

  if (result.rowCount === 0) {
    return response.status(404).json({ message: 'Habit not found' })
  }

  return response.status(204).send()
})

export default router
