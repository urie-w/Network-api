const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes


// Start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}!');
    });
});