const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register Controller
exports.register = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        // Validate input
        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            mobile
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isOwner: user.isOwner
            }
        });

    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login Controller
// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.warn('Login failed: User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn('Login failed: Incorrect password');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isOwner = email === 'gokulp2608@gmail.com'; // Check if user is owner

        const token = jwt.sign({ id: user._id, isOwner }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isOwner // Add owner status in response
            }
        });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
