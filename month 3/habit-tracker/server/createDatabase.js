import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const { Client } = pg

function getDatabaseName(connectionString) {
  const databaseUrl = new URL(connectionString)
  const databaseName = databaseUrl.pathname.replace('/', '')

  if (!/^[a-zA-Z0-9_]+$/.test(databaseName)) {
    throw new Error('Database name can only contain letters, numbers, and underscores')
  }

  return databaseName
}

async function createDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing from .env')
  }

  const databaseName = getDatabaseName(process.env.DATABASE_URL)
  const maintenanceUrl = new URL(process.env.DATABASE_URL)
  maintenanceUrl.pathname = '/postgres'

  const client = new Client({
    connectionString: maintenanceUrl.toString(),
  })

  await client.connect()

  const existingDatabase = await client.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [databaseName],
  )

  if (existingDatabase.rowCount === 0) {
    await client.query(`CREATE DATABASE "${databaseName}"`)
    console.log(`Database "${databaseName}" created`)
  } else {
    console.log(`Database "${databaseName}" already exists`)
  }

  await client.end()
}

createDatabase().catch((error) => {
  console.error('Database creation failed:', error.message)
  process.exit(1)
})
