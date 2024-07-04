type IncomeCategories = {
  name: string;
  value: string;
}[];

type ExpenseCategories = {
  name: string;
  value: string;
}[];

export const incomeCategories: IncomeCategories = [
  {
    name: "Wage",
    value: "income-wage",
  },
  {
    name: "Savings & Investments",
    value: "income-savings",
  },
  {
    name: "Other",
    value: "income-other",
  },
];

export const expenseCategories: ExpenseCategories = [
  {
    name: "Housing",
    value: "expense-housing",
  },
  {
    name: "Transportation",
    value: "expense-transportation",
  },
  {
    name: "Food",
    value: "expense-food",
  },
  {
    name: "Utilities",
    value: "expense-utilities",
  },
  {
    name: "Clothing",
    value: "expense-clothing",
  },
  {
    name: "Healthcare",
    value: "expense-healthcare",
  },
  {
    name: "Insurance",
    value: "expense-insurance",
  },
  {
    name: "Entertainment",
    value: "expense-entertainment",
  },
  {
    name: "Misc",
    value: "expense-misc",
  },
];
