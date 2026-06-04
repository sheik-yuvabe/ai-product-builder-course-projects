import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import pool from './db.js'
import handleErrors from './middleware/handleErrors.js'
import requireAuth from './middleware/requireAuth.js'
import authRouter from './routes/auth.js'
import completionsRouter from './routes/completions.js'
import habitsRouter from './routes/habits.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/habits', requireAuth, habitsRouter)
app.use('/api/completions', requireAuth, completionsRouter)

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    message: 'Habit Tracker API is running',
  })
})

app.get('/api/db-health', async (request, response) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time')

    response.json({
      status: 'ok',
      databaseTime: result.rows[0].current_time,
    })
  } catch {
    response.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    })
  }
})

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
