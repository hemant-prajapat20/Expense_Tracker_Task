"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRoutes = void 0;
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const router = (0, express_1.Router)();
exports.expenseRoutes = router;
// Routes for handling expenses
router.get('/', expenseController_1.expenseController.getExpenses);
router.get('/summary', expenseController_1.expenseController.getExpenseSummary);
router.post('/', expenseController_1.expenseController.createExpense);
router.put('/:id', expenseController_1.expenseController.updateExpense);
router.delete('/:id', expenseController_1.expenseController.deleteExpense);
//# sourceMappingURL=expenseRoutes.js.map