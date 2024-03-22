import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";
import { usersRoutes } from "./routes/users";
import cookie from "@fastify/cookie";

const app = fastify()


app.register(cookie)

app.register(usersRoutes, {
    prefix: 'users',
}) 

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server running')
})