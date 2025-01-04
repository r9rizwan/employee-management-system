const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


// Ensure you load environment variables
require('dotenv').config();

const router = express.Router();

// Get JWT_TOKEN from environment variables
const { JWT_TOKEN } = process.env;

// Login Route
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    console.log("req body", req.body);

    try {
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, JWT_TOKEN, { expiresIn: '1h' });

        return res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { userId, password, role } = req.body;

    // Basic validation
    if (!userId || !password) {
        return res.status(400).json({ success: false, message: 'User ID and password are required' });
    }

    try {
        // Check if userId already exists
        const existingUser = await User.findOne({ where: { userId } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User ID already exists' });
        }

        // Create new user
        const newUser = await User.create({
            userId,
            password, // This will be hashed automatically by the `beforeCreate` hook in the model
            role, // Optional; defaults to 'user' if not provided
        });

        return res.status(201).json({ success: true, message: 'User registered successfully', userId: newUser.userId });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
