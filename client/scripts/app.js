// YOUR CODE HERE:

var myName = window.location.search.substring(10);

$(document).ready(function () {
  var msgObj = {};

  var sendMsg = function (message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: "POST",
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log("message SENT!", data);
      },
      error: function (data) {
        console.log("message not sent!", data);
      }
    });
  };

  $('button').on('click', function (e) {
    e.preventDefault();

    var text = $('input').val();
    msgObj.text = text;
    msgObj.username = myName;
    msgObj.roomname = '4chan';

    sendMsg(msgObj);
  });

  var lastMessageTime;

  var removeMessage = function () {
    $('ul').children().last().remove();
  };

  var formatMessages = function(results){
    var messages = results;
    _.each(messages, function(message){
      var text = message.text;
      var username = message.username;
      var createdAt = message.createdAt;
      var messageContent = username + ": " + text + "  " + createdAt;
      $('<li></li>').text(messageContent).prependTo($('ul')); //prepend?
      if ($('ul').children().length >= 26) {
        removeMessage();
      }
    });
    lastMessageTime = messages[0]['createdAt'];
    setTimeout(function(){
      postRetrieval(lastMessageTime);
    }, 3000);
    console.log(lastMessageTime);
  };

  var postRetrieval = function(messageTime){
    var filter = 'where={"createdAt":{"$gte":{"__type":"Date","iso":' + JSON.stringify(messageTime) + '}}}';
    // "2011-08-21T18:02:52.249Z"
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: filter,//'order=-createdAt'
      success: function (data) {
        formatMessages(data["results"]);
          },
      error: function (data) {
        console.log('not retrieved');
      }
    });
  };
 postRetrieval((new Date(0)).toJSON());
 /* setInterval(function(lastMessageTime){
    postRetrieval(lastMessageTime);
  }, 3000);*/
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