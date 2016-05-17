'use strict';

const PORT = 3000;

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app);

var io = require('socket.io')(server);

var userCount = 0;
var compare =[];


io.on('connection', function(socket) {
	userCount++;
  
  console.log('userCount111111111111', userCount);

  if(userCount === 1 || userCount === 2) {
    socket.emit('playerNum', userCount);
  }

  if(userCount === 2) {
    io.emit('gameStart', null);
  }



socket.on('cardValue', cardValue => {
	console.log('cardValue', cardValue);

	

})


});








server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});