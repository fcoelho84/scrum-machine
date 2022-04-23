
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
    
    socket.on('join', function({roomId}) {
        if(roomId.length > 5) {
            return socket.emit('error', 'Invalid room')
        }
        socket.join(roomId);
    });

    socket.on('sendValue', (value) => {
        const rooms = Object.keys(Object.fromEntries(ioServer.sockets.adapter.rooms)).filter(room => room.length <= 5);
        ioServer.to(rooms).emit('receiveValue', {value, id: socket.id})
    })

    socket.on('slot-animate', function(startAnimation: boolean) {
        const rooms = Object.keys(Object.fromEntries(ioServer.sockets.adapter.rooms)).filter(room => room.length <= 5);
        ioServer.to(rooms).emit('slot-animate', startAnimation);
    });

    socket.on('disconnect', () => {
        const rooms = Object.keys(Object.fromEntries(ioServer.sockets.adapter.rooms)).filter(room => room.length <= 5);
        rooms.forEach(roomId => {
            ioServer.to(roomId).emit('disconnected', socket.id)
        })
    });
});
  