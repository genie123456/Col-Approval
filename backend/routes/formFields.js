const express = require('express');
const router = express.Router();

const {
  saveApplyingFormData,
  getApplyingFormData,
  getAllFormFieldsData,
  getJoinedFormFieldsDataById,
  getFormFieldsDataByUsername, // Import the new controller method
} = require('../controllers/formFieldsController');

// Route to save applying form data
router.post('/applying-form', saveApplyingFormData);

// Route to get applying form data by ID
router.get('/applying-form/:id', getApplyingFormData);

// Route to get all form fields data
router.get('/applying-form', getAllFormFieldsData);

// New Route to get joined form fields data by ID
router.get('/applying-form/joined/:id', getJoinedFormFieldsDataById);

// New Route to get form fields data by username
router.get('/applying-form/username/:username', getFormFieldsDataByUsername);

module.exports = router;
