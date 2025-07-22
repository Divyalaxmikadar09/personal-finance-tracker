import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const router = express.Router();

// GET all incomes for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new income
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { amount, source, date } = req.body;

  try {
    const newIncome = await prisma.income.create({
      data: {
        amount: parseFloat(amount),
        source,
        date: new Date(date),
        userId,
      },
    });
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

