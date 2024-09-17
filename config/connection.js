const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/network_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;