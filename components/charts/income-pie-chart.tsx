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
} from "@/lib/utils";
import DataTable from "../reusable/data-table";

export function IncomePieChart({
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
            animationDuration={1000}
            animationBegin={0}
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
                        className="fill-foreground text-xl font-semibold"
                      >
                        £{total}
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

      <DataTable transactionData={formattedTransactionData} />
    </div>
  );
}
