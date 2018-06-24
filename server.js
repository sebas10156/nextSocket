var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var PORT    = parseInt(process.env.PORT,10) || 5000;

app.get('/', function(req, res) {
	res.status(200).send("hola mundo");
});

io.on('connection', function(socket) {
	// console.log("Alguien se conecto con el socket");

	socket.on('refresh_message', function(data) {
		console.log(data);
		io.sockets.emit('message_new', data);
	});
	

});

server.listen(PORT, function() {
	console.log("servidor corriendo en el puerto: ", PORT);
});