const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  local: {
    fullname: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { 
        type: String
     },
    gender: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
  },
});

module.exports = model('user', userSchema);