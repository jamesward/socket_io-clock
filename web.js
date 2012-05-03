var express = require("express"),
    io      = require("socket.io"),
    app     = express.createServer(express.logger()),
    moment  = require("moment")

app.use(express.static(__dirname + "/public"))

var socket = io.listen(app)
socket.configure(function () { 
  socket.set("transports", ["xhr-polling"]) 
  socket.set("polling duration", 10) 
  socket.set("log level", 1)
})

socket.sockets.on("connection", function (socket) {
  var tick = setInterval(function() {
    socket.broadcast.emit("tick", {time: moment().format('h:mm:ss a')});
  }, 1000);
})
 
var port = process.env.PORT || 3000
console.log("Listening on " + port)

app.listen(port)
