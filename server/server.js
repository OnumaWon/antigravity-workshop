const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Create a new expense
app.post('/api/expenses', async (req, res) => {
  const { description, amount, category } = req.body;
  try {
    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        category,
      },
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
