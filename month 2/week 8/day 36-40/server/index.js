import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth.js'
import listingRoutes from './routes/listings.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)

app.use((error, req, res, next) => {
  void next
  console.error(error)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`)
})
