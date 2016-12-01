var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var html = require('escape-html');

var port = process.env.PORT || 3000;

/*fs.readFile('./sample.html', function (err, html) {
    if (err) {
        throw err; 
    }   
    server.on('request', function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.end(html);  
    });

    server.listen(port, function() {
      console.log('Server running at port ' + port);
    });
});

*/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(5001);
app.use( require('express').static(__dirname ));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/sample.html');
});
io.on('connection', function(socket){
  
  socket.on('message', function(data) {

  	if(data &&  typeof data.message == 'string' && data.message) {
  		socket.broadcast.emit('message', {  message: html(data.message) });
     
  	}
  })

});
