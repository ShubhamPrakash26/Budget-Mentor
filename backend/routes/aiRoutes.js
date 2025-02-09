const express = require("express");
const { getAIResponse, getAIBudgetOptimization } = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", getAIResponse);
router.post("/optimize", getAIBudgetOptimization);

module.exports = router;
