const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const inventoryController = require('../controllers/inventoryController');

// Mapping endpoint ganti password sendiri menggunakan method PUT
router.put('/change-password', userController.updatePasswordSendiri);

// Route Tambah User (Baru)
router.post('/add-user', userController.tambahUser);

// Route Ganti Password Sendiri
router.put('/change-password', userController.updatePasswordSendiri);

// Route Tambah User
router.post('/add-user', userController.tambahUser);

// Route Ambil Daftar Staf Berdasarkan Cabang (Baru)
router.get('/staff/:cabang', userController.getStafByCabang);

// Route Reset Password Staf (Baru)
router.put('/reset-staff-password', userController.resetPasswordStaf);

// Route Hapus User (Baru)
router.delete('/delete-user/:id', userController.hapusUser);

// Route Logout
router.post('/logout', userController.logout);

// Rute untuk barang masuk (yang sudah ada)
//router.post('/in', inventoryController.barangMasuk);
router.get('/', inventoryController.getItems);

// TAMBAHKAN BARIS BARU INI UNTUK BARANG KELUAR
router.post('/out', inventoryController.barangKeluar);
module.exports = router;