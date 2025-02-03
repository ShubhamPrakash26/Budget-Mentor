const Expense = require("../models/expenseModel");

// Get expenses for the logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const { category, amount, description } = req.body;

  if (!category || !amount) {
    return res.status(400).json({ message: "Category and amount are required" });
  }

  try {
    const expense = new Expense({ user: req.user.id, category, amount, description });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await expense.remove();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
