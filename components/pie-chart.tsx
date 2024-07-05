"use client";

import type { transactionType } from "@/lib/models";
import {
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function PieChartVisual({
  transactionData,
  expenseTotal,
}: {
  transactionData: transactionType[];
  expenseTotal: number;
}) {
  const transactions = transactionData;
  const transactionTypes: string[] = transactions
    .filter((transaction) => transaction.category.includes("expense"))
    .map((transaction) => transaction.category);

  const counts: { [key: string]: number } = {};
  for (const occurance of transactionTypes) {
    counts[occurance] = counts[occurance] ? counts[occurance] + 1 : 1;
  }

  const formatter = (name: string): string => {
    return (
      name.split("-")[1].charAt(0).toUpperCase() + name.split("-")[1].slice(1)
    );
  };

  const COLORS = ["#3C82F6", "#D946EF", "#8B5CF6", "#6466F1", "#06B6D4"];

  const data = Object.entries(counts).map(([key, value], index) => {
    return {
      name: formatter(key),
      value: value,
      fill: COLORS[index],
      x: 100,
      y: 20,
    };
  });

  return (
    <div className="flex flex-1 w-full">
      <ResponsiveContainer className="min-h-52">
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload?.length) {
                return (
                  <div className="text-black dark:text-white flex gap-2 text-sm dark:bg-black bg-white p-2 border  border-gray-200 rounded-md shadow-md">
                    <span>{`${payload[0].name}`}</span>
                    <span className="font-semibold">{`${payload[0].value}`}</span>
                  </div>
                );
              }
            }}
          />
          <Legend
            className="hidden md:flex"
            iconSize={8}
            iconType="circle"
            verticalAlign="middle"
            align="right"
            layout="vertical"
            formatter={(value) => {
              return (
                <span className="dark:text-white text-black ml-1">{value}</span>
              );
            }}
          />
          <Pie
            id="pie"
            data={data}
            cx={80}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            paddingAngle={2}
            isAnimationActive={false}
          >
            <Label width={30} position="center">
              {`£${expenseTotal}`}
            </Label>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
