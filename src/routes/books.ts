import { FastifyInstance } from "fastify";
import { knex } from "../database"
import { randomUUID } from "crypto";
import { z } from "zod"

export async function booksRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const books = await knex('Books').select('*')
        return { books }
    })

    app.get('/:id', async (request) => {
        const getBookParamSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getBookParamSchema.parse(request.params)

        const book = await knex('Books').where('ID', id).first()

        return { book }
    })

    app.post('/', async (request, reply) => {
        const createBookBodySchema = z.object({
            Description: z.string(),
            NumberOfPages: z.number(),
            PublisherID: z.string().uuid(),
            ImageUrl: z.string().url(),
            Category: z.string(),
            name: z.string()
        })
    
        const { Description, NumberOfPages, PublisherID, ImageUrl, Category, name } = createBookBodySchema.parse(request.body)
    
        await knex('Books').insert({
            ID: randomUUID(),
            Description,
            NumberOfPages,
            PublisherID,
            ImageUrl,
            Category,
            name, 
            created_at: new Date()
        })
    
        return reply.status(201).send()
    })
}
