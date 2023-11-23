/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import TransactionModel from "../models/transactionModel";
import { randomUUID } from "crypto";

export default class TransactionController {
  static async getTransactionsSummary(req: FastifyRequest, res: FastifyReply) {
    const { sessionId } = req.cookies;
    const summary = await TransactionModel.getTransactionsSummary(sessionId!);
    return res.status(200).send({ summary });
  }

  static async createTransaction(req: FastifyRequest, res: FastifyReply) {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    let sessionId = req.cookies?.sessionId;

    if (!sessionId) {
      const cookieExpirationInSevenDays = 1000 * 60 * 60 * 24 * 7;
      sessionId = randomUUID();
      res.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: cookieExpirationInSevenDays,
      });
    }

    const transaction = createTransactionBodySchema.parse(req.body);
    await TransactionModel.createTransaction(transaction, sessionId);

    return res.status(201).send();
  }

  static async getTransaction(req: FastifyRequest, res: FastifyReply) {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { sessionId } = req.cookies;

    const { id } = getTransactionParamsSchema.parse(req.params);

    const transaction = await TransactionModel.getTransaction(id, sessionId!);
    return { transaction };
  }

  static async getAllTransactions(req: FastifyRequest, res: FastifyReply) {
    const { sessionId } = req.cookies;
    const transactions = await TransactionModel.getAllTransactions(sessionId!);
    return { transactions };
  }
}
