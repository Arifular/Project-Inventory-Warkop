const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/in', inventoryController.barangMasuk);
router.get('/', inventoryController.getItems);
router.post('/out', inventoryController.barangKeluar); // Rute baru untuk Output
router.get('/history', inventoryController.getHistory);

module.exports = router; // <--- PASTIKAN BARIS INI ADA