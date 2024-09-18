const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use(routes);


// Start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}!');
    });
});