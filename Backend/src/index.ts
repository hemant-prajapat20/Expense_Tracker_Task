import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './config/db';
import { expenseRoutes } from './routes/expenseRoutes';

dotenv.config();

const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Tables
initDB();

// API Routes
app.use('/api/expenses', expenseRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Mini Expense Tracker API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running! Click here to open: http://localhost:${PORT}`);
});
