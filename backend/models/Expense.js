const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    budget: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
