'use strict'

const mongoose = require('../mongoose');

const UserSchema = new mongoose.Schema({
    name: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
