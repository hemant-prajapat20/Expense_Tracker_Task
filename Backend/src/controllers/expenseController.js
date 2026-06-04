"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = void 0;
const Expense_1 = require("../models/Expense");
exports.expenseController = {
    // GET /api/expenses
    getExpenses: (req, res) => {
        try {
            const { category, startDate, endDate } = req.query;
            const filters = {
                category: category,
                startDate: startDate,
                endDate: endDate,
            };
            const expenses = Expense_1.ExpenseModel.getAll(filters);
            res.status(200).json(expenses);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch expenses' });
        }
    },
    // GET /api/expenses/summary
    getExpenseSummary: (req, res) => {
        try {
            const summary = Expense_1.ExpenseModel.getSummary();
            res.status(200).json(summary);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch expense summary' });
        }
    },
    // POST /api/expenses
    createExpense: (req, res) => {
        try {
            const { amount, category, date, note } = req.body;
            // Validation 1: Missing Required Fields
            if (!amount || !category || !date) {
                return res.status(400).json({ error: 'Amount, category, and date are required fields.' });
            }
            // Validation 2: Amount must be positive
            if (Number(amount) <= 0) {
                return res.status(400).json({ error: 'Amount must be a positive number.' });
            }
            // Validation 3: Date cannot be in the future (with 1 day timezone buffer)
            const expenseDate = new Date(date);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (expenseDate > tomorrow) {
                return res.status(400).json({ error: 'Expense date cannot be in the future.' });
            }
            const newExpense = Expense_1.ExpenseModel.create({ amount, category, date, ...(note && { note }) });
            res.status(201).json(newExpense);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create expense' });
        }
    },
    // PUT /api/expenses/:id
    updateExpense: (req, res) => {
        try {
            const { id } = req.params;
            const { amount, category, date, note } = req.body;
            // Ensure the expense actually exists first
            const existingExpense = Expense_1.ExpenseModel.getById(id);
            if (!existingExpense) {
                return res.status(404).json({ error: 'Expense not found.' });
            }
            // Validation check for positive amount if they are updating it
            if (amount !== undefined && Number(amount) <= 0) {
                return res.status(400).json({ error: 'Amount must be a positive number.' });
            }
            // Validation check for future date if they are updating it
            if (date !== undefined) {
                const expenseDate = new Date(date);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if (expenseDate > tomorrow) {
                    return res.status(400).json({ error: 'Expense date cannot be in the future.' });
                }
            }
            const updatedExpense = Expense_1.ExpenseModel.update(id, { amount, category, date, ...(note && { note }) });
            res.status(200).json(updatedExpense);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update expense' });
        }
    },
    // DELETE /api/expenses/:id
    deleteExpense: (req, res) => {
        try {
            const { id } = req.params;
            const deleted = Expense_1.ExpenseModel.delete(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Expense not found.' });
            }
            res.status(200).json({ message: 'Expense deleted successfully.' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete expense' });
        }
    }
};
//# sourceMappingURL=expenseController.js.map