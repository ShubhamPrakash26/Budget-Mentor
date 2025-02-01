const Expense = require('../models/Expense');


const addExpense = async (req, res) => {
  try {
    const { description, amount, date, category, budget } = req.body;

    if (!description || !amount || !category || !budget) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create expense
    const expense = await Expense.create({
      user: req.user.id, // From auth middleware
      budget,
      description,
      amount,
      date: date || Date.now(),
      category
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Error in addExpense:', error);
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { budgetId } = req.params;
    
    if (!budgetId) {
      return res.status(400).json({ message: 'Budget ID is required' });
    }

    const expenses = await Expense.find({ 
      user: req.user.id, 
      budget: budgetId 
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error in getExpenses:', error);
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
};

module.exports = { addExpense, getExpenses };