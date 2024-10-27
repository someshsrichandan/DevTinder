const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
});

module.exports = mongoose.model('User', userSchema);; 