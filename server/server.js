const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
   console.log('new user connected');

    socket.emit('newMessage', {
        from: 'zura',
        text: 'hi there Socket.emit',
        createAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'zura',
        text: 'hi there broadcast',
        createAt: new Date().getTime()
    });
   socket.on('createMessage', (message) => {
      console.log('createMessage ', message);
       io.emit('newMessage', {
           from: message.from,
           text: message.text,
           createAt: new Date().getTime()
       });
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