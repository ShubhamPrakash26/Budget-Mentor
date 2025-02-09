const Goal = require("../models/goalModel");

// Get user goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch goals" });
  }
};

// Add a new goal
exports.addGoal = async (req, res) => {
  const { title, targetAmount, deadline } = req.body;
  if (!title || !targetAmount || !deadline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const goal = new Goal({ user: req.user.id, title, targetAmount, deadline });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Failed to add goal" });
  }
};

// Update saved amount for a goal
exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, targetAmount, savedAmount, deadline } = req.body;

    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found." });
    }

    // Update only the provided fields
    if (title) goal.title = title;
    if (targetAmount !== undefined) goal.targetAmount = targetAmount;
    if (savedAmount !== undefined) goal.savedAmount = savedAmount;
    if (deadline) goal.deadline = deadline;

    const updatedGoal = await goal.save();
    res.status(200).json(updatedGoal);
    console.log("Goal updated successfully");

  } catch (error) {
    console.error("Error updating goal:", error);
    res.status(500).json({ error: "Failed to update goal." });
  }
};

// Delete a goal
exports.deleteGoal = async (req, res) => {
    try {
      const goal = await Goal.findById(req.params.id);
  
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      if (goal.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this goal" });
      }
  
      await goal.deleteOne(); // Fix: Use deleteOne() instead of remove()
      
      res.json({ message: "Goal removed" });
    } catch (error) {
      console.error("Error deleting goal:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
