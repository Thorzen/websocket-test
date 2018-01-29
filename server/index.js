var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  var min = 1;
  var max = 100;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  socket.on('message', function (num) {
    num = parseInt(num, 10);
    socket.broadcast.emit('user-guesses', 'User guessed ' + num);
    socket.emit('guessresponse', num === randomNum ? 'You got it!' : (num < randomNum ? 'Too low' : 'Too high'))
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});