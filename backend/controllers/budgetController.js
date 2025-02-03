const Budget = require("../models/budgetModel");

// Get budgets for the logged-in user
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new budget
exports.addBudget = async (req, res) => {
  const { category, amount, month, year } = req.body;

  if (!category || !amount || !month || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const budget = new Budget({ user: req.user.id, category, amount, month, year });
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to add budget" });
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await budget.remove();
    res.json({ message: "Budget removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
