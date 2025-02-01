const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  totalBudget: { 
    type: Number, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Budget", budgetSchema);