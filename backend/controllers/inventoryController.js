const db = require('../config/database');

// PERUBAHAN: Gunakan "exports." secara langsung pada nama fungsi
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

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: "Gagal memulai transaksi database." });

        if (tipe_input === 'baru') {
            const queryBarang = "INSERT INTO tb_barang (nama_barang, kategori, satuan) VALUES (?, ?, ?)";

            db.query(queryBarang, [nama_barang, kategori, satuan], (err, resultBarang) => {
                if (err) return db.rollback(() => res.status(500).json({ error: "Gagal simpan master barang: " + err.message }));

                const newIdBarang = resultBarang.insertId;

                const queryStok = "INSERT INTO tb_stok (id_barang, jumlah_stok, cabang) VALUES (?, ?, ?)";
                db.query(queryStok, [newIdBarang, jumlah, cabang], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: "Gagal simpan saldo stok: " + err.message }));

                    // PERBAIKAN 1: Tambah kolom cabang untuk barang baru
                    const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                    db.query(queryHistori, [newIdBarang, id_user, jumlah, cabang], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: "Gagal mencatat histori: " + err.message }));

                        db.commit((err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: "Gagal commit database." }));
                            return res.status(200).json({ message: "Barang baru berhasil terdaftar di master dan stok cabang!" });
                        });
                    });
                });
            });
        }
        else if (tipe_input === 'restock') {
            const queryUpdateStok = "UPDATE tb_stok SET jumlah_stok = jumlah_stok + ? WHERE id_barang = ? AND cabang = ?";

            db.query(queryUpdateStok, [jumlah, id_barang, cabang], (err, resultUpdate) => {
                if (err) return db.rollback(() => res.status(500).json({ error: "Gagal update saldo stok: " + err.message }));

                if (resultUpdate.affectedRows === 0) {
                    const queryInsertStokBaru = "INSERT INTO tb_stok (id_barang, jumlah_stok, cabang) VALUES (?, ?, ?)";
                    db.query(queryInsertStokBaru, [id_barang, jumlah, cabang], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: "Gagal membuat data stok cabang baru." }));

                        // PERBAIKAN 2: Tambah kolom cabang untuk restock (stok cabang baru)
                        const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                        db.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: "Gagal mencatat histori restock: " + err.message }));

                            db.commit((err) => {
                                if (err) return db.rollback(() => res.status(500).json({ error: "Gagal commit database." }));
                                return res.status(200).json({ message: "ReStock cabang berhasil ditambahkan!" });
                            });
                        });
                    });
                } else {
                    // PERBAIKAN 3: Tambah kolom cabang untuk restock (stok cabang sudah ada)
                    const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Masuk', ?, NOW(), ?)";
                    db.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: "Gagal mencatat histori restock: " + err.message }));

                        db.commit((err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: "Gagal commit database." }));
                            return res.status(200).json({ message: "ReStock cabang berhasil diperbarui!" });
                        });
                    });
                }
            });
        } else {
            db.rollback(() => res.status(400).json({ message: "Tipe input tidak valid." }));
        }
    });
};

// --- FITUR MENGAMBIL DATA BARANG & STOK (UNTUK DASHBOARD) ---
exports.getItems = (req, res) => {
    // Query JOIN untuk menggabungkan master barang dan saldo cabang
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

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: "Gagal memulai transaksi database." });

        const queryKurangStok = "UPDATE tb_stok SET jumlah_stok = jumlah_stok - ? WHERE id_barang = ? AND cabang = ?";

        db.query(queryKurangStok, [jumlah, id_barang, cabang], (err, resultUpdate) => {
            if (err) return db.rollback(() => res.status(500).json({ error: "Gagal memotong saldo stok: " + err.message }));

            if (resultUpdate.affectedRows === 0) {
                return db.rollback(() => res.status(404).json({ error: "Data stok barang di cabang ini tidak ditemukan." }));
            }

            // PERBAIKAN: Menambahkan kolom 'cabang' dan menggunakan huruf kapital 'Keluar'
            const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal, cabang) VALUES (?, ?, 'Keluar', ?, NOW(), ?)";

            // PERBAIKAN: Memasukkan variabel 'cabang' ke dalam susunan array parameter query
            db.query(queryHistori, [id_barang, id_user, jumlah, cabang], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ error: "Gagal mencatat histori pengeluaran: " + err.message }));

                db.commit((err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: "Gagal commit database." }));
                    return res.status(200).json({ message: "Barang keluar berhasil dicatat dan stok cabang telah dikurangi!" });
                });
            });
        });
    });
};

// --- FITUR MENGAMBIL RIWAYAT TRANSAKSI (HISTORY) ---
exports.getHistory = (req, res) => {
    // Menangkap parameter filter dari URL (Query String)
    const { startDate, endDate, cabang, jenis_transaksi } = req.query;

    // Query dasar dengan JOIN ke tb_barang dan tb_users
    // Sesuaikan 'u.username' dengan nama kolom di tabel tb_users milikmu (misal: u.nama_lengkap atau u.nama)
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

    // 1. Filter Tanggal (Jika ada)
    if (startDate && endDate) {
        // Tambahkan 23:59:59 pada endDate agar mencakup transaksi hingga akhir hari tersebut
        query += ` AND r.tanggal >= ? AND r.tanggal <= ?`;
        queryParams.push(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
    }

    // 2. Filter Cabang (Jika ada dan bukan 'All')
    if (cabang && cabang.toLowerCase() !== 'all') {
        query += ` AND r.cabang = ?`;
        queryParams.push(cabang);
    }

    // 3. Filter Jenis Transaksi (Masuk / Keluar)
    if (jenis_transaksi) {
        query += ` AND r.jenis_transaksi = ?`;
        queryParams.push(jenis_transaksi);
    }

    // Urutkan dari yang paling baru
    query += ` ORDER BY r.tanggal DESC`;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal mengambil data riwayat", error: err.message });
        }
        return res.status(200).json({ data: results });
    });
};

exports.getLowStock = (req, res) => {
    // Kita set batas aman (threshold) misalnya 10. Bisa disesuaikan nanti.
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
// Tidak perlu module.exports di bawah lagi karena sudah pakai exports.barangMasuk di atas