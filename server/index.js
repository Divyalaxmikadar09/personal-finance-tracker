import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import transactionRoutes from './routes/transaction.js';
import incomeRoutes from './routes/income.js';
import expenseRoutes from './routes/expense.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "✅ Welcome to the Personal Finance Tracker API (PostgreSQL + Prisma)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
