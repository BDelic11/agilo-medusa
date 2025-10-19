import fs from "fs"
import path from "path"

const BACKEND = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const ADMIN_EMAIL = process.env.MEDUSA_ADMIN_EMAIL || "admin@medusa.local"
const ADMIN_PASSWORD = process.env.MEDUSA_ADMIN_PASSWORD || "supersecret"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
const DEFAULT_REGION = (
  process.env.NEXT_PUBLIC_DEFAULT_REGION || "hr"
).toLowerCase()

async function main() {
  const authRes = await fetch(`${BACKEND}/admin/auth`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  if (!authRes.ok) {
    const t = await authRes.text()
    throw new Error(`Admin auth failed: ${t}`)
  }
  const { access_token } = await authRes.json()
  const H = {
    Authorization: `Bearer ${access_token}`,
    "content-type": "application/json",
  }

  const scRes = await fetch(`${BACKEND}/admin/sales-channels`, { headers: H })
  if (!scRes.ok) throw new Error("Cannot list sales channels")
  const scJson = await scRes.json()
  const defaultSC =
    scJson.sales_channels?.find(
      (s: any) => s.name === "Default Sales Channel"
    ) || scJson.sales_channels?.[0]
  if (!defaultSC) throw new Error("No sales channel found")

  const create = await fetch(`${BACKEND}/admin/publishable-api-keys`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ title: "Auto PK for Storefront" }),
  })
  if (!create.ok) {
    const t = await create.text()
    throw new Error(`Create PK failed: ${t}`)
  }
  const created = await create.json()
  const pkeyId = created.publishable_api_key.id as string
  const pkToken = created.publishable_api_key.token as string

  await fetch(
    `${BACKEND}/admin/publishable-api-keys/${pkeyId}/sales-channels`,
    {
      method: "POST",
      headers: H,
      body: JSON.stringify({ add: [defaultSC.id], remove: [] }),
    }
  )

  const envPath = path.join(process.cwd(), ".env.local")
  let content = ""
  if (fs.existsSync(envPath)) content = fs.readFileSync(envPath, "utf8")

  const set = (key: string, value: string) => {
    const re = new RegExp(`^${key}=.*$`, "m")
    if (re.test(content)) content = content.replace(re, `${key}=${value}`)
    else content += (content.endsWith("\n") ? "" : "\n") + `${key}=${value}\n`
  }

  set("MEDUSA_BACKEND_URL", BACKEND)
  set("NEXT_PUBLIC_BASE_URL", BASE_URL)
  set("NEXT_PUBLIC_DEFAULT_REGION", DEFAULT_REGION)
  set("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY", pkToken)

  fs.writeFileSync(envPath, content, "utf8")
  console.log(
    "Wrote storefront/.env.local with publishable key and base config."
  )
  console.log("PK token:", pkToken)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
