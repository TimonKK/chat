'use strict'

const http = require('http');
const express = require('express');
const app = express();
const port = 5000;

const socker = require('./socket');
const { Group } = require('./db');

const server = http.createServer(app);
socker({ server });

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/api/group', async (req, res) => {
    const groups = await Group.find().exec();;

    res.json({ groups: groups.map(g => g.toJSON()), });
});

app.post('/api/group', async (req, res) => {
    const { name } = req.body;

    const group = new Group({ name });

    await group.save();

    res.json({ group: group.toJSON(), });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});