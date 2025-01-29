const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model("Budget", budgetSchema);
