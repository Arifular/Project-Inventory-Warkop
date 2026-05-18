const db = require('../config/database');

// Fungsi untuk menangani request Login
const login = (req, res) => {
    const { username, password } = req.body;

    // Validasi input sederhana
    if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password wajib diisi' });
    }

    // Query untuk mencari user yang cocok
    const sqlQuery = 'SELECT id_user, username, role, cabang FROM tb_user WHERE username = ? AND password = ?';
    
    db.query(sqlQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Ada masalah saat login:', err);
            return res.status(500).json({ error: 'Terjadi kesalahan internal pada server' });
        }

        // Jika user tidak ditemukan atau password salah
        if (results.length === 0) {
            return res.status(401).json({ error: 'Username atau password salah' });
        }

        // Jika berhasil ditemukan
        const user = results[0];
        res.status(200).json({
            message: 'Login berhasil!',
            user: {
                id_user: user.id_user,
                username: user.username,
                role: user.role,
                cabang: user.cabang
            }
        });
    });
};

module.exports = { login };