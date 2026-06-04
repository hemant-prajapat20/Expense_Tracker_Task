import db from '../config/db';
import crypto from 'crypto';

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

export const ExpenseModel = {
  // 1. Get all expenses (with optional filters), sorted by newest first
  getAll: (filters?: { category?: string; startDate?: string; endDate?: string }): Expense[] => {
    let sql = 'SELECT * FROM expenses WHERE 1=1';
    const params: any[] = [];

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

    const stmt = db.prepare(sql);
    return stmt.all(...params) as Expense[];
  },

  // 2. Get a single expense by ID
  getById: (id: string): Expense | undefined => {
    const stmt = db.prepare('SELECT * FROM expenses WHERE id = ?');
    return stmt.get(id) as Expense | undefined;
  },

  // 3. Add a new expense
  create: (data: ExpenseInput): Expense => {
    const id = crypto.randomUUID(); // Generate a unique ID for the SQLite row
    const stmt = db.prepare(`
      INSERT INTO expenses (id, amount, category, date, note)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, data.amount, data.category, data.date, data.note || null);
    
    return { id, amount: data.amount, category: data.category, date: data.date, note: data.note || null };
  },

  // 4. Update an existing expense
  update: (id: string, data: Partial<ExpenseInput>): Expense | undefined => {
    const updates: string[] = [];
    const params: any[] = [];

    // Dynamically build the SQL update query based on provided fields
    if (data.amount !== undefined) { updates.push('amount = ?'); params.push(data.amount); }
    if (data.category !== undefined) { updates.push('category = ?'); params.push(data.category); }
    if (data.date !== undefined) { updates.push('date = ?'); params.push(data.date); }
    if (data.note !== undefined) { updates.push('note = ?'); params.push(data.note); }

    if (updates.length === 0) return ExpenseModel.getById(id);

    params.push(id);
    const sql = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(sql).run(...params);

    return ExpenseModel.getById(id);
  },

  // 5. Delete an expense
  delete: (id: string): boolean => {
    const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0; // Returns true if a row was actually deleted
  },

  // 6. Get Summary Data (Total this month, Total by Category, Highest single expense)
  getSummary: () => {
    // Get the current month in YYYY-MM format to filter "this month's" expenses
    const currentMonthPrefix = new Date().toISOString().substring(0, 7);

    // Calculate total spent this month
    const totalThisMonthRow = db.prepare(`
      SELECT SUM(amount) as total 
      FROM expenses 
      WHERE date LIKE ?
    `).get(`${currentMonthPrefix}%`) as { total: number | null };

    // Find the highest single expense
    const highestExpenseRow = db.prepare(`
      SELECT * FROM expenses ORDER BY amount DESC LIMIT 1
    `).get() as Expense | undefined;

    // Calculate totals grouped by category
    const categoryTotals = db.prepare(`
      SELECT category, SUM(amount) as total 
      FROM expenses 
      GROUP BY category
    `).all() as { category: string; total: number }[];

    return {
      totalThisMonth: totalThisMonthRow.total || 0,
      highestExpense: highestExpenseRow || null,
      categoryTotals
    };
  }
};
