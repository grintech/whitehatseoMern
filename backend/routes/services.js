const express = require('express');
const router = express.Router();
const { createService, getAllServices, getServiceById,getServiceBySlug, updateServiceById, deleteServiceById, upload} = require('../controllers/servicesController');


// Routes

// Create a new news item
router.post("/services", upload.single('image'), createService);

// Get all news items
router.get("/services", getAllServices);

// Get a specific news item by ID
// router.get("/services/:slug", getServiceBySlug);
router.get("/services/:id", getServiceById);    

// Update a news item by ID
router.put("/services/:id", upload.single('image'), updateServiceById);

// Delete a news item by ID
router.delete("/services/:id", deleteServiceById);

module.exports = router;
