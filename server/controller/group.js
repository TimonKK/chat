'use strict'

const { Group, UserGroup, Types: { ObjectId }} = require('../db');

module.exports = function (app) {
    app.get('/api/group', async (req, res) => {
        const{ userId } = req.query;

        const userGroups = await UserGroup.find({
            userId: new ObjectId(userId),
        }).sort({createdAt: -1}).exec();

        const groups = await Group.find({
            _id: {
                $in: userGroups.map(ug => ug.groupId)
            }
        })

        res.json({ groups: groups.map(g => g.toJSON()), });
    });

    app.post('/api/group', async (req, res) => {
        const { name, userId } = req.body;

        const group = new Group({ name });

        await group.save();

        const userGroup = new UserGroup({
            userId: new ObjectId(userId),
            groupId: group._id
        });

        await userGroup.save();

        res.json({ group: group.toJSON(), });
    });
}