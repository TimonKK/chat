'use strict'

const { Server, OPEN, } = require('ws');

const { Message } = require('../db');

const operationTypeMap = {
    insert: 'new',
    delete: 'remove',
    replace: 'new',
    update: 'update',
    drop: 'remove',
    rename: 'update',
    dropDatabase: 'remove',
    invalidate: 'remove',
};

module.exports = function (opts) {
    const ws = new Server(opts);

    ws
        .on('listening', () => {
            console.log('listening', new Date());
        })
        // headers - массив строк
        .on('headers', function incoming(headers) {
            console.log('headers', headers);
        })
        .on('connection', function (clientSocket, request) {

            // TODO
            // проверка откуда пришёл запрос (домен, CORS и т.п.)
            // авторизация (по токену)
            console.log('client connection', !!clientSocket, !!request, ws.clients.size);

            // Схема:
            // 0. добавление или изменение группы, сообщения, нотифая? идёт через любое API с подтверждением о выполенении.
            // 1. каждый clientSocket связан с датой последного обновления (_updateAt).
            //     Возможно нужно будет хранить отдельные даты для разных устройств
            // 2. начиная с _updateAt стримить изменения коллекции сообщений (watcher или changeStream)
            // 3. т.е. как только есть изменения сообщений - отправить сообщение с данными в сокет
            // 4. клиент применяет изменение к своему состоянию (показывает новое сообщение, новую группу или нотифай).
            let changeStream;

            clientSocket
                .on('open', () => {
                    console.log('client open!');

                    const { userId, groupId } = request.body;

                    changeStream = Message.watch([
                        {
                            $match: {
                                'fullDocument.userId': userId,
                                'fullDocument.groupId': groupId,
                            }
                        },
                    ]).on('change', change => {
                        console.log('change', change);

                        clientSocket.send({
                            type: operationTypeMap[change.operationType] || 'invalid',
                            message: change.fullDocument,
                        });
                    });
                })
                .on('message', function(message) {
                    console.log('client received: %s', message);

                    ws.clients.forEach(s => {
                        // TODO
                        // Добавить проверку что не слать в s, который равен clientSocket из события 'connection'
                        if (s.readyState === OPEN) {
                            clientSocket.send(message);
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