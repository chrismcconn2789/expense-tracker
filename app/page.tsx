import { addTransaction, getAllTransactions } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { PoundSterlingIcon, PlusIcon } from "lucide-react";

export default async function Home() {
  const createTransaction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const amount = formData.get("amount");
    if (!title || !amount) {
      return;
    }
    revalidatePath("/");
    return addTransaction(title, +amount);
  };
  const transactions = await getAllTransactions();
  const total = transactions
    .map((transaction) => transaction.amount)
    .reduce((sum, acc) => sum + acc, 0);
  return (
    <main className="flex max-w-4xl m-auto min-h-screen flex-col items-center gap-8 p-16">
      <div className="w-full flex justify-between">
        <PoundSterlingIcon className="size-10 stroke-[3px]" />
        <h1 className="font-bold text-2xl">Expenses Tracker App</h1>
        <ModeToggle />
      </div>
      <div className="border w-full" />
      <div className="w-full">
        <div className="w-full flex justify-between">
          <h2 className="text-xl font-bold">Transactions</h2>
          <Button variant="outline">
            <PlusIcon className="size-5" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell className="text-right">
                  £{transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">£{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <form action={createTransaction} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="title">Transaction Title</Label>
          <Input type="text" id="title" name="title" />
          <Label htmlFor="amount">Transaction Amount</Label>
          <Input type="number" id="amount" name="amount" step="0.01" />
        </div>
        <Button>Add Transaction</Button>
      </form>
    </main>
  );
}
