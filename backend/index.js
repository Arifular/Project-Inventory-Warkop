const express = require('express');
const cors = require('cors');
const db = require('./config/database'); // Mengimpor konfigurasi database
const barangRoutes = require('./routes/barangRoutes'); // Mengimpor route untuk barang
const authRoutes = require('./routes/authRoutes'); // Mengimpor route untuk autentikasi
const inventoryRoutes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes'); // Mengimpor route untuk user

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Mengizinkan aplikasi React Native mengakses backend ini
app.use(express.json()); // Memastikan backend bisa membaca format data JSON
app.use('/api/barang', barangRoutes); // Menggunakan route untuk barang
app.use('/api/auth', authRoutes); // Menggunakan route untuk autentikasi
app.use('/api/items', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

// Route dasar untuk pengetesan awal
app.get('/', (req, res) => {
    res.send('Halo! Backend Inventaris Warkop Meteora Berhasil Berjalan!');
});

// Menjalankan server di port 3000
app.listen(port, () => {
    console.log(`Server Meteora Backend berjalan di http://localhost:${port}`);
});