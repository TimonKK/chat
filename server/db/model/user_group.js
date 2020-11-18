'use strict'

const { Schema, Types: { ObjectId }, model } = require('../mongoose');

const UserGroupSchema = new Schema({
    userId: [{ type: ObjectId, ref: 'User' }],
    groupId: [{ type: ObjectId, ref: 'Group' }],
}, {
    timestamps: true,
});

UserGroupSchema.index({ userId: 1, groupId: 1 }, { unique: true });

module.exports = model('UserGroup', UserGroupSchema);
