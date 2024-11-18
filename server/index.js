const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
// const path = require('path');


const shopRoutes = require('./routes/shop'); // Import routes

const app = express();
const PORT = process.env.PORT || 4000; // Default port 4000

// Middleware
app.use(express.json()); // Parse JSON
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// MongoDB Connection
const DATABASE = process.env.DATABASE;
mongoose.connect(DATABASE)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if connection fails
    });

// Routes
app.use('/api', shopRoutes);

// app.use('/images', express.static(path.join(__dirname, 'public_html/Images/laptop.jpg')));


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
