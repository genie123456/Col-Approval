const express = require('express');
const router = express.Router();

const {
  saveApplyingFormData,
  getApplyingFormData,
  getAllFormFieldsData,
  getJoinedFormFieldsDataById,
} = require('../controllers/formFieldsController');

// Route to save applying form data
router.post('/applying-form', saveApplyingFormData);

// Route to get applying form data by ID
router.get('/applying-form/:id', getApplyingFormData);

// Route to get all form fields data
router.get('/applying-form', getAllFormFieldsData);

// New Route to get joined form fields data by ID
router.get('/applying-form/joined/:id', getJoinedFormFieldsDataById);

module.exports = router;
