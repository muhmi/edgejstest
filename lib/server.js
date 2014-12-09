var edge = require('edge');
var util = require('util');
var http = require("http");
var WebSocketServer = require('ws').Server;

var HttpPort = 8888;

var statusServer = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("*** Status ***\n");
	response.end();
}).listen(HttpPort);
util.log("http server listening at http://127.0.0.1:" + HttpPort + "/");

var ws = new WebSocketServer({server: statusServer, path: '/ws'});
ws.on("connection", function (conn) {

	conn.remoteAddr = conn._socket.remoteAddress + ":" + conn._socket.remotePort;

	util.log("New connection:" + conn.remoteAddr);
	
	conn.on("message", function (data, flags) {
		try {
			util.log(conn.remoteAddr + " " + data);
			var message = JSON.parse(data);
			if ('msgtype' in message)
			{
				ws.emit(message["msgtype"], conn, message);
			} else {
				conn.send(JSON.stringify({"msgtype": "error", "reason":"unkown msg"}));
			}
		} catch (ex) {
			util.log(ex.stack);
			conn.close(1003, util.inspect(ex));
		}
	})

	conn.on("close", function () {
		util.log("Connection closed: " + conn.remoteAddr);
	})

});