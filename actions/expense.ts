import prisma from "../lib/prisma";

export const getAllTransactions = async () => {
  return await prisma.expense.findMany();
};

export const addTransaction = async (title: string, amount: number) => {
  return await prisma.expense.create({
    data: {
      title,
      amount,
      userId: 1,
    },
  });
};
