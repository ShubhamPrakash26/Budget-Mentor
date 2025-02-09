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

exports.updateExpense = async (req, res) => {
  const { category, amount, description, date } = req.body;
  const expenseId = req.params.id;
  try {
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.description = description || expense.description;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update expense (Partial update)
exports.updateExpensePartial = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(expense, req.body); 
    await expense.save({ validateBeforeSave: true }); 
    res.json(expense);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    if (!category || !amount) {
      return res.status(400).json({ message: "Category and amount are required" });
    }
    const expenseDate = date ? new Date(date) : new Date();

    const expense = new Expense({
      user: req.user.id,
      category,
      amount,
      description,
      date: expenseDate, 
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error: Unable to add expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this expense" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSpendingTrends = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const expenses = await Expense.find({
      user: req.user.id,
      date: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) },
    });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found for the current year" });
    }
    const trends = {};

    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", { month: "short" });
      const category = expense.category;

      if (!trends[category]) {
        trends[category] = {};
      }
      trends[category][month] = (trends[category][month] || 0) + expense.amount;
    });

    res.json(trends);
  } catch (error) {
    console.error("Error fetching spending trends:", error);
    res.status(500).json({ message: "Server error" });
  }

};