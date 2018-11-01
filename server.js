var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var PORT    = parseInt(process.env.PORT,10) || 5000;

app.get('/', function(req, res) {
	res.status(200).send("Hola soy el servidor de NextCam - Company");
});

io.on('connection', function(socket) {
	// console.log("Alguien se conecto con el socket");

	socket.on('message_new', function(data) {
		io.sockets.emit('message_notify', data);
	});

	// streaming
	socket.on('streaming_video', function(data) {
		io.sockets.emit('streaming_notify', data);
	});


	// actualizacion de transmisiones
	socket.on('streaming_online', function(data) {
		io.sockets.emit('streaming_online_new', data);
	});

	// anunciar que se acabo el streaming
	socket.on('streaming_stop', function(data) {
		io.sockets.emit('streaming_online_stop', data);
	});


});

server.listen(PORT, function() {
	console.log("servidor corriendo en el puerto: ", PORT);
});