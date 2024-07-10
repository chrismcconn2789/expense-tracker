import { ChartConfig } from "@/components/ui/chart";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { transactionType } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTransactionTypes = (
  transactionData: transactionType[],
  type: string
): string[] => {
  return transactionData
    .filter((transaction) => transaction.category.includes(type))
    .map((transaction) => transaction.category);
};

export const nameFormatter = (name: string): string => {
  return (
    name.split("-")[1].charAt(0).toUpperCase() + name.split("-")[1].slice(1)
  );
};

export const countOccurrences = (transactionTypes: string[]) => {
  const counts: { [key: string]: number } = {};
  transactionTypes.forEach((occurrence) => {
    counts[occurrence] = counts[occurrence] ? counts[occurrence] + 1 : 1;
  });
  return counts;
};

export const generateChartConfig = (
  counts: { [key: string]: number },
  chartColors: string[]
): ChartConfig => {
  const chartConfig: {
    [key: string]: { label: string; color: string; count: number };
  } = {} satisfies ChartConfig;

  Object.keys(counts).forEach((occurrence, index) => {
    const label = nameFormatter(occurrence);
    chartConfig[occurrence] = {
      label: label,
      color: chartColors[index],
      count: counts[occurrence],
    };
  });

  return chartConfig;
};

export const formatTransactionData = (
  counts: { [key: string]: number },
  chartColors: string[]
): { label: string; amount: number; fill: string }[] => {
  return Object.entries(counts).map(([key, value], index) => ({
    label: key,
    amount: value,
    fill: chartColors[index],
  }));
};

export const chartColors = [
  "#4cc9f0",
  "#4895ef",
  "#3f37c9",
  "#480ca8",
  "#7209b7",
  "#b5179e",
  "#f72585",
];
