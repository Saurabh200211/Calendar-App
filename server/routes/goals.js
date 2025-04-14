const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const Task = require('../models/Task');

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new goal
router.post('/', async (req, res) => {
  const goal = new Goal({
    name: req.body.name,
    color: req.body.color
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific goal with its tasks
router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    const tasks = await Task.find({ goalId: req.params.id });
    
    res.json({
      goal,
      tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a goal
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    if (req.body.name) goal.name = req.body.name;
    if (req.body.color) goal.color = req.body.color;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    // Delete all tasks associated with this goal
    await Task.deleteMany({ goalId: req.params.id });
    
    await goal.deleteOne();
    res.json({ message: 'Goal and associated tasks deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
