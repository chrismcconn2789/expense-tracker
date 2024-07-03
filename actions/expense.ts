"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { redirect } from "next/navigation";

export const getAllTransactions = async () => {
  return await prisma.expense.findMany();
};

export const addTransaction = async (title: string, amount: number) => {
  await prisma.expense.create({
    data: {
      title,
      amount,
      userId: 1,
    },
  });
};
