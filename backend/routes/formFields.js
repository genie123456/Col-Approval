const express = require('express');
const router = express.Router();

// Placeholder controller functions
// You should implement these functions to handle the actual logic
const {
  saveApplyingFormData,
  getApplyingFormData
} = require('../controllers/formFieldsController');

// Routes for applying form data
router.post('/applying-form', saveApplyingFormData);
router.get('/applying-form/:id', getApplyingFormData);

module.exports = router;
