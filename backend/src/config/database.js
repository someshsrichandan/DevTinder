const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.connect('mongodb://localhost:27017/devTinder')
};

module.exports = connectDB;