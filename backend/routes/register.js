const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/Register');

// Register a new employee
router.post('/register', async (req, res) => {
    try {
        const { email, password, confirmpassword, phone } = req.body;

        // Check if password matches confirm password
        if (password !== confirmpassword) {
            return res.status(400).send("Passwords do not match");
        }

        // Check if email already exists
        const existingEmail = await Register.findOne({ email });
        if (existingEmail) {
            return res.status(400).send("Email already registered");
        }

        // Check if phone number already exists
        const existingEmployee = await Register.findOne({ phone });
        if (existingEmployee) {
            return res.status(400).send("Phone number already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

        // Create new employee instance with hashed password
        const newEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            age: req.body.age,
            password: hashedPassword, // Store hashed password in database
        });

        // Save new employee to database
        const registeredEmployee = await newEmployee.save();
        res.status(201).send(registeredEmployee);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email exists
//         const existingEmployee = await Register.findOne({ email });
//         if (!existingEmployee) {
//             return res.status(400).send("Invalid email or password");
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, existingEmployee.password);
//         if (!isMatch) {
//             return res.status(400).send("Invalid email or password");
//         }

//         res.status(200).send("Login successful");
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// Get all registered employees
router.get('/register', async (req, res) => {
    try {
        const registeredEmployees = await Register.find();
        res.status(200).send(registeredEmployees);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get employee by ID
router.get('/register/:id', async (req, res) => {
    try {
        const registeredEmployee = await Register.findById(req.params.id);
        if (!registeredEmployee) {
            return res.status(404).send("Employee not found");
        }
        res.status(200).send(registeredEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete employee by ID
router.delete('/register/:id', async (req, res) => {
    try {
        const deletedEmployee = await Register.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).send("Employee not found");
        }
        res.status(200).send("Employee deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
