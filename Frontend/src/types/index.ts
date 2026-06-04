export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string; // Stored as an ISO string (e.g., "2026-06-04")
  note: string | null;
}

export interface ExpenseInput {
  amount: number;
  category: string;
  date: string;
  note?: string;
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface ExpenseSummary {
  totalThisMonth: number;
  highestExpense: Expense | null;
  categoryTotals: CategoryTotal[];
}
