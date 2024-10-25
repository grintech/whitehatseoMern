const express = require('express');
const router = express.Router();
const {  createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, upload} = require('../controllers/blogController');


// Routes

// Create a new news item
router.post("/blog", upload.single('image'), createBlog);

// Get all news items
router.get("/blog", getAllBlogs);

// Get a specific news item by ID
router.get("/blog/:id", getBlogById);

// Update a news item by ID
router.put("/blog/:id", upload.single('image'), updateBlogById);

// Delete a news item by ID
router.delete("/blog/:id", deleteBlogById);

module.exports = router;
