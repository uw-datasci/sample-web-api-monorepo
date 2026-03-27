import type { FastifyInstance } from "fastify"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"

export async function registerSwagger(server: FastifyInstance) {
  await server.register(swagger, {
    openapi: {
      info: {
        title: "Sample API",
        version: "1.0.0",
      },
    },
  })

  await server.register(swaggerUi, { routePrefix: "/docs" })
}
