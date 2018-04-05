// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose config method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db);

    // Check if database is connected
    mongoose.connection.on('connected', () => {
        console.log('Connected to: ' + config.db);
    })

    // On error
    mongoose.connection.on('error', (err) => {
        console.log('database error: ' + err);
    })

    // Load the 'User' model
    require('../server/models/user.server.model');

    // Return the Mongoose connection instance
    return db;
}

