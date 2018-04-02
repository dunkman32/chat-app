const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
   console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin','hi there Socket.emit'));
    socket.broadcast.emit('newMessage',generateMessage('Zura','hi there broadcast'));

   socket.on('createMessage', (message, callback) => {
      console.log('createMessage ', message);
       io.emit('newMessage',generateMessage(message.from, message.text));
       callback();
       // socket.broadcast.emit('newMessage', {
       //     from: message.from,
       //     text: message.text,
       //     createAt: new Date().getTime()
       // });
   });
    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});

server.listen(port,() => {
   console.log('listen to port: ', port);
});