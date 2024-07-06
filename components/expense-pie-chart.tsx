"use client";
import { transactionType } from "@/lib/models";
import { DonutChart, List, ListItem } from "@tremor/react";
import { RxDotFilled } from "react-icons/rx";

const nameFormatter = (name: string): string => {
  return (
    name.split("-")[1].charAt(0).toUpperCase() + name.split("-")[1].slice(1)
  );
};

export default function ExpensePieChart({
  transactionData,
  expenseTotal,
}: {
  transactionData: transactionType[];
  expenseTotal: number;
}) {
  const transactionTypes: string[] = transactionData
    .filter((transaction) => transaction.category.includes("expense"))
    .map((transaction) => transaction.category);

  const counts: { [key: string]: number } = {};
  for (const occurance of transactionTypes) {
    counts[occurance] = counts[occurance] ? counts[occurance] + 1 : 1;
  }

  const COLORS = ["cyan", "blue", "indigo", "violet", "fuchsia", "purple"];

  const total = expenseTotal * -1;
  const formattedTransactionData = Object.entries(counts).map(
    ([key, value], index) => {
      return {
        name: key,
        amount: value,
        color: COLORS[index],
      };
    }
  );
  return (
    <>
      <DonutChart
        className="mt-8"
        data={formattedTransactionData}
        category="amount"
        index="name"
        showTooltip={true}
        label={"-£" + total.toString()}
        customTooltip={({ active, payload }) => {
          if (active && payload?.length) {
            return (
              <div className="text-black dark:text-white flex gap-2 text-sm dark:bg-black bg-white p-2 border  border-gray-200 rounded-md shadow-md">
                <span>{`${nameFormatter(payload[0].name)}`}</span>
                <span className="font-semibold">{`${payload[0].value}`}</span>
              </div>
            );
          }
        }}
        colors={COLORS}
      />
      <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
        <span>Category</span>
        <span>Amount</span>
      </p>
      <List className="mt-2">
        {formattedTransactionData.map((item, index) => (
          <ListItem key={item.name} className="space-x-6">
            <div className="flex items-center space-x-2.5 truncate">
              <span
                className={"h-2.5 w-2.5 shrink-0 rounded-sm"}
                aria-hidden={true}
              />
              <span className="truncate dark:text-dark-tremor-content-emphasis">
                <RxDotFilled
                  className={`inline scale-150 mr-2 text-${COLORS[index]}-500`}
                />
                {nameFormatter(item.name)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.amount}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
}
