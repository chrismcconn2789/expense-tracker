"use server";

import prisma from "../lib/prisma";

export const getAllTransactions = async () => {
  return await prisma.expense.findMany();
};

export const addTransaction = async (
  title: string,
  amount: number,
  category: string
) => {
  const type = category.split("-")[0] === "income" ? "Income" : "Expense";
  let formattedAmount =
    category.split("-")[0] === "income" ? amount : amount * -1;
  await prisma.expense.create({
    data: {
      title,
      amount: formattedAmount,
      userId: 1,
      category,
      type,
    },
  });
};
