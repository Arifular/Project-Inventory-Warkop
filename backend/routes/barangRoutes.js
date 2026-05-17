const express = require('express');
const router = express.Router();

// Mengimpor fungsi dari controller
const { getBarang } = require('../controllers/barangController');

// Membuat route GET untuk mengambil data barang
router.get('/', getBarang);

module.exports = router;