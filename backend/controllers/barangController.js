// koneksi ke database mysql
const db = require('../config/database');

// Fungsi untuk mengambil semua data barang
const getBarang = (req, res) => {
    // Perintah SQL untuk mengambil data dari tabel tb_barang
    const sqlQuery = 'SELECT * FROM tb_barang';
    
    // Mengeksekusi query ke database
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Ada masalah saat mengambil data:', err);
            // Jika error, kirim status 500 (Server Error)
            return res.status(500).json({ error: 'Gagal mengambil data barang dari database' });
        }
        
        // Jika berhasil, kirim status 200 (OK) beserta datanya dalam format JSON
        res.status(200).json({
            message: 'Berhasil mengambil daftar barang Warkop Meteora',
            data: results
        });
    });
};

// Mengekspor fungsi agar bisa dipakai di file route
module.exports = { getBarang };