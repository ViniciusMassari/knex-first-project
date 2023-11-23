import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { ITransaction } from "../../types";

export default class TransactionModel {
  static async getAllTransactions(sessionId: string) {
    return await knex("transactions").where("session_id", sessionId).select();
  }

  static async getTransactionsSummary(sessionId: string) {
    return await knex("transactions")
      .where("session_id", sessionId)
      .sum("amount", { as: "amount" })
      .first();
  }

  static async getTransaction(id: string, sessionId: string) {
    return await knex("transactions")
      .where({
        session_id: sessionId,
        id,
      })
      .first();
  }

  static async createTransaction(
    transaction: ITransaction,
    sessionId?: string,
  ) {
    const { title, amount, type } = transaction;
    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
      session_id: sessionId,
    });
  }
}
