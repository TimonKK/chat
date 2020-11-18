'use strict'

const mongoose = require('../mongoose');

const GroupSchema = new mongoose.Schema({
    name: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Group', GroupSchema);
