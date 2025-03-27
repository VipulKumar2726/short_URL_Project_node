const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        reuired: true,
    },
    email: {
        type: String,
        reuired: true,
        unique: true,
    },
    password: {
        type: String,
        reuired: true,
    }

}, {timestamps: true})

const User = mongoose.model('user', userSchema);

module.exports = User;