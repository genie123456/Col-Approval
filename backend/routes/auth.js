const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the auth controller

// Signup route
router.post('/signup', authController.signup);
// Login route
router.post('/login', authController.login);
// Profile route
router.get('/profile', authController.profile);
// Logout route
router.post('/logout', authController.logout);

module.exports = router;
