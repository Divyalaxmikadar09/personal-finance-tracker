import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // ✅ Use bcryptjs (as it's more compatible across systems)
import authMiddleware from '../middleware/authMiddleware.js'; // ✅ Fix import name
import pkg from '@prisma/client'; // ✅ Import Prisma properly (CommonJS workaround)

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 🧾 Signup Route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: 'Signup successful', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});

// ✅ Protected Route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access!` });
});

export default router;
