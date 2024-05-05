// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '192.168.37.35'; // Specify the IP address you want the server to listen on

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive JSON data from the React Native app
app.post('/uploadIngredient', (req, res) => {
    const ingredientData = req.body;
    console.log('Received JSON Data:', ingredientData);
    
    // You could perform additional operations here such as saving the data to a database

    // Send a response back to the client
    res.status(200).send('Data received successfully');
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});