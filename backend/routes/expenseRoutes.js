const express = require("express");
const { validateBudget } = require("../middleware/validate");
const { getExpenses, addExpense, deleteExpense, updateExpense, updateExpensePartial, getSpendingTrends } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect,getExpenses);
router.put("/:id", protect,updateExpense); 
router.patch("/:id", protect,updateExpensePartial); 
router.post("/", protect,validateBudget, addExpense);
router.delete("/:id", protect,deleteExpense);
router.get("/trends", protect, getSpendingTrends);

module.exports = router;
