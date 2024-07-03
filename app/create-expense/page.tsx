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

export default async function CreateExpense() {
  const createTransaction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const amount = formData.get("amount");
    const category = formData.get("category");
    if (!title || !amount || !category) {
      return;
    }
    // revalidatePath("/");
    console.log(title, amount, category);
    // return addTransaction(title, +amount);
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
              <Input type="number" id="amount" name="amount" step="0.01" />
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
                    <SelectItem value="wage">Wage</SelectItem>
                    <SelectItem value="savings">
                      Savings & Investments
                    </SelectItem>
                    <SelectItem value="other">Other Income</SelectItem>
                    <SelectLabel>Expenses</SelectLabel>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="entertainment">Misc</SelectItem>
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
