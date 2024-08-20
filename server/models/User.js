const mongoose = require('mongoose');
const {Schema} = mongoose;
require('dotenv').config();

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;