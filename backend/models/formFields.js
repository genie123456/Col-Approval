const pool = require('./dbConfig');

// formField.js
const express = require('express');
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig'); // Import the Sequelize connection
const FormFields = sequelize.define('FormFields', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add more fields as needed for the form data
});

module.exports = FormFields;
