'use strict'

const { Message, Types: { ObjectId } } = require('../db');

module.exports = function (app) {
    app.get('/api/message', async (req, res) => {

        // TODO userId нужно брать из данных авторизации (токена или ещё где)
        const { userId, groupId } = req.query;

        // TODO Посмотреть что дает -1 при создании индекса (особено в запросе с обратной сортировкой)
        const messages = await Message.find({
            userId, groupId,
        }).sort({ createdAt: -1 }).exec();

        res.json({ messages: messages.map(g => g.toJSON()), })
    });

    app.post('/api/message', async (req, res) => {
        const { text, userId, groupId } = req.body;

        const message = new Message({
            text,
            userId: new ObjectId(userId),
            groupId: new ObjectId(groupId),
        });

        await message.save();

        res.json({ message: message.toJSON(), });
    });
}