// Load module dependencies
const students = require('../controllers/student.server.controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
    // Register Route
    app.route('/students/signup').post(students.signup);

    // Authenication Route
    app.route('/students/signin').post(students.signin);

    // Profile Route
    app.route('/students/profile').get(passport.authenticate('jwt', {session: false}), students.getProfile);
}
