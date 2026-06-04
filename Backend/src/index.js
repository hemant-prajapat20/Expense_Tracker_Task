"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const expenseRoutes_1 = require("./routes/expenseRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize Database Tables
(0, db_1.initDB)();
// API Routes
app.use('/api/expenses', expenseRoutes_1.expenseRoutes);
// Basic route for testing
app.get('/', (req, res) => {
    res.send('Mini Expense Tracker API is running!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running! Click here to open: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map