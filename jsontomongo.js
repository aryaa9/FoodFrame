const { MongoClient } = require('mongodb');
// Connection URL and Database Settings
const url = 'mongodb://localhost:27017/'; // Change this URL if your MongoDB instance is remote
const dbName = 'test'; // Replace with your database name
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB server");
        const db = client.db(dbName);
        const collection = db.collection('yourCollectionName'); // Replace with your collection name

        // JSON data
        const yogurtData = {
            "ingredient_name": "yogurt",
            "serving_size": 170,
            "macronutrients": {
                "calories": 130,
                "total fat": 1.5,
                "saturated fat": 1,
                "trans fat": 0,
                "cholesterol": 5,
                "sodium": 80,
                "total carbohydrate": 26,
                "dietary fiber": 0,
                "total sugars": 22,
                "protein": 5
            },
            "micronutrients": {
                "vitamin a": 200,
                "vitamin d": 0,
                "calcium": 170,
                "iron": 0,
                "potassium": 240
            },
            "url": "https://firebasestorage.googleapis.com/v0/b/foodframe-422304.appspot.com/o/images%2F2024-05-04T12%3A44%3A57.901Z.jpg?alt=media&token=8131b7f7-88eb-476e-984e-5b4573a06cfd"
        };

        // Insert the JSON data into the collection
        const result = await collection.insertOne(yogurtData);
        console.log(`New document inserted with the _id: ${result.insertedId}`);
    } catch (err) {
        console.error('Error in MongoDB operation:', err);
    } finally {
        await client.close();
    }
}

run();
