const express = require('express');
const router = express.Router();
const {  createService, getAllServices, getServiceById, getServiceBySlug, updateServiceById,deleteServiceById, upload} = require('../controllers/singleServiceController');


// Routes

// Create a new service item
router.post("/single-service", upload.array('images', 10), createService);

// Get all service items
router.get("/single-service", getAllServices);

// Get a specific service item by ID
router.get("/single-service/:id", getServiceById);

// Get a specific service item by ID
router.get("/single-service/slug/:slug", getServiceBySlug);

// Update a service item by ID
router.put("/single-service/:id", upload.array('images', 10), updateServiceById); 

// Delete a service item by ID
router.delete("/single-service/:id", deleteServiceById);

module.exports = router;
