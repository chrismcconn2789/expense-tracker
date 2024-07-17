"use server";

import prisma from "../lib/prisma";

export const getAllTransactions = async (userId: string) => {
  return await prisma.expense.findMany({
    where: {
      clerkUserId: userId,
    },
  });
};

export const addTransaction = async (
  title: string,
  amount: number,
  category: string,
  clerkUserId: string
) => {
  const type = category.split("-")[0] === "income" ? "Income" : "Expense";
  let formattedAmount =
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
};
