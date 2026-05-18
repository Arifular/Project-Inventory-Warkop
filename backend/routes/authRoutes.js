const express = require('express');
const router = express.Router();

// Import fungsi login dari controller
const { login } = require('../controllers/authController');

// Membuat rute POST untuk login. URL aslinya menjadi: localhost:3000/api/auth/login
router.post('/login', login);

module.exports = router;