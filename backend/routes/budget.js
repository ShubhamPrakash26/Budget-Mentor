const express = require('express');
const { addBudget, getBudgets } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addBudget);
router.get('/', protect, getBudgets);

module.exports = router;
