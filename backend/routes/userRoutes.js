const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;