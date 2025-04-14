const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#3498db'
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
