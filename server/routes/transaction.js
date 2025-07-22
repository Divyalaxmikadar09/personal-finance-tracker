import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// 📥 Add Income
router.post('/income', authMiddleware, async (req, res) => {
  const { amount, source } = req.body;
  try {
    const income = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        source,
        userId: req.user.userId,
      },
    });
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add income', message: err.message });
  }
});

// 📤 Add Expense
router.post('/expense', authMiddleware, async (req, res) => {
  const { amount, category } = req.body;
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        userId: req.user.userId,
      },
    });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense', message: err.message });
  }
});

// 📊 Get All Transactions
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({ where: { userId: req.user.userId } });
    const expenses = await prisma.expense.findMany({ where: { userId: req.user.userId } });
    res.json({ incomes, expenses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data', message: err.message });
  }
});

export default router;
