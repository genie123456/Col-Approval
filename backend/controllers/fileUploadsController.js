const pool = require('../dbConfig');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const username = req.params.username;
    const formfields_id = req.params.formfields_id;

    // Array to store the promises for database inserts
    const insertPromises = [];

    // Loop through each field in req.files
    Object.keys(req.files).forEach(fieldName => {
      const files = req.files[fieldName];
      
      files.forEach(file => {
        const { originalname, filename, path: filePath } = file;

        // Normalize file path
        const normalizedFilePath = path.normalize(filePath);

        // Insert file details into the database
        const insertPromise = pool.query(
          'INSERT INTO file_uploads (file_name, file_path, formfields_id, username, upload_date) VALUES (?, ?, ?, ?, NOW())',
          [originalname, normalizedFilePath, formfields_id, username]
        );

        // Add the promise to the array
        insertPromises.push(insertPromise);
      });
    });

    // Wait for all insert operations to complete
    await Promise.all(insertPromises);

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ message: 'Error uploading files', error: err });
  }
};
