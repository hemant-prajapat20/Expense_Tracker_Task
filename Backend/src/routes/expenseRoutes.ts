import { Router } from 'express';
import { expenseController } from '../controllers/expenseController';

const router = Router();

// Routes for handling expenses
router.get('/', expenseController.getExpenses);
router.get('/summary', expenseController.getExpenseSummary);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
