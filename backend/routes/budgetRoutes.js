const express = require("express");
const { validateBudget } = require("../middleware/validate");
const { getBudgets, addBudget, deleteBudget, updateBudget, updateBudgetPartial } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect,getBudgets);
router.put("/:id", protect,updateBudget); 
router.patch("/:id", protect,updateBudgetPartial); 
router.post("/", protect,validateBudget, addBudget);
router.delete("/:id", protect, deleteBudget);

module.exports = router;
