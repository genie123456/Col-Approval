const express = require('express');
const router = express.Router();

const {
  saveApplyingFormData, getApplyingFormData, getAllFormFieldsData // Import the new controller method
} = require('../controllers/formFieldsController');

// Route to save applying form data
router.post('/applying-form', saveApplyingFormData);

// Route to get applying form data by ID
router.get('/applying-form/:id', getApplyingFormData);

// Route to get all form fields data
router.get('/applying-form', getAllFormFieldsData);

module.exports = router; 