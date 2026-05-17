const mysql = require('mysql2');

// Konfigurasi koneksi ke MySQL bawaan XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Username default XAMPP
    password: '', // Password default XAMPP (dibiarkan kosong)
    database: 'db_inventaris_meteora'
});

// Mengecek apakah koneksi berhasil
db.connect((err) => {
    if (err) {
        console.error('Oops! Gagal terkoneksi ke database:', err);
        return;
    }
    console.log('Mantap! Berhasil terkoneksi ke database MySQL Warkop Meteora!');
});

module.exports = db;