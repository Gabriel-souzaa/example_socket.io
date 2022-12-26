const express = require('express');
const { Server } = require("socket.io");
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.on('disconnect', () => {
    console.log('a user disconnect')
});

server.listen(3000, () => console.log("Server started!!!"))