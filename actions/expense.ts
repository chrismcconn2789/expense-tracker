"use server";

import { z } from "zod";
import prisma from "../lib/prisma";
import { actionClient } from "./safe-action";

const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().multipleOf(0.01),
  category: z.string(),
  clerkUserId: z.string(),
});

export const addTransaction = actionClient
  .schema(expenseSchema)
  .action(async ({ parsedInput: { title, amount, category, clerkUserId } }) => {
    const type = category.split("-")[0] === "income" ? "Income" : "Expense";
    const formattedAmount =
      category.split("-")[0] === "income" ? amount : amount * -1;
    await prisma.expense.create({
      data: {
        title,
        amount: formattedAmount,
        category,
        type,
        clerkUserId,
      },
    });
  });

export const getAllTransactions = async (userId: string) => {
  return await prisma.expense.findMany({
    where: {
      clerkUserId: userId,
    },
  });
};
