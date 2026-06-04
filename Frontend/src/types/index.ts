export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  note: string | null;
}

export interface ExpenseSummary {
  totalThisMonth: number;
  highestExpense: Expense | null;
  categoryTotals: {
    category: string;
    total: number;
  }[];
}
