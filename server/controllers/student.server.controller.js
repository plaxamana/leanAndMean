// Load module dependencies
const Student = require('mongoose').model('Student');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/env/development');

// Register function
exports.signup = function(req, res, next) {
    let newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentNum: req.body.studentNum,
        program: req.body.program,
        address: req.body.address,
        city: req.body.city,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        password: req.body.password
    });

    Student.addStudent(newStudent, (err, student) => {
        if(err){
            console.log(err);
            res.json({sucess: false, msg: 'Failed to register student'})
       } else {
           res.json({success: true, msg: 'Student registered'})
       }
    });
}

exports.signin = function(req, res, next){
    // Some authentication code here
    const studentNum = req.body.studentNum;
    const password = req.body.password;

    Student.getStudentByStudentNum(studentNum, (err, student) => {
        if(err) throw err;
        if(!student) {
            return res.json({success: false, msg: 'Student not found'});
        }
        
        Student.comparePassword(password, student.password, (err, isMatch)=> {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: student}, config.secret, {
                    expiresIn: 1800 // 30 min expiry
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    student: {
                        id: student._id,
                        name: student.name,
                        studentNum: student.studentNum,
                        email: student.email
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
    res.json({student: req.student});
}

