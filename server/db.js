const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config(); 

const mongoURI = process.env.DATABASE;

if (!mongoURI) {
    console.error("MongoURI is undefined. Make sure your .env file is properly configured.");
    process.exit(1);
}

// console.log("MongoURI:", mongoURI);

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        

        // Fetch data from collections
        const fetched_eShop = mongoose.connection.db.collection("eShop");
        // const fetched_foodPanda = mongoose.connection.db.collection("food_panda");
        const eShopData = await fetched_eShop.find({}).toArray();
        // const foodPandaData = await fetched_foodPanda.find({}).toArray();


        // const fetched_foodCategory = mongoose.connection.db.collection("foodCategory");
        // const foodCategoryData = await fetched_foodCategory.find({}).toArray();


        global.eShop = eShopData;

        // global.food_panda = foodPandaData;
        // global.foodCategory = foodCategoryData;

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
        process.exit(1);
    }
};

module.exports = mongoDB;
