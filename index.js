const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
const expressServer = app.listen(4000);
const io = socketio(expressServer);
io.on('connection', (socket) => {
    socket.emit('messageFromServer', {data: "Welcome to the socketio server"});
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    });
    socket.on('newMessageToServer', (msg) => {
        io.emit('messageToClients', {text: msg.text})
    })
});