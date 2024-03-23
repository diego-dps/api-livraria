import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import { usersRoutes } from "./routes/users";
import cookie from "@fastify/cookie";
import { booksRoutes } from "./routes/books";
import fastifyCors from "@fastify/cors";

const app = fastify()


app.register(fastifyCors, {
    origin: '*',
    
})

app.register(usersRoutes, {
    prefix: 'users',
}) 
app.register(booksRoutes, {
    prefix: 'books',
}) 


app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server running')
})