'use strict'

const { Schema, Types: { ObjectId }, model } = require('../mongoose');

const MessageSchema = new Schema({
    name: String,
    text: String,
    userId: [{ type: ObjectId, ref: 'User' }],
    groupId: [{ type: ObjectId, ref: 'Group' }],
}, {
    timestamps: true,
});

module.exports = model('Message', MessageSchema)
