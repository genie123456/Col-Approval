const express = require('express');
const router = express.Router();
const FormFields = require('../models/FormFields'); 

// POST endpoint to handle form submissions
router.post('/submitForm', async (req, res) => {
  const { name, email } = req.body; // Assuming 'name' and 'email' are the form fields
  try {
    // Create a new entry in the FormFields table with the submitted data
    const newFormEntry = await FormFields.create({ name, email });
    res.status(201).json({ message: 'Form submitted successfully', data: newFormEntry });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;