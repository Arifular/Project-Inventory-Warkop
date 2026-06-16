const mysql = require('mysql2');
require('dotenv').config();

// Konfigurasi koneksi ke MySQL bawaan XAMPP
const db = mysql.createPool({
    host: 'db-meteora-arifulfarhan75-cloud-db.e.aivencloud.com', // Host MySQL
    port: 28691, // Port MySQL
    user: 'avnadmin', // Username default XAMPP
    password: process.env.AIVEN_PASSWORD, // Password default XAMPP (dibiarkan kosong)
    database: 'db_inventaris_meteora',
    connectTimeout: 30000,
    ssl: {
        rejectUnauthorized: false
    }
});

// Mengecek apakah koneksi berhasil
// db.connect((err) => {
//     if (err) {
//         console.error('Oops! Gagal terkoneksi ke database Aiven:', err);
//         return;
//     }
//     console.log('Alhamdulillah! Backend sukses terhubung ke database Aiven!');
// });

module.exports = db;