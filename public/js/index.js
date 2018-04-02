let socket = io();
socket.on('connect', function (){
    console.log('connected to server');
});
socket.on('disconnect', function () {
    console.log('disconnected to server');
});
socket.on('newMessage', function (message) {
    console.log('new Message', message);
    let li = $('<li></li>');
    li.text(`${message.from} ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');

    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    $('#messages').append(li);

});

let messageTextBox = $('[name=message]');
$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

let locationButton = $('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
      return alert('geolocations not found by your browser');
  }
  // ლოკაციის დაბლოკვა
  locationButton.attr('disabled', 'disabled').text('Send location...');

  navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      });
  }, function () {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location');
  });
});

