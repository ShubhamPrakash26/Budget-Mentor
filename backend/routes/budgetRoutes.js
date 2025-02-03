const express = require("express");
const { getBudgets, addBudget, deleteBudget } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getBudgets);
router.post("/", protect, addBudget);
router.delete("/:id", protect, deleteBudget);

module.exports = router;
