const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// User Schema
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentNum: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'User' model out of the UserSchema 
const Student = module.exports = mongoose.model('Student', StudentSchema);


module.exports.getUserById = function(id, callback){
    Student.findById(id, callback);
}

// Find by Student Number
module.exports.getStudentByStudentNum = function(studentNum, callback){
    const query = {studentNum: studentNum}
    Student.findOne(query, callback);
}

// Add student to db
module.exports.addStudent = function(newStudent, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newStudent.password, salt, (err, hash)=>{
            if(err) throw err;
            newStudent.password = hash;
            newStudent.save(callback);
        })
    })
}

// Check password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    })
}