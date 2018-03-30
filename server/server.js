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
      from: 'CR7 ',
       text: 'hey how are you',
       createAt: 123
   });

   socket.on('createMessage', (message) => {
      console.log('createMessage ', message);
   });
    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});

server.listen(port,() => {
   console.log('listen to port: ', port);
});