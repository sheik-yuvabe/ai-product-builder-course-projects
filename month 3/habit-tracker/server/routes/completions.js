import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const userId = request.user.id
  const result = await pool.query(
    `
      SELECT
        habit_completions.id,
        habit_completions.habit_id,
        habits.name AS habit_name,
        habit_completions.completed_date
      FROM habit_completions
      JOIN habits ON habits.id = habit_completions.habit_id
      WHERE habits.user_id = $1
      ORDER BY habit_completions.completed_date DESC
    `,
    [userId],
  )

  response.json(result.rows)
})

router.post('/habits/:id/today', async (request, response) => {
  const habitId = Number(request.params.id)

  if (!Number.isInteger(habitId)) {
    return response.status(400).json({ message: 'Invalid habit id' })
  }

  const userId = request.user.id
  const habitResult = await pool.query(
    'SELECT id FROM habits WHERE id = $1 AND user_id = $2',
    [habitId, userId],
  )

  if (habitResult.rowCount === 0) {
    return response.status(404).json({ message: 'Habit not found' })
  }

  const result = await pool.query(
    `
      INSERT INTO habit_completions (habit_id, completed_date)
      VALUES ($1, CURRENT_DATE)
      ON CONFLICT (habit_id, completed_date) DO NOTHING
      RETURNING id, habit_id, completed_date
    `,
    [habitId],
  )

  if (result.rowCount === 0) {
    return response.json({ habitId, completed: true })
  }

  return response.status(201).json(result.rows[0])
})

router.delete('/habits/:id/today', async (request, response) => {
  const habitId = Number(request.params.id)

  if (!Number.isInteger(habitId)) {
    return response.status(400).json({ message: 'Invalid habit id' })
  }

  const userId = request.user.id
  const result = await pool.query(
    `
      DELETE FROM habit_completions
      USING habits
      WHERE habit_completions.habit_id = habits.id
        AND habit_completions.habit_id = $1
        AND habits.user_id = $2
        AND habit_completions.completed_date = CURRENT_DATE
    `,
    [habitId, userId],
  )

  if (result.rowCount === 0) {
    return response.status(404).json({ message: 'Completion not found' })
  }

  return response.status(204).send()
})

export default router
