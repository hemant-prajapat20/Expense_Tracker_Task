import { Request, Response } from 'express';
import { ExpenseModel, ExpenseInput } from '../models/Expense';

export const expenseController = {
  // GET /api/expenses
  getExpenses: (req: Request, res: Response) => {
    try {
      const { category, startDate, endDate } = req.query;
      
      const filters = {
        category: category as string,
        startDate: startDate as string,
        endDate: endDate as string,
      };

      const expenses = ExpenseModel.getAll(filters);
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  },

  // GET /api/expenses/summary
  getExpenseSummary: (req: Request, res: Response) => {
    try {
      const summary = ExpenseModel.getSummary();
      res.status(200).json(summary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch expense summary' });
    }
  },

  // POST /api/expenses
  createExpense: (req: Request, res: Response): any => {
    try {
      const { amount, category, date, note } = req.body as ExpenseInput;

      // Validation 1: Missing Required Fields
      if (!amount || !category || !date) {
        return res.status(400).json({ error: 'Amount, category, and date are required fields.' });
      }

      // Validation 2: Amount must be positive
      if (Number(amount) <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number.' });
      }

      // Validation 3: Date cannot be in the future
      const expenseDate = new Date(date);
      const today = new Date();
      if (expenseDate > today) {
        return res.status(400).json({ error: 'Expense date cannot be in the future.' });
      }

      const newExpense = ExpenseModel.create({ amount, category, date, note });
      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create expense' });
    }
  },

  // PUT /api/expenses/:id
  updateExpense: (req: Request, res: Response): any => {
    try {
      const { id } = req.params;
      const { amount, category, date, note } = req.body;

      // Ensure the expense actually exists first
      const existingExpense = ExpenseModel.getById(id);
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
        const today = new Date();
        if (expenseDate > today) {
          return res.status(400).json({ error: 'Expense date cannot be in the future.' });
        }
      }

      const updatedExpense = ExpenseModel.update(id, { amount, category, date, note });
      res.status(200).json(updatedExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update expense' });
    }
  },

  // DELETE /api/expenses/:id
  deleteExpense: (req: Request, res: Response): any => {
    try {
      const { id } = req.params;
      
      const deleted = ExpenseModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Expense not found.' });
      }

      res.status(200).json({ message: 'Expense deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete expense' });
    }
  }
};
