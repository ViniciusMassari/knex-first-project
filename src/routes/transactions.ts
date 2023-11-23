import { FastifyInstance } from "fastify";

import TransactionController from "../controllers/transactionsController";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    TransactionController.getTransactionsSummary,
  );
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    TransactionController.getTransaction,
  );
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    TransactionController.getAllTransactions,
  );
  app.post("/", TransactionController.createTransaction);
}
