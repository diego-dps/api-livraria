import { FastifyInstance } from "fastify";
import { knex } from "../database"
import { randomUUID } from "crypto";
import { z } from "zod"
import bcrypt from 'bcrypt';


export async function usersRoutes(app: FastifyInstance) {

    app.get('/', async (request, reply) => {
        const users = await knex('Users').select('*')
        return { users }
    })

    app.get('/:id', async (request) => {
        const getUserParamSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getUserParamSchema.parse(request.params)

        const user = await knex('Users').where('id', id).first()

        return { user }
    })

    app.post('/', async (request, reply) => {
        const createUserBodySchema = z.object({
            FullName: z.string(),
            Email: z.string().email(),
            Password: z.string(),
            Role: z.enum(['client', 'admin'])
        })
    
        const { FullName, Email, Password, Role } = createUserBodySchema.parse(request.body)
    
        // Gere o hash da senha
        const hashedPassword = await bcrypt.hash(Password, 10);
    
        await knex('Users').insert({
            ID: randomUUID(),
            FullName,
            Email,
            Password: hashedPassword, // Armazene o hash da senha, não a senha em texto simples
            Role
        })
    
        return reply.status(201).send()
    })

    app.post('/login', async (request, reply) => {
        const loginUserBodySchema = z.object({
            Email: z.string().email(),
            Password: z.string(),
        })

        const { Email, Password } = loginUserBodySchema.parse(request.body)

        const user = await knex('Users').where('Email', Email).first()

        if (!user) {
            reply.status(401).send({ message: 'Usuário não encontrado' })
            return
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password)

        if (!passwordMatch) {
            reply.status(401).send({ message: 'Senha incorreta' })
            return
        }

        return reply.status(200).send({ message: 'Login bem-sucedido' })
    })
}
