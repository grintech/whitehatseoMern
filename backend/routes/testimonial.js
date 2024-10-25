const express = require('express');
const router = express.Router();
const { createTeam, getAllTeam, getMemberById, updateMemberById, deleteMemberById, upload } = require('../controllers/testimonialController');


// Routes

// Create a new news item
router.post("/testimonial", upload.single('image'), createTeam);

// Get all news items
router.get("/testimonial", getAllTeam);

// Get a specific news item by ID
router.get("/testimonial/:id", getMemberById);

// Update a news item by ID
router.put("/testimonial/:id", upload.single('image'), updateMemberById);

// Delete a news item by ID
router.delete("/testimonial/:id", deleteMemberById);

module.exports = router;
