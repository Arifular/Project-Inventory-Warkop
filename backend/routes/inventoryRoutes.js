const express = require('express');
const router = express.Router();
const { getInventory } = require('../controllers/inventoryController');

// Rute ini akan dipanggil dengan metode GET
router.get('/', getInventory);

module.exports = router;