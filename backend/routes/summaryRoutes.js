const express = require("express");
const { getSummary } = require("../controllers/summaryController");
const router = express.Router();

// Correctly define the route
router.get("/monthly", getSummary);

module.exports = router;
