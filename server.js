// Set the NODE_ENV var
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configMongoose = require('./config/mongoose');
const configExp = require('./config/express');

// Will make the configPassport later
// const configPassport = require('./config/passport');

// Create a new Mongoose connection instance
const db = configMongoose();

// Create a new Express app instance
const app = configExp();

// Configure the Passport middleware
// const passport = configurePassport();

// Port Number
const port = 3200;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

module.exports = app;

