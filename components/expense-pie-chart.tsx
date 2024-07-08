"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { transactionType } from "@/lib/models";
import { RxDotFilled } from "react-icons/rx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const nameFormatter = (name: string): string => {
  return (
    name.split("-")[1].charAt(0).toUpperCase() + name.split("-")[1].slice(1)
  );
};

export function ExpensePieChart({
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
  transactionTypes.forEach((occurrence) => {
    counts[occurrence] = counts[occurrence] ? counts[occurrence] + 1 : 1;
  });

  const COLORS = [
    "#4cc9f0",
    "#4895ef",
    "#3f37c9",
    "#480ca8",
    "#7209b7",
    "#b5179e",
    "#f72585",
  ];

  const chartConfig: {
    [key: string]: { label: string; color: string; count: number };
  } = {} satisfies ChartConfig;

  Object.keys(counts).forEach((occurance, index) => {
    chartConfig[occurance] = {
      label: nameFormatter(occurance),
      color: COLORS[index],
      count: counts[occurance],
    };
  });

  const total = expenseTotal;
  const formattedTransactionData = Object.entries(counts).map(
    ([key, value], index) => {
      return {
        label: key,
        amount: value,
        fill: COLORS[index],
      };
    }
  );

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
                <RxDotFilled color={`${COLORS[index]}`} className="scale-150" />
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
