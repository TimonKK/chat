'use strict'

const { Schema, ObjectId, model } = require('../mongoose');

const GroupSchema = new Schema({
    name: String,
    userId: { type: ObjectId, ref: 'User', index: true },
}, {
    timestamps: true,
});

GroupSchema.index({ createdAt: 1 });

module.exports = model('Group', GroupSchema);
