const pool = require('../dbConfig');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const insertPromises = [];

    Object.keys(req.files).forEach(fieldName => {
      const files = req.files[fieldName];
      
      files.forEach(file => {
        const { originalname } = file;
        
        const username = req.body.username || 'pankaj';
        const formfields_id = req.body.formfields_id || 1;

        const insertPromise = pool.query(
          'INSERT INTO file_uploads (file_name, formfields_id, username, upload_date) VALUES (?, ?, ?, NOW())',
          [originalname, formfields_id, username]
        );

        insertPromises.push(insertPromise);
      });
    });

    await Promise.all(insertPromises);

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).json({ message: 'Error uploading files', error: err });
  }
};

