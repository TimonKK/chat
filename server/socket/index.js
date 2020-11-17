'use strict'

const { Server, OPEN, } = require('ws');

const store = {};

module.exports = function (opts) {

    const ws = new Server({ port: 5000 });

    ws
        .on('listening', () => {
            console.log('listening', new Date());
        })
        // headers - массив строк
        .on('headers', function incoming(headers) {
            console.log('headers', headers);
        })
        .on('connection', function (websocket, request) {
            console.log('client connection', !!websocket, !!request, ws.clients.size);

            websocket
                .on('open', () => {
                    console.log('client open!');
                })
                .on('message', function(message) {
                    console.log('client received: %s', message);

                    ws.clients.forEach(s => {
                        // TODO
                        // Добавить проверку что не слать в s, который равен websocket из события 'connection'
                        if (s.readyState === OPEN) {
                            websocket.send(message);
                        }
                    });
                })
                .on('close', (code, reason) => {
                    console.log('close client', {code, reason});
                })
                .on('error', err => {
                    console.log('client error', err);
                });
        })
        .on('close', data => {
            console.log('close', data);
        })
        .on('error', err => {
            console.log('error', err);
        });


    return ws;
}