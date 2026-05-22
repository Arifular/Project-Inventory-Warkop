const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Import Routes
const barangRoutes = require('./routes/barangRoutes');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/barang', barangRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/items', inventoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
    res.send('Backend Meteora Siap!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});