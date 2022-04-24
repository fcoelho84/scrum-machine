import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import elastic from '@elastic/elasticsearch';
import cors from 'cors';
interface User {
    id: string;
    value: string;
}

const elasticClient = new elastic.Client({
    node: `https://my-deployment-1a31fa.es.us-central1.gcp.cloud.es.io:9243/`,
    auth: {
        username: 'elastic',
        password: 'ykeiqYNYZY2oKYhRYfxrwO8i'
    }
});


const app = express();
app.listen(8081)
app.use(express.static('build'));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))

const getRoomUsers = (roomId: string) => {
    return elasticClient.search({
        index: 'room',
        body: { query: { match: {  _id: roomId } } } 
    })
    .then(response => response.hits.hits[0]._source as {users: User[]})
    .then(response => response.users) 
}

const deleteRoom = (roomId: string) => {
    return elasticClient.delete({
        index: 'room',
        id: roomId
    })
}

const updateRoom = (roomId: string, newUsers: User[]) => {
    return elasticClient.update({
        index: 'room',
        id: roomId,
        script: {
            lang: 'painless',
            source: 'ctx._source.users = params.newUsers',
            params: { newUsers }
        }
    })
}

app.post('/api/room', (req, res) => {
    elasticClient.index({ index: 'room', body: { users: [] } })
    .then(response => res.json({id: response._id}))
    .catch(error => res.send(String(error)))
});

// app.get('/api/room/:roomId', (req, res) => {
//     getRoomUsers(req.params.roomId)
//     .then(users => res.json({ users }))
//     .catch(error => res.send(String(error)))
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(express);
server.listen(8080);
const ioServer = new io.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

ioServer.on('connection', (socket) => {
    let _roomId = '';
    socket.on('join', function({roomId}) {
        getRoomUsers(roomId)
        .then(users => {
            _roomId = roomId;
            socket.join(roomId);
            socket.emit('history', users)
        })
    });

    socket.on('sendValue', (value: string) => {
        if(!_roomId) {
            return null;
        }
        getRoomUsers(_roomId)
        .then(users => {
            const user = users.find(user => user.id === socket.id);
            const data = { id: socket.id,  value }
            if(user) {
                return users.map(user => {
                    if(user.id === socket.id) {
                        return data
                    }
                    return user;
                })
            }
            return [...users, data];
        })
        .then(users => updateRoom(_roomId, users))
        .then(() => ioServer.to(_roomId).emit('receiveValue', {value, id: socket.id}));
    })

    socket.on('slot-animate', function(startAnimation: boolean) {
        ioServer.to(_roomId).emit('slot-animate', startAnimation);
    });

    socket.on('disconnect', () => {  
        if(!_roomId) {
            return null;
        }
        getRoomUsers(_roomId)
        .then(users => users.filter(user => user.id !== socket.id))
        .then(users => {
            if(users.length === 0) {
                return deleteRoom(_roomId);
            }
            return updateRoom(_roomId, users);
        })
        .then(() => ioServer.to(_roomId).emit('disconnected', socket.id));
    });
});
  
  