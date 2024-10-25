const express = require('express');
const router = express.Router();
const { createUser, login,  getUser, getUserById, deleteUserById } = require('../controllers/authController');

// Routes

// Register a user
router.post('/register', createUser);

// Login route
router.post('/login', login);

// Get the registered Users
router.get('/users', getUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUserById);

module.exports = router;
