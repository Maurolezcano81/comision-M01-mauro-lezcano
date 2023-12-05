const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('User', UserSchema);