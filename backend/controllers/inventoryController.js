const db = require('../config/database'); 

const getInventory = (req, res) => {
    // Kueri sakti untuk menggabungkan tb_barang dan tb_stok
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
            console.error("Error mengambil data:", err);
            return res.status(500).json({ error: "Gagal mengambil data dari database" });
        }
        
        res.status(200).json({ 
            message: "Data stok gabungan berhasil diambil",
            data: results 
        });
    });
};

module.exports = { getInventory };