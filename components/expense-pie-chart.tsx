"use client";

import { Label, Pie, PieChart } from "recharts";

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

export function ExpensePieChart({
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
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[220px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={formattedTransactionData}
            dataKey="amount"
            nameKey="label"
            innerRadius={65}
            strokeWidth={20}
            paddingAngle={1}
            isAnimationActive={false}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground flex flex-col gap-2 text-xl font-semibold"
                      >
                        -£{total * -1}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      ></tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
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
              <TableCell className="flex gap-2 items-center">
                <RxDotFilled
                  color={`${chartColors[index]}`}
                  className="scale-150"
                />
                {nameFormatter(item.label)}
              </TableCell>
              <TableCell className="text-right">{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
