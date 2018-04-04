const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
   console.log('new user connected');

   socket.on('createMessage', (message, callback) => {
       let user = users.getUser(socket.id);

       if(user && isRealString(message.text)){
           io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
       }
       callback();
   });

   socket.on('createLocationMessage', function (coords) {
       let user = users.getUser(socket.id);

       if(user) {
           io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
       }
   });

    socket.on('disconnect',() => {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
           return callback('name and room name are required.')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUsersList',users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','hi there Socket.emit'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Zura', `${params.name} has joined. `));
        callback();
    });
});

server.listen(port,() => {
   console.log('listen to port: ', port);
});