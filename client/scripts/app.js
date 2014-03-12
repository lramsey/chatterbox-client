// YOUR CODE HERE:

$(document).ready(function(){
   
   var sendPost = function(message){
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data) {
            console.log('chatterbox: Message sent');
        },
        error: function(data) {
            console.error('chatterbox: Failed to send message');
        }
    });
  };
  
  var getPosts = function(){
    $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: JSON.parse(data),
        contentType: 'application/json',
        success: function(data) {
            console.log('chatterbox: Messages received');
        },
        error: function(data) {
            console.error('chatterbox: Failed to receive messages');
        }
    });
  }

});

/* $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
}); */