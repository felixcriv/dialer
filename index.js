var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);
var AreaCodes = require('areacodes');

var tollfree = ['800', '888', '877', '866', '855', '844'];
var reg = new RegExp(/\+?(1)?\d{3}/);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('dial', function(msg) {
        //tollfree
        var areaCode = reg.exec(msg);

        if (tollfree.indexOf(areaCode[0]) > -1) {

            io.emit('dial', {
                phone: msg,
                state: "Toll-Free"
            });
        } else {
            var areaCodes = new AreaCodes();

            areaCodes.get('+1' + msg, function(err, data) {
                
                if (!err) {
                    io.emit('dial', {
                        phone: msg,
                        state: data.state
                    });
                } 
            });
        }
    });
});

server.listen(app.get('port'));