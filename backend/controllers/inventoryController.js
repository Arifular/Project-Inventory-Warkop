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

                    const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal) VALUES (?, ?, 'masuk', ?, NOW())";
                    db.query(queryHistori, [newIdBarang, id_user, jumlah], (err) => {
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
                        
                        const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal) VALUES (?, ?, 'masuk', ?, NOW())";
                        db.query(queryHistori, [id_barang, id_user, jumlah], (err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: "Gagal mencatat histori restock: " + err.message }));
                            
                            db.commit((err) => {
                                if (err) return db.rollback(() => res.status(500).json({ error: "Gagal commit database." }));
                                return res.status(200).json({ message: "ReStock cabang berhasil ditambahkan!" });
                            });
                        });
                    });
                } else {
                    const queryHistori = "INSERT INTO tb_riwayat (id_barang, id_user, jenis_transaksi, jumlah, tanggal) VALUES (?, ?, 'masuk', ?, NOW())";
                    db.query(queryHistori, [id_barang, id_user, jumlah], (err) => {
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
// Tidak perlu module.exports di bawah lagi karena sudah pakai exports.barangMasuk di atas