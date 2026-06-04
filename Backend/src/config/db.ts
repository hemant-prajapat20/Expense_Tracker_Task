import Database from 'better-sqlite3';
import path from 'path';

// Connect to (or create) the SQLite database file
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db: Database.Database = new Database(dbPath, { verbose: console.log });

// Initialize the database tables if they don't exist
export const initDB = () => {
  try {
    const createExpensesTable = `
      CREATE TABLE IF NOT EXISTS expenses (
        id TEXT PRIMARY KEY,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        note TEXT
      );
    `;
    db.exec(createExpensesTable);
    console.log('SQLite Database initialized and connected.');
  } catch (error) {
    console.error('Error initializing SQLite Database:', error);
  }
};

export default db;
