/*
  Warnings:

  - Made the column `amount` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET NOT NULL;
