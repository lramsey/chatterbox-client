// YOUR CODE HERE:

var myName = window.location.search.substring(10);
var myRoom = "4chan";
var lastMessageTime = (new Date(0)).toJSON();
var rooms = {};

$(document).ready(function () {
  var msgObj = {};

  var postMSG = function (message) {
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

  var getMessages = function(){
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

  // get active rooms
  var getActiveRooms = function () {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: {
        order: '-createdAt',
        limit: 500,
        where: JSON.stringify({
          createdAt: { $gt: {"__type": "Date", iso: lastMessageTime}}
        })
      },
      success: function (data) {
        if(data.results.length > 0){
          roomFormat(data.results);
        }
      },
      error: function (data) {
        console.log('active rooms not retrieved');
      }
    });
  };

  var roomFormat = function (results) {
    for (var i = 0; i < results.length; i++) {
      rooms[results[i].roomname] = true;
    }
    for (var roomname in rooms) {
      $('<span></span>').text(roomname).appendTo($('div.activeRooms'));
    }
  };

  // sending messages
  $('button.send').on('click', function (e) {
    var text = $('.draft').val();
    msgObj.text = text;
    msgObj.username = myName;
    msgObj.roomname = myRoom;

    postMSG(msgObj);
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
    getMessages();

  });

 getActiveRooms();
 getMessages();

 setInterval(function () {
   getActiveRooms();
   getMessages();
 }, 3000);
});
