'use strict'

const { Schema, Types: { ObjectId }, model } = require('../mongoose');

const MessageSchema = new Schema({
    text: String,
    userId: { type: ObjectId, ref: 'User', index: true },
    groupId: { type: ObjectId, ref: 'Group', index: true },
}, {
    timestamps: true,
});

MessageSchema.index({ createdAt: 1 });

module.exports = model('Message', MessageSchema)
