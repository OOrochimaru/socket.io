const path = require('path');
const socketIO = require('socket.io')
const http = require('http');
const publicFolder = path.join(__dirname, '../public');
const {generateMessage} = require('./util/message');

const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.static(publicFolder));
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {

    socket.emit('newMessage',generateMessage('admin', 'Welcome to the App'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user found'));
    socket.on('createMessage', (data) => {
        io.emit('newMessage', generateMessage(data.from, data.data) );

        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     data: data.data,
        //     createdAt: new Date().getTime()
        // })
    });

});

server.listen(port, () => {
    console.log(`listening on port ${port} `)
})