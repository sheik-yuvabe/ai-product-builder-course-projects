import express from 'express'
import { requireAuth } from '../middleware/auth.js'
import { query } from '../db.js'

const router = express.Router()

function validateListing(body) {
  const title = body.title?.trim()
  const city = body.city?.trim()
  const description = body.description?.trim()
  const monthlyRent = Number(body.monthly_rent)

  if (!title || !city || !description || !monthlyRent) {
    return { error: 'Title, city, rent, and description are required.' }
  }

  if (monthlyRent < 1000) {
    return { error: 'Rent should be at least 1000.' }
  }

  return { title, city, description, monthlyRent }
}

router.get('/', async (req, res, next) => {
  try {
    const result = await query(
      `select listings.*, users.name as owner_name
       from listings
       left join users on users.id = listings.owner_id
       order by listings.created_at desc`,
    )

    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      'select * from listings where owner_id = $1 order by created_at desc',
      [req.user.id],
    )

    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const listingId = Number(req.params.id)

    if (!Number.isInteger(listingId)) {
      return res.status(400).json({ error: 'Listing ID must be a number.' })
    }

    const result = await query(
      `select listings.*, users.name as owner_name
       from listings
       left join users on users.id = listings.owner_id
       where listings.id = $1`,
      [listingId],
    )

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Listing not found.' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const listing = validateListing(req.body)

    if (listing.error) {
      return res.status(400).json({ error: listing.error })
    }

    const result = await query(
      `insert into listings (title, city, monthly_rent, description, owner_id)
       values ($1, $2, $3, $4, $5)
       returning *`,
      [
        listing.title,
        listing.city,
        listing.monthlyRent,
        listing.description,
        req.user.id,
      ],
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const listing = validateListing(req.body)

    if (listing.error) {
      return res.status(400).json({ error: listing.error })
    }

    const result = await query(
      `update listings
       set title = $1, city = $2, monthly_rent = $3, description = $4
       where id = $5 and owner_id = $6
       returning *`,
      [
        listing.title,
        listing.city,
        listing.monthlyRent,
        listing.description,
        req.params.id,
        req.user.id,
      ],
    )

    if (!result.rows[0]) {
      return res.status(403).json({ error: 'You can edit only your own listing.' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const result = await query(
      'delete from listings where id = $1 and owner_id = $2 returning id',
      [req.params.id, req.user.id],
    )

    if (!result.rows[0]) {
      return res.status(403).json({ error: 'You can delete only your own listing.' })
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
