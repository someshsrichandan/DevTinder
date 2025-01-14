const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid :' + value);
            }
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate(value) {
            if (!value.isStrongPassword(value)) {
                throw new Error('Password is weak!' + value);
            }
        }
    },
    age: {
        type: Number,
        min: [16, 'Age should be atleast 16'],
    },
    gender: {
        type: String,
        validate(value) {
            if (["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid!");
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('URL is invalid' + value);
            }
        }
    },
    about: {
        type: String,
        default: 'Hey there! I am using DevTinder'
    },
    skills: {
        type: [String]
    },
}, { timestamps: true });



//best jwt token generation method for user schema  
userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id:user._id}, 'secret', {expiresIn: '7d'});
    return token;
}

//best method for hashing password verification
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);; 