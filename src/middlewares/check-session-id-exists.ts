import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExists(request: FastifyRequest, reply:FastifyReply){
    const sessionID = request.cookies.sessionID

        if (!sessionID) {
            return reply.status(401).send({
                error: 'Unauthorized'
            })
        }
}