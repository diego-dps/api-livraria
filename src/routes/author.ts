import { FastifyInstance } from "fastify";
import { knex } from "../database"
import { randomUUID } from "crypto";
import { z } from "zod"

export async function authorsRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const authors = await knex('Author').select('*')
        return { authors }
    })

    app.get('/:id', async (request) => {
        const getAuthorParamSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getAuthorParamSchema.parse(request.params)

        const author = await knex('Author').where('ID', id).first()

        return { author }
    })

    app.post('/', async (request, reply) => {
        const createAuthorBodySchema = z.object({
            Name: z.string(),
            BriefDescription: z.string().optional(),
        })

        const { Name, BriefDescription } = createAuthorBodySchema.parse(request.body)

        await knex('Author').insert({
            ID: randomUUID(),
            Name,
            BriefDescription,
            created_at: new Date()
        })

        return reply.status(201).send()
    })
}
