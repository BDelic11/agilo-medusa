import { Pool } from "pg"
import type { MedusaContainer } from "@medusajs/medusa"

type ExecArgs = { container: MedusaContainer }

export default async function nuke(_args: ExecArgs) {
  if (!process.argv.includes("--yes")) {
    console.error("Add --yes to confirm. Primjer: yarn db:nuke")
    process.exit(1)
  }

  const url = process.env.DATABASE_URL
  if (!url) {
    console.error("DATABASE_URL nije postavljen")
    process.exit(1)
  }

  const pool = new Pool({ connectionString: url })
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    await client.query(
      "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;"
    )
    await client.query("GRANT ALL ON SCHEMA public TO public;")
    await client.query("COMMIT")
    console.log("Database nuked: schema 'public' dropped and recreated.")
  } catch (e) {
    await client.query("ROLLBACK")
    console.error(e)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}
