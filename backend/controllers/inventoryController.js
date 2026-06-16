const db = require('../config/database');

// --- FITUR BARANG MASUK & RESTOCK (MULTI TABLE TRANSACTION) ---
exports.barangMasuk = (req, res) => {
    const {
        tipe_input,
        id_barang,
        nama_barang,
        kategori,
        satuan,
        jumlah,
        cabang,
        id_user
    } = req.body;

    if (!tipe_input || !jumlah || !cabang || !id_user) {
        return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    // 1. PINJAM KONEKSI DARI POOL
    db.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Gagal meminjam koneksi database: " + err.message });

        // 2. MULAI TRANSAKSI PADA KONEKSI YANG DIPINJAM
        connection.beginTransaction((err) => {
            if (err) {
                connection.release(); // Pulangkan koneksi jika gagal
                return res.status(500).json({ error: "Gagal memulai transaksi database." });
            }

            if (tipe_input === 'baru') {
                const queryBarang = "INSERT INTO tb_barang (nama_barang, kategori, satuan) VALUES (?, ?, ?)";

                connection.query(queryBarang, [nama_barang, kategori, satuan], (err, resultBarang) => {
                    if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal simpan master barang: " + err.message }) });

                    const newIdBarang = resultBarang.insertId;

                    const queryStok = "INSERT INTO tb_stok (id_barang, jumlah_stok, cabang) VALUES (?, ?, ?)";
                    connection.query(queryStok, [newIdBarang, jumlah, cabang], (err) => {
                        if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal simpan saldo stok: " + err.message }) });

                        const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                        connection.query(queryHistori, [newIdBarang, id_user, jumlah, cabang], (err) => {
                            if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal mencatat histori: " + err.message }) });

                            connection.commit((err) => {
                                if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal commit database." }) });
                                connection.release(); // KEMBALIKAN KONEKSI SETELAH SUKSES
                                return res.status(200).json({ message: "Barang baru berhasil terdaftar di master dan stok cabang!" });
                            });
                        });
                    });
                });
            }
            else if (tipe_input === 'restock') {
                const queryUpdateStok = "UPDATE tb_stok SET jumlah_stok = jumlah_stok + ? WHERE id_barang = ? AND cabang = ?";

                connection.query(queryUpdateStok, [jumlah, id_barang, cabang], (err, resultUpdate) => {
                    if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal update saldo stok: " + err.message }) });

                    if (resultUpdate.affectedRows === 0) {
                        const queryInsertStokBaru = "INSERT INTO tb_stok (id_barang, jumlah_stok, cabang) VALUES (?, ?, ?)";
                        connection.query(queryInsertStokBaru, [id_barang, jumlah, cabang], (err) => {
                            if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal membuat data stok cabang baru." }) });

                            const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                            connection.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                                if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal mencatat histori restock: " + err.message }) });

                                connection.commit((err) => {
                                    if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal commit database." }) });
                                    connection.release();
                                    return res.status(200).json({ message: "ReStock cabang berhasil ditambahkan!" });
                                });
                            });
                        });
                    } else {
                        const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                        connection.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                            if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal mencatat histori restock: " + err.message }) });

                            connection.commit((err) => {
                                if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal commit database." }) });
                                connection.release();
                                return res.status(200).json({ message: "ReStock cabang berhasil diperbarui!" });
                            });
                        });
                    }
                });
            } else {
                connection.release(); // Pulangkan koneksi jika tipe_input salah
                return res.status(400).json({ message: "Tipe input tidak valid." });
            }
        });
    });
};

// --- FITUR MENGAMBIL DATA BARANG & STOK (UNTUK DASHBOARD) ---
// Catatan: Fungsi SELECT biasa tidak perlu getConnection manual, db.query akan mengelolanya otomatis
exports.getItems = (req, res) => {
    const query = `
        SELECT 
            b.id_barang, 
            b.nama_barang, 
            b.kategori, 
            b.satuan, 
            s.jumlah_stok, 
            s.cabang 
        FROM tb_barang b
        JOIN tb_stok s ON b.id_barang = s.id_barang
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal mengambil data inventory", error: err.message });
        }
        return res.status(200).json({ data: results });
    });
};

// --- FITUR BARANG KELUAR (OUTPUT - MULTI TABLE TRANSACTION) ---
exports.barangKeluar = (req, res) => {
    const { id_barang, jumlah, cabang, id_user } = req.body;

    if (!id_barang || !jumlah || !cabang || !id_user) {
        return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    db.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "Gagal meminjam koneksi database: " + err.message });

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                return res.status(500).json({ error: "Gagal memulai transaksi database." });
            }

            const queryKurangStok = "UPDATE tb_stok SET jumlah_stok = jumlah_stok - ? WHERE id_barang = ? AND cabang = ?";

            connection.query(queryKurangStok, [jumlah, id_barang, cabang], (err, resultUpdate) => {
                if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal memotong saldo stok: " + err.message }) });

                if (resultUpdate.affectedRows === 0) {
                    return connection.rollback(() => { connection.release(); res.status(404).json({ error: "Data stok barang di cabang ini tidak ditemukan." }) });
                }

                const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Keluar', ?, NOW(), ?)";

                connection.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                    if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal mencatat histori pengeluaran: " + err.message }) });

                    connection.commit((err) => {
                        if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "Gagal commit database." }) });
                        connection.release();
                        return res.status(200).json({ message: "Barang keluar berhasil dicatat dan stok cabang telah dikurangi!" });
                    });
                });
            });
        });
    });
};

// --- FITUR MENGAMBIL RIWAYAT TRANSAKSI (HISTORY) ---
exports.getHistory = (req, res) => {
    const { startDate, endDate, cabang, jenis_transaksi } = req.query;

    let query = `
        SELECT 
            r.id_transaksi, 
            b.nama_barang, 
            r.jumlah, 
            r.jenis_transaksi, 
            r.tanggal, 
            r.cabang, 
            u.username AS pic 
        FROM tb_riwayat r
        JOIN tb_barang b ON r.id_barang = b.id_barang
        JOIN tb_user u ON r.id_user = u.id_user
        WHERE 1=1
    `;

    let queryParams = [];

    if (startDate && endDate) {
        query += ` AND r.tanggal >= ? AND r.tanggal <= ?`;
        queryParams.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
    }

    if (cabang && cabang.toLowerCase() !== 'all') {
        query += ` AND r.cabang = ?`;
        queryParams.push(cabang);
    }

    if (jenis_transaksi) {
        query += ` AND r.jenis_transaksi = ?`;
        queryParams.push(jenis_transaksi);
    }

    query += ` ORDER BY r.tanggal DESC`;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal mengambil data riwayat", error: err.message });
        }
        return res.status(200).json({ data: results });
    });
};

exports.getLowStock = (req, res) => {
    const query = `
        SELECT b.nama_barang, s.jumlah_stok, s.cabang, b.kategori 
        FROM tb_stok s
        JOIN tb_barang b ON s.id_barang = b.id_barang
        WHERE s.jumlah_stok <= 10
        ORDER BY s.jumlah_stok ASC
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "Gagal mengambil data stok menipis: " + err.message });
        
        return res.status(200).json({
            message: "Berhasil mengambil data low stock",
            data: results
        });
    });
};