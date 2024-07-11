import { getAllTransactions } from "@/actions/expense";
import { ExpenseBarChart } from "@/components/expense-bar-chart";
import { ExpensePieChart } from "@/components/expense-pie-chart";
import { IncomeBarChart } from "@/components/income-bar-chart";
import { IncomePieChart } from "@/components/income-pie-chart";
import TabsContainer from "@/components/tabs-container";
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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4">
      <Card className="col-span-1 md:col-span-2">
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
          -£{totalExpense * -1}
        </CardContent>
      </Card>
      <TabsContainer
        cardTitle="Income Breakdown"
        cardDescription="Income frequency by category"
        piechartChild={
          <IncomePieChart
            transactionData={transactions}
            incomeTotal={totalIncome}
          />
        }
        barchartChild={
          <IncomeBarChart
            transactionData={transactions}
            incomeTotal={totalIncome}
          />
        }
      />
      <TabsContainer
        cardTitle="Expense Breakdown"
        cardDescription="Expense frequency by category"
        piechartChild={
          <ExpensePieChart
            transactionData={transactions}
            expenseTotal={totalExpense}
          />
        }
        barchartChild={
          <ExpenseBarChart
            transactionData={transactions}
            expenseTotal={totalExpense}
          />
        }
      />
    </div>
  );
}
