import { FastifyInstance } from "fastify";
import { knex } from "../database"
import { randomUUID } from "crypto";
import { z } from "zod"

export async function publishersRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const publishers = await knex('Publisher').select('*')
        return { publishers }
    })

    app.get('/:id', async (request) => {
        const getPublisherParamSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getPublisherParamSchema.parse(request.params)

        const publisher = await knex('Publisher').where('ID', id).first()

        return { publisher }
    })

    app.post('/', async (request, reply) => {
        const createPublisherBodySchema = z.object({
            Name: z.string(),
            BriefDescription: z.string().optional(),
        })

        const { Name, BriefDescription } = createPublisherBodySchema.parse(request.body)

        await knex('Publisher').insert({
            ID: randomUUID(),
            Name,
            BriefDescription,
            created_at: new Date()
        })

        return reply.status(201).send()
    })
}
