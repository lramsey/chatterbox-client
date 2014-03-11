// YOUR CODE HERE:

var myName = window.location.search.substring(10);
var myRoom = "4chan";
var lastMessageTime = (new Date(0)).toJSON();

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

  var removeLastMessage = function () {
    $('div.messages').children().last().remove();
  };

  var formatMessages = function(results){
    for(var i = results.length-1; i >= 0; i--) {
      var text = results[i].text;
      var username = results[i].username;
      var createdAt = results[i].createdAt;
      var messageContent = username + ": " + text + "  " + createdAt;
      $('<p></p>').text(messageContent).prependTo($('div.messages'));
      if ($('div.messages').children().length >= 25) {
        removeLastMessage();
      }
    }
    lastMessageTime = results[0].createdAt;
  };

  var postRetrieval = function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {
        order: '-createdAt',
        where: JSON.stringify({
          roomname: myRoom,
          createdAt: { $gt: {"__type": "Date", iso: lastMessageTime}}
        })
      },
      success: function (data) {
        if(data.results.length > 0){
          formatMessages(data["results"]);
        }
      },
      error: function (data) {
        console.log('not retrieved');
      }
    });
  };

  // sending messages
  $('button.send').on('click', function (e) {
    var text = $('.draft').val();
    msgObj.text = text;
    msgObj.username = myName;
    msgObj.roomname = myRoom;

    sendMsg(msgObj);
  });

  // retrieving username from input box
  $('.username').on("keyup", function(){
      myName = $(this).val() || window.location.search.substring(10);
  });

  // retrieving chatroom name
  $('.changeRoom').on("click", function (e) {
    myRoom = $('.chatroom').val() || "4chan";
    $("h2.room").text(myRoom);
    $("div.messages").children().remove();
    lastMessageTime = (new Date(0)).toJSON();
    postRetrieval();

  });
 postRetrieval();
 setInterval(postRetrieval, 3000);
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