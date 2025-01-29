const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
  const { description, amount, date, category, budget } = req.body;
  const expense = await Expense.create({ user: req.user.id, budget, description, amount, date, category });
  res.status(201).json(expense);
};

const getExpenses = async (req, res) => {
  const { budgetId } = req.params;
  const expenses = await Expense.find({ user: req.user.id, budget: budgetId });
  res.json(expenses);
};

module.exports = { addExpense, getExpenses };
