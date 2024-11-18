const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get all products from `eShop` collection
router.get('/eshop', async (req, res) => {
    try {
        const eShopCollection = mongoose.connection.db.collection('eShop');
        const data = await eShopCollection.find({}).toArray(); // Fetch all documents

        // Transform the data to match frontend expectations
        const transformedData = data.map(item => ({
            _id: item._id.toString(), // Convert ObjectId to string
            title: item.title,
            image: item.image,
            rating: parseInt(item.rating.$numberInt || item.rating, 10), // Handle $numberInt for rating
            price: parseFloat(item.price.$numberInt || item.price), // Handle $numberInt for price
        }));

        // Send the transformed response
        res.status(200).json({ eShop: transformedData });
    } catch (err) {
        console.error('Error fetching eShop data:', err);
        res.status(500).json({ error: 'Failed to fetch eShop data' });
    }
});

module.exports = router;








// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // Get all products from `eShop` collection
// router.get('/eshop', async (req, res) => {
//     try {
//         const eShopCollection = mongoose.connection.db.collection('eShop');
//         const data = await eShopCollection.find({}).toArray(); // Fetch all documents
//         res.status(200).json({ eShop: data }); // Structured response
//     } catch (err) {
//         console.error('Error fetching eShop data:', err);
//         res.status(500).json({ error: 'Failed to fetch eShop data' });
//     }
// });

// module.exports = router;
