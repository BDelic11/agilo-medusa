import type { ExecArgs } from "@medusajs/framework/types"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
  createApiKeysWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  createRegionsWorkflow,
  createTaxRegionsWorkflow,
  updateStoresWorkflow,
  createStockLocationsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

type ProductModule = {
  listProductCollections: (selector: any, config?: any) => Promise<any[]>
  createProductCollections: (
    data: Array<{ title: string; handle?: string }>
  ) => Promise<any[]>
  listProducts: (selector: any, config?: any) => Promise<any[]>
}

const COLLECTIONS = [
  { title: "Modern Luxe", handle: "ml" },
  { title: "Boho Chic", handle: "boho-chic" },
  { title: "Scandinavian Simplicity", handle: "scandinavian-simplicity" },
]

const PRODUCT = {
  title: "Paloma Haven",
  handle: "paloma-haven",
  description:
    "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
  priceEurCents: 1_200_000,
  images: [
    "http://localhost:9000/static/paloma-haven-1.jpg",
    "http://localhost:9000/static/paloma-haven-2.jpg",
  ],
}

const COLORS = ["white", "black", "dark-gray"] as const
const MATERIALS = ["linen", "velvet", "bouclé"] as const
const COUNTRIES = ["hr", "dk"] as const

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const storeModule = container.resolve(Modules.STORE)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const productModule = container.resolve<ProductModule>(Modules.PRODUCT)

  const [store] = await storeModule.listStores()
  let [defaultChannel] = await salesChannelModule.listSalesChannels({
    name: "Default Sales Channel",
  })
  if (!defaultChannel) {
    const flows = await import("@medusajs/medusa/core-flows")
    const { result } = await flows.createSalesChannelsWorkflow(container).run({
      input: { salesChannelsData: [{ name: "Default Sales Channel" }] },
    })
    defaultChannel = result[0]
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [{ currency_code: "eur", is_default: true }],
        default_sales_channel_id: defaultChannel.id,
      },
    },
  })

  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries: Array.from(COUNTRIES),
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  })

  await createTaxRegionsWorkflow(container).run({
    input: Array.from(COUNTRIES).map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  })

  let stockLocationId: string | undefined
  {
    const existing = await query.graph({
      entity: "stock_location",
      fields: ["id", "name"],
    })
    if (existing?.data?.length) {
      stockLocationId = existing.data[0].id
    } else {
      const { result } = await createStockLocationsWorkflow(container).run({
        input: {
          locations: [
            {
              name: "Main Warehouse",
              address: {
                country_code: "HR",
                city: "Zagreb",
                address_1: "Dev 1",
              },
            },
          ],
        },
      })
      stockLocationId = result[0].id
    }

    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: { id: stockLocationId!, add: [defaultChannel.id] },
    })
  }

  const existing = await productModule.listProductCollections({
    handle: COLLECTIONS.map((c) => c.handle),
  })
  const existingByHandle = new Map(existing.map((c) => [c.handle, c]))
  const toCreate = COLLECTIONS.filter((c) => !existingByHandle.get(c.handle))
  if (toCreate.length) {
    const created = await productModule.createProductCollections(
      toCreate.map((c) => ({ title: c.title, handle: c.handle }))
    )
    for (const c of created) existingByHandle.set(c.handle, c)
  }

  const ml = existingByHandle.get("ml")
  const boho = existingByHandle.get("boho-chic")
  const scandi = existingByHandle.get("scandinavian-simplicity")
  if (!ml || !boho || !scandi) throw new Error("Collections missing")

  const variants: Array<any> = []
  for (const material of MATERIALS) {
    for (const color of COLORS) {
      const sku = `PH-${material}-${color}`.toUpperCase().replace(/\s+/g, "-")
      variants.push({
        title: `${PRODUCT.title} / ${material} / ${color}`,
        sku,
        prices: [{ amount: PRODUCT.priceEurCents, currency_code: "eur" }],
        options: { materials: material, colors: color },
      })
    }
  }

  const [existingProduct] = await productModule.listProducts({
    handle: PRODUCT.handle,
  })

  if (!existingProduct) {
    await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: PRODUCT.title,
            handle: PRODUCT.handle,
            description: PRODUCT.description,
            status: "published",
            images: PRODUCT.images.map((url) => ({ url })),
            options: [
              { title: "materials", values: Array.from(MATERIALS) },
              { title: "colors", values: Array.from(COLORS) },
            ],
            variants,
            collection_id: ml.id,
            sales_channels: [{ id: defaultChannel.id }],
          },
        ],
      },
    })
  }

  {
    const handle = "camden-retreat"
    const [exists] = await productModule.listProducts({ handle })
    if (!exists) {
      await createProductsWorkflow(container).run({
        input: {
          products: [
            {
              title: "Camden Retreat",
              handle,
              description:
                "Soft lines and relaxed comfort. A contemporary piece that fits effortlessly in eclectic interiors.",
              status: "published",
              images: [
                { url: "http://localhost:9000/static/camden-retreat.jpg" },
              ],
              options: [
                { title: "Default option", values: ["Default option value"] },
              ],
              variants: [
                {
                  title: "Default",
                  sku: "CR-DEFAULT",
                  prices: [{ amount: 100_000, currency_code: "eur" }],
                  options: { "Default option": "Default option value" },
                },
              ],
              collection_id: boho.id,
              sales_channels: [{ id: defaultChannel.id }],
            },
          ],
        },
      })
    }
  }

  {
    const handle = "oslo-drift"
    const [exists] = await productModule.listProducts({ handle })
    if (!exists) {
      await createProductsWorkflow(container).run({
        input: {
          products: [
            {
              title: "Oslo Drift",
              handle,
              description:
                "Scandinavian minimalism with thoughtful ergonomics. A statement piece with everyday practicality.",
              status: "published",
              images: [{ url: "http://localhost:9000/static/oslo-drift.jpg" }],
              options: [
                { title: "Default option", values: ["Default option value"] },
              ],
              variants: [
                {
                  title: "Default",
                  sku: "OD-DEFAULT",
                  prices: [{ amount: 300_000, currency_code: "eur" }],
                  options: { "Default option": "Default option value" },
                },
              ],
              collection_id: scandi.id,
              sales_channels: [{ id: defaultChannel.id }],
            },
          ],
        },
      })
    }

    const osloRes = await productModule.listProducts(
      { handle: "oslo-drift" },
      { relations: ["variants"] }
    )
    const oslo = osloRes?.[0]
    const osloDefaultVariant = oslo?.variants?.[0]

    let osloPriceSetId: string | undefined
    if (osloDefaultVariant?.id) {
      const { data: vrows } = await query.graph({
        entity: "product_variant",
        fields: ["id", "price_set.id"],
        filters: { id: osloDefaultVariant.id },
      })
      osloPriceSetId = vrows?.[0]?.price_set?.id
    }

    if (osloPriceSetId) {
      const pricing: any = container.resolve(Modules.PRICING)

      const existingLists = await pricing.listPriceLists({
        title: "Oslo Drift SALE",
        type: "sale",
      })
      let saleListId: string | undefined = existingLists?.[0]?.id

      if (!saleListId) {
        const created = await pricing.createPriceLists([
          {
            title: "Oslo Drift SALE",
            description: "Sniženo sa 3000€ na 2000€",
            status: "active",
            type: "sale",
          },
        ])
        saleListId = created[0].id
      }

      const existingSalePrices = await pricing.listPrices({
        price_list_id: saleListId,
        price_set_id: osloPriceSetId,
        currency_code: "eur",
      })

      if (!existingSalePrices?.length) {
        await pricing.createPrices([
          {
            amount: 200_000,
            currency_code: "eur",
            price_list_id: saleListId!,
            price_set_id: osloPriceSetId,
          } as any,
        ])
      }

      try {
        if (typeof pricing.addPriceListsToSalesChannels === "function") {
          await pricing.addPriceListsToSalesChannels(saleListId!, [
            defaultChannel.id,
          ])
        } else if (typeof pricing.updatePriceLists === "function") {
          await pricing.updatePriceLists([
            { id: saleListId!, sales_channels: [{ id: defaultChannel.id }] },
          ])
        }
      } catch (e) {
        logger.warn(
          `Could not link price list to sales channel programmatically (continuing): ${String(
            e
          )}`
        )
      }

      logger.info("Oslo Drift: SALE price list active (2000 EUR).")
    } else {
      logger.warn(
        "Oslo Drift: couldn't resolve price_set.id; skipping SALE price."
      )
    }
  }

  {
    const handle = "sutton-royale"
    const [exists] = await productModule.listProducts({ handle })
    if (!exists) {
      await createProductsWorkflow(container).run({
        input: {
          products: [
            {
              title: "Sutton Royale",
              handle,
              description:
                "Plush cushioning and refined silhouette. A luxe centerpiece for elegant living rooms.",
              status: "published",
              images: [
                { url: "http://localhost:9000/static/sutton-royale.jpg" },
              ],
              options: [
                { title: "Default option", values: ["Default option value"] },
              ],
              variants: [
                {
                  title: "Default",
                  sku: "SR-DEFAULT",
                  prices: [{ amount: 250_000, currency_code: "eur" }],
                  options: { "Default option": "Default option value" },
                },
              ],
              collection_id: ml.id,
              sales_channels: [{ id: defaultChannel.id }],
            },
          ],
        },
      })
    }
  }

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })
  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["inventory_item_id", "location_id"],
  })

  if (stockLocationId && inventoryItems?.length) {
    const existingPairs = new Set(
      (existingLevels || [])
        .filter((lvl: any) => lvl.location_id === stockLocationId)
        .map((lvl: any) => `${lvl.inventory_item_id}:${lvl.location_id}`)
    )

    const toCreateLevels = (inventoryItems || [])
      .map((i: any) => ({
        location_id: stockLocationId!,
        stocked_quantity: 100,
        inventory_item_id: i.id,
      }))
      .filter(
        (lvl: any) =>
          !existingPairs.has(`${lvl.inventory_item_id}:${lvl.location_id}`)
      )

    if (toCreateLevels.length) {
      await createInventoryLevelsWorkflow(container).run({
        input: { inventory_levels: toCreateLevels },
      })
    }
  }

  try {
    const { result: keys } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          { title: "Storefront Dev Key", type: "publishable", created_by: "" },
        ],
      },
    })
    const createdKey = keys?.[0]
    if (createdKey) {
      await linkSalesChannelsToApiKeyWorkflow(container).run({
        input: { id: createdKey.id, add: [defaultChannel.id] },
      })
      const token: string | undefined = (createdKey as any).token
      if (token) {
        const fs = await import("fs")
        const path = await import("path")
        const envPath = path.join(process.cwd(), "../storefront/.env.local")
        let content = fs.existsSync(envPath)
          ? fs.readFileSync(envPath, "utf8")
          : ""
        const set = (k: string, v: string) => {
          const re = new RegExp(`^${k}=.*$`, "m")
          content = re.test(content)
            ? content.replace(re, `${k}=${v}`)
            : content + (content.endsWith("\n") ? "" : "\n") + `${k}=${v}\n`
        }
        set(
          "MEDUSA_BACKEND_URL",
          process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
        )
        set(
          "NEXT_PUBLIC_BASE_URL",
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
        )
        set(
          "NEXT_PUBLIC_DEFAULT_REGION",
          process.env.NEXT_PUBLIC_DEFAULT_REGION || "hr"
        )
        set("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY", token)
        fs.writeFileSync(envPath, content, "utf8")
        logger.info(
          `Wrote storefront/.env.local with PK (${token.slice(0, 10)}…).`
        )
      }
    }
  } catch (e) {
    logger.warn(`PK ensure failed (optional): ${String(e)}`)
  }

  const regionNames = regions?.map((r) => r.name).join(", ") || ""
  logger.info(
    `Seed done: regions=[${regionNames}], collections=${COLLECTIONS.length}, products added: Paloma Haven, Camden Retreat, Oslo Drift (SALE), Sutton Royale`
  )
}
