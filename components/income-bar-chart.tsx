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
import { RxDotFilled } from "react-icons/rx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function IncomeBarChart({
  transactionData,
  incomeTotal,
}: {
  transactionData: transactionType[];
  incomeTotal: number;
}) {
  const transactionTypes: string[] = getTransactionTypes(
    transactionData,
    "income"
  );
  const total = incomeTotal;
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

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedTransactionData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="flex gap-2 px-4 py-2 items-center">
                <RxDotFilled
                  color={`${chartColors[index]}`}
                  className="scale-150"
                />
                {nameFormatter(item.label)}
              </TableCell>
              <TableCell className="text-right px-4 py-2">
                {item.amount}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              className="text-right font-semibold text-green-500"
              colSpan={2}
            >
              £{total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
