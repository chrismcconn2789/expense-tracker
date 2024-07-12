"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { transactionType } from "@/lib/models";
import {
  chartColors,
  countOccurrences,
  formatTransactionData,
  generateChartConfig,
  getTransactionTypes,
  nameFormatter,
} from "@/lib/utils";
import DataTable from "../reusable/data-table";

export function ExpenseBarChart({
  transactionData,
  expenseTotal,
}: {
  transactionData: transactionType[];
  expenseTotal: number;
}) {
  const transactionTypes: string[] = getTransactionTypes(
    transactionData,
    "expense"
  );
  const total = expenseTotal;
  const counts = countOccurrences(transactionTypes);
  const chartConfig = generateChartConfig(counts, chartColors);
  const formattedTransactionData = formatTransactionData(counts, chartColors);

  return (
    <div>
      <ChartContainer className="mt-7" config={chartConfig}>
        <BarChart accessibilityLayer data={formattedTransactionData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => nameFormatter(value)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="amount" name="label" strokeWidth={2} radius={8} />
        </BarChart>
      </ChartContainer>

      <DataTable transactionData={formattedTransactionData} />
    </div>
  );
}
