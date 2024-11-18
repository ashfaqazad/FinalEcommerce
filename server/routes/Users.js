const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Ensure cookie-parser is used
const { body, validationResult } = require('express-validator');

dotenv.config();
router.use(cookieParser()); // Use cookie-parser middleware

// Sign Up Route
router.post('/auth/signup', [
    body('username').notEmpty().withMessage('Username is required'), // Changed 'name' to 'username'
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('location').optional().notEmpty().withMessage('Location is required if provided'),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Login Route
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in httpOnly cookie
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Ensure secure cookie in production

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token, // You can also send the token in the response, if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// Logout Route
router.post('/auth/logout', (req, res) => {
    // Clear the JWT token from the cookie
    res.clearCookie('authToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});

module.exports = router;
