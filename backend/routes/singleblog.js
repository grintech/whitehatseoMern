const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, getBlogBySlug, updateBlogById, deleteBlogById, upload} = require('../controllers/singleblogController');


// Routes

// Create a new news item
router.post("/single-blog", upload.array('images', 10), createBlog);

// Get all news items
router.get("/single-blog", getAllBlogs);

// Get a specific news item by ID
router.get("/single-blog/:id", getBlogById);

// Get a specific news item by ID
router.get("/single-blog/slug/:slug", getBlogBySlug);

// Update a news item by ID
router.put("/single-blog/:id", upload.array('images', 10), updateBlogById); 

// Delete a news item by ID
router.delete("/single-blog/:id", deleteBlogById);

module.exports = router;
