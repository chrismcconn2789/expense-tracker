import { addTransaction } from "@/actions/expense";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { expenseCategories, incomeCategories } from "@/lib/models";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateExpense() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const createTransaction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const amount = formData.get("amount");
    const category = formData.get("category") as string;
    if (!title || !amount || !category) {
      return;
    }
    addTransaction(title, +amount, category);
    revalidatePath("/overview");
    revalidatePath("/");
    redirect("/overview");
  };
  return (
    <div className="w-full">
      <Card className="p-4">
        <CardTitle className="mb-1">Create an income/expense</CardTitle>
        <CardDescription className="mb-4">
          Enter a income/expense title, an amount and choose a category
        </CardDescription>
        <form action={createTransaction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0"
                max="1000000"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Income</SelectLabel>
                    {incomeCategories.map((category) => {
                      return (
                        <SelectItem value={category.value}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                    <SelectLabel>Expense</SelectLabel>
                    {expenseCategories.map((category) => {
                      return (
                        <SelectItem value={category.value}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-8">Create Transaction</Button>
        </form>
      </Card>
    </div>
  );
}
