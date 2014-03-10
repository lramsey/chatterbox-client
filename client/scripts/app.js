// YOUR CODE HERE:

var myName = window.location.search.substring(10);

$(document).ready(function () {
  var msgObj = {};

  $('button').on('click', function (e) {
    e.preventDefault();

    var text = $('input').val();
    msgObj.text = text;
    msgObj.username = myName;
    msgObj.roomname = '4chan';
    console.log(msgObj);
  });
});


/*
var message = {
  'username': 'gregLuke',
  'text': 'hello',
  'roomname': '4chan'
};


$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent', data);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});


$.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox/UEZw3Rll2k',
  type: 'GET',

  success: function (data) {
    console.log("unparsed: ", data);
      },
  error: function (data) {
    console.log('not retrieved');
  }
});
*/