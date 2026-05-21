const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Pastikan "barangMasuk" huruf besar-kecilnya sama persis
router.post('/in', inventoryController.barangMasuk);

module.exports = router;