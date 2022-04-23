
import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';



const app = express();
app.listen(8081, '127.0.0.1')
app.use(express.static('build'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const server = http.createServer(express);
server.listen(8080, '127.0.0.1');
const ioServer = new io.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

ioServer.on('connection', (socket) => {
    let _roomId = '';
    socket.on('join', function({roomId}) {
        if(roomId.length > 5) {
            return socket.emit('error', 'Invalid room')
        }
        _roomId = roomId;
        socket.join(roomId);
    });

    socket.on('sendValue', (value) => {
        ioServer.to(_roomId).emit('receiveValue', {value, id: socket.id})
    })

    socket.on('slot-animate', function(startAnimation: boolean) {
        ioServer.to(_roomId).emit('slot-animate', startAnimation);
    });

    socket.on('disconnect', () => {
        ioServer.to(_roomId).emit('disconnected', socket.id)
    });
});
  