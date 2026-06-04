export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: string;
    note: string | null;
}
export interface ExpenseInput {
    amount: number;
    category: string;
    date: string;
    note?: string;
}
export declare const ExpenseModel: {
    getAll: (filters?: {
        category?: string;
        startDate?: string;
        endDate?: string;
    }) => Expense[];
    getById: (id: string) => Expense | undefined;
    create: (data: ExpenseInput) => Expense;
    update: (id: string, data: Partial<ExpenseInput>) => Expense | undefined;
    delete: (id: string) => boolean;
    getSummary: () => {
        totalThisMonth: number;
        highestExpense: Expense | null;
        categoryTotals: {
            category: string;
            total: number;
        }[];
    };
};
//# sourceMappingURL=Expense.d.ts.map