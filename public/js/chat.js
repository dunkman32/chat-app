let socket = io();

function scrollToBootom() {
    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');

    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function (){
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no err');
        }
    });
});

socket.on('updateUsersList', function (users) {
    let ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('disconnected to server');
});

socket.on('newMessage', function (message) {

    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#message-template').html();

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

   $('#messages').append(html);
    scrollToBootom();
});

socket.on('newLocationMessage', function (message) {

    let formattedTime = moment(message.createdAt).format('h:mm a');

    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    $('#messages').append(html);
    scrollToBootom();
});
    // წერილის ასაკრეფი ველი [name=message]
    let messageTextBox = $('[name=message]');
    $('#message-form').on('submit', function (e) {
        // ლინკზე მოქმედების თავიდან აცილება
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

