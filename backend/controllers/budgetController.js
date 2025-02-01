const Budget = require("../models/budgetModel");

// @desc    Add new budget
// @route   POST /api/budget
// @access  Private
const addBudget = async (req, res) => {
  try {
    const { title, totalBudget, startDate, endDate } = req.body;

    if (!title || !totalBudget || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBudget = await Budget.create({
      title,
      totalBudget,
      startDate,
      endDate,
      user: req.user.id  // Add the user ID from the authenticated request
    });

    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBudget, getBudgets };