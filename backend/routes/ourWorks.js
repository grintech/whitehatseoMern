const express = require('express');
const router = express.Router();
const { createWork, getAllWorks, getWorkById, updateWorkById, deleteWorkById, upload} = require('../controllers/workController');


// Routes

// Create a new news item
router.post("/work", upload.single('image'), createWork);

// Get all news items
router.get("/work", getAllWorks);

// Get a specific news item by ID
router.get("/work/:id", getWorkById);

// Update a news item by ID
router.put("/work/:id", upload.single('image'), updateWorkById);

// Delete a news item by ID
router.delete("/work/:id", deleteWorkById);

module.exports = router;
