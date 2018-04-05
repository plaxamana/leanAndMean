// Load module dependencies
const User = require('mongoose').model('User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/env/development');

// Register function
exports.register = function(req, res, next) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({sucess: false, msg: 'Failed to register user'})
       } else {
           res.json({success: true, msg: 'User registered'})
       }
    });
}

exports.authenticate = function(req, res, next){
    // Some authentication code here
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        
        User.comparePassword(password, user.password, (err, isMatch)=> {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 1800 // 30 min expiry
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        })
    })
}

exports.getProfile = function(req, res, next){
    // Load the profile
    res.json({user: req.user});
}

