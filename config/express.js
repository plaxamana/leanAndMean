// Load the module dependencies
const config = require('./config');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // allows to you to make requests to api
const passport = require('passport');
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');


module.exports = function () {
    // Create a new Express app inst
    const app = express();

    // Use the NODE_ENV variable to activate
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // CORS Middleware
    app.use(cors());

    // Body Parser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    require('./passport')(passport);

    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.secret
    }));

    // Method Override Middleware
    app.use(methodOverride());

    // Configure static file serving
    app.use(express.static(path.join(__dirname, '../public')));

    // Load the Routes
    require('../server/routes/users.server.route.js')(app);

    // index route
    app.get('/', (req, res) => {
        res.send('invalid enpoint')
    });

    app.all('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    })

    return app;
}



