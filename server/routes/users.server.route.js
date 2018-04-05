// Load module dependencies
const users = require('../controllers/user.server.controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    // Register Route
    app.route('/users/register').post(users.register);

    // Authenication Route
    app.route('/users/authenticate').post(users.authenticate);

    // Profile Route
    app.route('/users/profile').get(passport.authenticate('jwt', {session: false}), users.getProfile);
}
