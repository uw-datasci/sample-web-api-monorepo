import autoLoad from "@fastify/autoload"
import Fastify from "fastify"
import { dirname, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import { registerSwagger } from "./plugins/swagger"

const __dirname = dirname(fileURLToPath(import.meta.url))

const DEFAULT_PORT = 8000
const DEFAULT_HOST = "localhost"

export async function buildServer() {
  const server = Fastify({ logger: true })

  // OpenAPI documentation only in development
  if (process.env.NODE_ENV !== "production") await registerSwagger(server)

  await server.register(autoLoad, {
    dir: join(__dirname, "routes"),
    forceESM: true,
  })

  return server
}

async function start() {
  const server = await buildServer()
  const port = Number(process.env.PORT ?? DEFAULT_PORT)
  const host = process.env.HOST ?? DEFAULT_HOST

  try {
    await server.listen({ host, port })
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

const isEntryPoint =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (isEntryPoint) await start()
