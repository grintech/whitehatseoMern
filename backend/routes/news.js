const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsById, updateNewsById, deleteNewsById ,upload} = require('../controllers/newsController');


// Routes

// Create a new news item
router.post("/news", upload.single('image'), createNews);

// Get all news items
router.get("/news", getAllNews);

// Get a specific news item by ID
router.get("/news/:id", getNewsById);

// Update a news item by ID
router.put("/news/:id", upload.single('image'), updateNewsById);

// Delete a news item by ID
router.delete("/news/:id", deleteNewsById);

module.exports = router;
