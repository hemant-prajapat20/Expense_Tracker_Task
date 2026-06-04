"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
// Connect to (or create) the SQLite database file
const dbPath = path_1.default.resolve(__dirname, '../../database.sqlite');
const db = new better_sqlite3_1.default(dbPath, { verbose: console.log });
// Initialize the database tables if they don't exist
const initDB = () => {
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
    }
    catch (error) {
        console.error('Error initializing SQLite Database:', error);
    }
};
exports.initDB = initDB;
exports.default = db;
//# sourceMappingURL=db.js.map