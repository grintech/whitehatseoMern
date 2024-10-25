const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link1: {
    type: String,
    required: false // Set to true if the link is required
  },
  link2: {
    type: String,
    required: false // Set to true if the link is required
  },
  link3: {
    type: String,
    required: false // Set to true if the link is required
  },
  link4: {
    type: String,
    required: false // Set to true if the link is required
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'], // Example statuses, adjust as needed
    default: 'draft'
  }
});

// We will create a new Collection

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
