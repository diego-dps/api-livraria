import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import { usersRoutes } from "./routes/users";
import cookie from "@fastify/cookie";
import { booksRoutes } from "./routes/books";
import fastifyCors from "@fastify/cors";
import { authorsRoutes } from "./routes/author";
import { publishersRoutes } from "./routes/publisher";

const app = fastify()


app.register(fastifyCors, {
    origin: '*',
    
})

app.register(usersRoutes, {
    prefix: 'users',
})

app.register(authorsRoutes, {
    prefix: 'authors',
}) 

app.register(publishersRoutes, {
    prefix: 'publishers',
}) 

app.register(booksRoutes, {
    prefix: 'books',
}) 


app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server running')
})