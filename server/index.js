'use strict'

const http = require('http');
const express = require('express');
const app = express();
const port = 5000;

const socker = require('./socket');

const server = http.createServer(app);
socker({ server });

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

require('./controller/group')(app);
require('./controller/message')(app);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});