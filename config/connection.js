const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/network_db',);

module.exports = mongoose.connection;