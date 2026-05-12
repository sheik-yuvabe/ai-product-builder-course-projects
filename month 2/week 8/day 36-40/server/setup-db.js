import 'dotenv/config'
import fs from 'node:fs/promises'
import pg from 'pg'

const { Pool } = pg

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@localhost:5432/rental_scout_v1'

const appDatabaseUrl = new URL(connectionString)
const databaseName = appDatabaseUrl.pathname.slice(1)

if (!/^[a-zA-Z0-9_]+$/.test(databaseName)) {
  console.error('Database name should contain only letters, numbers, and underscores.')
  process.exit(1)
}

try {
  const maintenanceUrl = new URL(connectionString)
  maintenanceUrl.pathname = '/postgres'

  const maintenancePool = new Pool({ connectionString: maintenanceUrl.toString() })
  const databaseResult = await maintenancePool.query(
    'select 1 from pg_database where datname = $1',
    [databaseName],
  )

  if (databaseResult.rowCount === 0) {
    await maintenancePool.query(`create database ${databaseName}`)
    console.log(`Created database ${databaseName}.`)
  }

  await maintenancePool.end()

  const pool = new Pool({ connectionString })
  const schema = await fs.readFile(new URL('./schema.sql', import.meta.url), 'utf8')
  await pool.query(schema)
  await pool.end()
  console.log('Database tables and seed data are ready.')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
