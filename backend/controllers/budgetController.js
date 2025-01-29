const Budget = require("../models/budgetModel");

exports.createBudget = async (req, res) => {
  try {
    const { title, totalBudget, startDate, endDate } = req.body;

    if (!title || !totalBudget || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBudget = new Budget({
      title,
      totalBudget,
      startDate,
      endDate
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
