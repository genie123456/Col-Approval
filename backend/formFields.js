const pool = require('./dbConfig');

// formField.js
const express = require('express');
const router = express.Router();

// Sample data for form fields
const formFields = [
  { id: 1, type: 'text', label: 'First Name', name: 'firstName' },
  { id: 2, type: 'text', label: 'Last Name', name: 'lastName' },
  { id: 3, type: 'email', label: 'Email', name: 'email' },
  { id: 4, type: 'password', label: 'Password', name: 'password' }
];

// Define the /formFields endpoint
router.get('/formFields', (req, res) => {
  res.json(formFields);
});

module.exports = router;
