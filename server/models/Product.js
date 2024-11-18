const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

// Create and export model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;