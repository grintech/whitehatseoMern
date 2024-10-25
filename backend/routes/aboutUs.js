// routes/aboutUsRoutes.js

const express = require('express');
const router = express.Router();
const { createAboutUs, getAllAboutUs, getAllAboutById, updateAboutUs, deleteAboutUs, upload} = require('../controllers/aboutUsControllers');

// Create a new about us entry
router.post('/aboutus', upload.single('image'), createAboutUs);

// Get all about us entries
router.get('/aboutus', getAllAboutUs);

// Get all about us by Id
router.get('/aboutus/:id', getAllAboutById);

// Update an existing about us entry
router.put('/aboutus/:id', upload.single('image'),  updateAboutUs);

// Delete an about us entry
router.delete('/aboutus/:id', deleteAboutUs);

module.exports = router;
