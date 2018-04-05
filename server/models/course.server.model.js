const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// User Schema
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

// Configure the 'CourseSchema' to use getters and virtuals when transforming to JSON
CourseSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

// Create the 'Course' model out of the CourseSchema 
const Course = module.exports = mongoose.model('Course', CourseSchema);
