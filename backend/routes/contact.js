
const express = require('express');
const router = express.Router();
const {createContact, getAllContacts, getContactById, updateContact, deleteContact} = require('../controllers/contactController');

// Routes
router.post('/contact', createContact);
router.get('/contact', getAllContacts);
router.get('/contact/:id', getContactById);
router.put('/contact/:id', updateContact);
router.delete('/contact/:id', deleteContact);

module.exports = router;
