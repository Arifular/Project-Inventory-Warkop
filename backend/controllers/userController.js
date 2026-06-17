const db = require('../config/database'); 

// --- 1. FITUR GANTI PASSWORD SENDIRI ---
const updatePasswordSendiri = (req, res) => {
    const { id_user, passwordLama, passwordBaru, konfirmasiPassword } = req.body;

    // Validasi input kosong
    if (!id_user || !passwordLama || !passwordBaru || !konfirmasiPassword) {
        return res.status(400).json({ message: "Semua kolom wajib diisi!" });
    }

    // Validasi apakah password baru cocok dengan konfirmasi password
    if (passwordBaru !== konfirmasiPassword) {
        return res.status(400).json({ message: "Konfirmasi password baru tidak cocok!" });
    }

    // Ambil data user dari database untuk cek password lama
    const queryCheck = "SELECT password FROM tb_user WHERE id_user = ?";
    db.query(queryCheck, [id_user], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Terjadi kesalahan pada server" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }

        const currentPasswordInDB = results[0].password;

        // Validasi password lama (Jika menggunakan bcrypt, ganti dengan bcrypt.compareSync)
        if (passwordLama !== currentPasswordInDB) {
            return res.status(400).json({ message: "Password lama yang Anda masukkan salah!" });
        }

        // Eksekusi update password baru ke database
        const queryUpdate = "UPDATE tb_user SET password = ? WHERE id_user = ?";
        db.query(queryUpdate, [passwordBaru, id_user], (errUpdate, resultUpdate) => {
            if (errUpdate) {
                console.error("Update error:", errUpdate);
                return res.status(500).json({ error: "Gagal memperbarui password" });
            }

            return res.status(200).json({ 
                message: "Password berhasil diperbarui! Silakan gunakan password baru pada login berikutnya." 
            });
        });
    });
};

// --- 2. FITUR TAMBAH USER BARU (KHUSUS OWNER) ---
const tambahUser = (req, res) => {
    // Tangkap data username, password, role, dan cabang dari frontend
    const { username, password, role, cabang } = req.body;

    // 1. Validasi input kosong
    if (!username || !password || !role || !cabang) {
        return res.status(400).json({ message: "Semua kolom wajib diisi!" });
    }

    // 2. Cek apakah username sudah ada di database
    const checkUsernameQuery = "SELECT id_user FROM tb_user WHERE username = ?";
    db.query(checkUsernameQuery, [username], (errCheck, resultsCheck) => {
        if (errCheck) {
            console.error("Database error:", errCheck);
            return res.status(500).json({ error: "Terjadi kesalahan saat mengecek username" });
        }

        if (resultsCheck.length > 0) {
            return res.status(409).json({ message: "Username sudah terdaftar! Silakan gunakan username lain." });
        }

        // 3. Jika username aman, masukkan data ke tb_user beserta ROLE-nya
        const insertQuery = "INSERT INTO tb_user (username, password, role, cabang) VALUES (?, ?, ?, ?)";
        db.query(insertQuery, [username, password, role, cabang], (errInsert, resultInsert) => {
            if (errInsert) {
                console.error("Insert error:", errInsert);
                return res.status(500).json({ error: "Gagal menambahkan user baru" });
            }

            return res.status(201).json({ 
                message: "User baru berhasil ditambahkan!",
                data: {
                    id_user: resultInsert.insertId,
                    username,
                    role,
                    cabang
                }
            });
        });
    });
};

// --- 3A. FITUR AMBIL DAFTAR STAF BERDASARKAN CABANG ---
const getStafByCabang = (req, res) => {
    const { cabang } = req.params; // Menangkap nama cabang dari URL

    // Mengambil data user di cabang tersebut, tapi JANGAN tampilkan akun Owner
    const query = "SELECT id_user, username, role FROM tb_user WHERE cabang = ? AND role != 'Owner'";
    
    db.query(query, [cabang], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Gagal mengambil data staf" });
        }

        return res.status(200).json({ 
            message: "Data staf berhasil diambil",
            data: results 
        });
    });
};

// --- 3B. FITUR RESET PASSWORD STAF OLEH OWNER ---
const resetPasswordStaf = (req, res) => {
    const { id_user, passwordBaru, konfirmasiPassword } = req.body;

    // 1. Validasi input
    if (!id_user || !passwordBaru || !konfirmasiPassword) {
        return res.status(400).json({ message: "Semua kolom wajib diisi!" });
    }

    // 2. Validasi konfirmasi
    if (passwordBaru !== konfirmasiPassword) {
        return res.status(400).json({ message: "Konfirmasi password baru tidak cocok!" });
    }

    // 3. Eksekusi update tanpa perlu mengecek password lama
    const queryUpdate = "UPDATE tb_user SET password = ? WHERE id_user = ?";
    db.query(queryUpdate, [passwordBaru, id_user], (errUpdate, resultUpdate) => {
        if (errUpdate) {
            console.error("Update error:", errUpdate);
            return res.status(500).json({ error: "Gagal mereset password staf" });
        }

        return res.status(200).json({ 
            message: "Password staf berhasil direset!" 
        });
    });
};

// --- 4. FITUR HAPUS USER (KHUSUS OWNER) ---
const hapusUser = (req, res) => {
    const { id } = req.params; // Menangkap id_user dari URL

    // Query untuk menghapus user berdasarkan ID
    const deleteQuery = "DELETE FROM tb_user WHERE id_user = ?";

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error("Delete error:", err);
            // Catatan: Jika error terjadi karena Foreign Key (user sudah ada di tb_riwayat),
            // MySQL otomatis akan menolak penghapusan untuk menjaga integritas data.
            return res.status(500).json({ error: "Gagal menghapus user. Pastikan user ini tidak memiliki riwayat transaksi." });
        }

        // Cek apakah ada baris yang benar-benar terhapus
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User tidak ditemukan!" });
        }

        return res.status(200).json({ 
            message: "User berhasil dihapus secara permanen!" 
        });
    });
};

// --- 5. FITUR LOGOUT ---
const logout = (req, res) => {
    // Jika menggunakan sistem token (JWT), biasanya di sini ada logika untuk
    // memasukkan token ke daftar blacklist.
    // Namun untuk sistem dasar, kita cukup mengirimkan respons sukses.
    
    return res.status(200).json({ 
        message: "Logout berhasil! Sampai jumpa kembali." 
    });
};

// --- 6. FITUR MENGAMBIL DAFTAR USER (KHUSUS ADMIN) ---
exports.getAllUsers = (req, res) => {
    // panggil semua user kecuali password-nya, diurutkan dari Admin dulu
    const query = `
        SELECT id_user, username, role, cabang 
        FROM tb_user 
        ORDER BY role ASC, username ASC
    `;

    const db = require('../config/database');
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal mengambil data user", error: err.message });
        }
        return res.status(200).json({ data: results });
    });
};

module.exports = {
    updatePasswordSendiri,
    tambahUser,
    getStafByCabang,
    resetPasswordStaf,
    hapusUser,
    logout
};