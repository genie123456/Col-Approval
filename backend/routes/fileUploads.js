// routes/fileUploads.js
const express = require('express');
const router = express.Router();
const fileUploadsController = require('../controllers/fileUploadsController');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Define multiple fields for file uploads
const upload = multer({ storage: storage }).fields([
  { name: 'layout', maxCount: 1 },
  { name: 'declaration', maxCount: 1 },
  { name: 'surveyMap', maxCount: 1 },
  { name: 'satelliteMap', maxCount: 1 },
  { name: 'landUse', maxCount: 1 },
  { name: 'allotLetter', maxCount: 1 },
  { name: 'parkingPlan', maxCount: 1 },
  { name: 'soilTestReport', maxCount: 1 },
  { name: 'locationMap', maxCount: 1 },
  { name: 'structuralStability', maxCount: 1 },
  { name: 'EWSlandLocation', maxCount: 1 },
  { name: 'servicePlan', maxCount: 1 },
  { name: 'partnershipDeed', maxCount: 1 },
  { name: 'affidavitFormat', maxCount: 1 },
  { name: 'colonizerRegistration', maxCount: 1 },
  { name: 'colonizerNetWorth', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 1 },
  { name: 'KhasraSamviliyan', maxCount: 1 },
  { name: 'SeemankanIntegratedKhasra', maxCount: 1 },
  { name: 'B1P2KhasraMap', maxCount: 1 },
  { name: 'RegistryDocuments', maxCount: 1 },
  { name: 'PanchshalaKhasra', maxCount: 1 }
]);

// Route for file upload
router.post('/upload/:username/:formfields_id', upload, fileUploadsController.uploadFile);

module.exports = router;
