const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [4, 'First name should be atleast 3 characters long'],
        maxlength: [50, 'First name should be atmost 20 characters long']
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    age: {
        type: Number,
        min: [16, 'Age should be atleast 16'],
    },
    gender: {
        type: String,
        validate(value) {
            if(["male","female","others"].includes(value)) {
                throw new Error("Gender data is not valid!");
    }}},
    photoUrl: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
    },
    about: {
        type: String,
        default: 'Hey there! I am using DevTinder'
    },
    skills: {
        type: [String]
    },
});

module.exports = mongoose.model('User', userSchema);; 