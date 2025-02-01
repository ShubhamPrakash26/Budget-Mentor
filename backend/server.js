require("dotenv").config();
const express = require('express');
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const expenseRoutes = require('./routes/expense');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/expense', expenseRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));