const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam, getMemberById, updateMemberById, deleteMemberById, upload } = require('../controllers/teamController');


// Routes

// Create a new news item
router.post("/team", upload.single('image'), createTeam);

// Get all news items
router.get("/team", getAllTeam);

// Get a specific news item by ID
router.get("/team/:id", getMemberById);

// Update a news item by ID
router.put("/team/:id", upload.single('image'), updateMemberById);

// Delete a news item by ID
router.delete("/team/:id", deleteMemberById);

module.exports = router;
