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

    // Add Course Route
    app.route('/students/add_course').post(students.addCourse);

    // Drop course
    app.route('/students/drop_course').post(students.dropCourse);

    // List Courses
    app.route('/students/courses').get(students.getCourses);
}
