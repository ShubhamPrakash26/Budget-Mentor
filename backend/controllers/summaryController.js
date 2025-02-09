const Expense = require("../models/expenseModel");
const Budget = require("../models/budgetModel");

const getSummary = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        // Aggregate expenses by month and category
        const expenses = await Expense.aggregate([
            {
                $match: { 
                    date: { 
                        $gte: new Date(`${currentYear}-01-01`), 
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    } 
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, category: "$category" },
                    totalSpent: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Aggregate budgets by month and category
        const budgets = await Budget.aggregate([
            {
                $match: { year: currentYear }
            },
            {
                $group: {
                    _id: { month: "$month", category: "$category" },
                    totalBudget: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        // Ensure the response is always structured correctly
        const formattedExpenses = expenses.map(item => ({
            month: item._id?.month || "Unknown",
            category: item._id?.category || "Unknown",
            totalSpent: item.totalSpent || 0
        }));

        const formattedBudgets = budgets.map(item => ({
            month: item._id?.month || "Unknown",
            category: item._id?.category || "Unknown",
            totalBudget: item.totalBudget || 0
        }));

        res.status(200).json({
            expenses: formattedExpenses,
            budgets: formattedBudgets
        });

    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ message: "Failed to generate summary." });
    }
};

module.exports = { getSummary };
