import { getAllTransactions } from "@/actions/expense";
import PieChartVisual from "@/components/pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const transactions = await getAllTransactions();
  const total = transactions
    .map((transaction) => transaction.amount)
    .reduce((sum, acc) => sum + acc, 0);

  const totalIncome = transactions
    .map((transaction) => transaction.amount)
    .filter((amount) => amount > 0)
    .reduce((sum, acc) => sum + acc, 0);

  const totalExpense = total - totalIncome;
  return (
    <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Total Amount</CardTitle>
          <CardDescription>Your total income and outgoings</CardDescription>
        </CardHeader>
        <CardContent>£{total}</CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
          <CardDescription>Your total income</CardDescription>
        </CardHeader>
        <CardContent className="font-semibold text-green-500">
          £{totalIncome}
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Total Outgoings</CardTitle>
          <CardDescription>Your total outgoing</CardDescription>
        </CardHeader>
        <CardContent className="font-semibold text-red-500">
          £{totalExpense}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="mb-0 pb-0">
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Expense amount by cateogry</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChartVisual
            expenseTotal={totalExpense}
            transactionData={transactions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
