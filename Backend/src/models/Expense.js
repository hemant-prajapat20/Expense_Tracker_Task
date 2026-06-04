"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const crypto_1 = __importDefault(require("crypto"));
exports.ExpenseModel = {
    // 1. Get all expenses (with optional filters), sorted by newest first
    getAll: (filters) => {
        let sql = 'SELECT * FROM expenses WHERE 1=1';
        const params = [];
        if (filters?.category) {
            sql += ' AND category = ?';
            params.push(filters.category);
        }
        if (filters?.startDate) {
            sql += ' AND date >= ?';
            params.push(filters.startDate);
        }
        if (filters?.endDate) {
            sql += ' AND date <= ?';
            params.push(filters.endDate);
        }
        sql += ' ORDER BY date DESC';
        const stmt = db_1.default.prepare(sql);
        return stmt.all(...params);
    },
    // 2. Get a single expense by ID
    getById: (id) => {
        const stmt = db_1.default.prepare('SELECT * FROM expenses WHERE id = ?');
        return stmt.get(id);
    },
    // 3. Add a new expense
    create: (data) => {
        const id = crypto_1.default.randomUUID(); // Generate a unique ID for the SQLite row
        const stmt = db_1.default.prepare(`
      INSERT INTO expenses (id, amount, category, date, note)
      VALUES (?, ?, ?, ?, ?)
    `);
        stmt.run(id, data.amount, data.category, data.date, data.note || null);
        return { id, amount: data.amount, category: data.category, date: data.date, note: data.note || null };
    },
    // 4. Update an existing expense
    update: (id, data) => {
        const updates = [];
        const params = [];
        // Dynamically build the SQL update query based on provided fields
        if (data.amount !== undefined) {
            updates.push('amount = ?');
            params.push(data.amount);
        }
        if (data.category !== undefined) {
            updates.push('category = ?');
            params.push(data.category);
        }
        if (data.date !== undefined) {
            updates.push('date = ?');
            params.push(data.date);
        }
        if (data.note !== undefined) {
            updates.push('note = ?');
            params.push(data.note);
        }
        if (updates.length === 0)
            return exports.ExpenseModel.getById(id);
        params.push(id);
        const sql = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;
        db_1.default.prepare(sql).run(...params);
        return exports.ExpenseModel.getById(id);
    },
    // 5. Delete an expense
    delete: (id) => {
        const stmt = db_1.default.prepare('DELETE FROM expenses WHERE id = ?');
        const info = stmt.run(id);
        return info.changes > 0; // Returns true if a row was actually deleted
    },
    // 6. Get Summary Data (Total this month, Total by Category, Highest single expense)
    getSummary: () => {
        // Get the current month in YYYY-MM format to filter "this month's" expenses
        const currentMonthPrefix = new Date().toISOString().substring(0, 7);
        // Calculate total spent this month
        const totalThisMonthRow = db_1.default.prepare(`
      SELECT SUM(amount) as total 
      FROM expenses 
      WHERE date LIKE ?
    `).get(`${currentMonthPrefix}%`);
        // Find the highest single expense
        const highestExpenseRow = db_1.default.prepare(`
      SELECT * FROM expenses ORDER BY amount DESC LIMIT 1
    `).get();
        // Calculate totals grouped by category
        const categoryTotals = db_1.default.prepare(`
      SELECT category, SUM(amount) as total 
      FROM expenses 
      GROUP BY category
    `).all();
        return {
            totalThisMonth: totalThisMonthRow.total || 0,
            highestExpense: highestExpenseRow || null,
            categoryTotals
        };
    }
};
//# sourceMappingURL=Expense.js.map