import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import incomeRoutes from './routes/income.js';
import expenseRoutes from './routes/expense.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is working!' });
});

// 👇 Mount auth routes
app.use('/api/auth', authRoutes);

export default app;
