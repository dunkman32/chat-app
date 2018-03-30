let socket = io();
socket.on('connect', function (){
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Zura',
        text: 'hey this is zura',
    });
});
socket.on('disconnect', function () {
    console.log('disconnected to server');
});
socket.on('newMessage', function (message) {
    console.log('new Message', message);
});