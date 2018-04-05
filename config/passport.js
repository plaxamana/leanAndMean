const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../server/models/student.server.model');
const config = require('../config/env/development');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Student.getUserById(jwt_payload.data._id, (err, student) => {
            if(err){
                return done(err, false);
            }

            if(student){
                return done(null, student);
            } else {
                return done(null, false);
            }
        })
    }));
}
