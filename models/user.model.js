// user schema

const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = User = mongoose.model('user', UserSchema)