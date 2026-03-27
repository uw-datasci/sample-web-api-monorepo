export type HealthRecord = {
  status: "ok"
}

export type WelcomeRecord = {
  message: string
}

export class SystemRepository {
  getHealthRecord(): HealthRecord {
    return { status: "ok" }
  }

  getWelcomeRecord(): WelcomeRecord {
    return { message: "Fastify API is running" }
  }
}
