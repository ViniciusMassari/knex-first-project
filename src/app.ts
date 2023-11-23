import fastify from "fastify";
import { knex } from "./database";
import { transactionRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cookie);
app.register(transactionRoutes, {
  prefix: "transactions",
});

app.get("/hello", async (req, rep) => {
  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");
  return transaction;
});
