import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const router = express.Router();

// GET all expenses for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new expense
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { amount, category, date } = req.body;

  try {
    const newExpense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        date: new Date(date),
        userId,
      },
    });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
