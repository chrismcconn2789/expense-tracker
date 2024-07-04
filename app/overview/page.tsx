import { getAllTransactions } from "@/actions/expense";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Overview() {
  const transactions = await getAllTransactions();
  const formatCategory = (name: string): string => {
    return (
      name.split("-")[1].charAt(0).toUpperCase() + name.split("-")[1].slice(1)
    );
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <h2 className="text-xl font-bold">Transactions</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Income/Expense</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{formatCategory(transaction.category)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell
                className={
                  transaction.amount > 0 ? "text-green-500" : "text-red-500"
                }
              >
                £{transaction.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
