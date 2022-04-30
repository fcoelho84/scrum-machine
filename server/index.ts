import express from 'express';
import http from 'http';
import io from 'socket.io';
import path from 'path';
import elastic from '@elastic/elasticsearch';
import cors from 'cors';
import { SocketKeys, User, SlotUser, SlotStatus } from '../src/interfaces';

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
    .then(response => response.hits.hits[0]._source as { users: SlotUser[]})
    .then(response => response.users) 
}

const deleteRoom = (roomId: string) => {
    return elasticClient.delete({
        index: 'room',
        id: roomId
    })
}

const updateRoom = (roomId: string, newUsers: SlotUser[]) => {
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
    const session: SlotUser = {
        roomId: '',
        id: socket.id,
        value: '?',
        name: '?',
        voted: false,
    };

    socket.on(SocketKeys.joinRoom, function(data: User) {
        getRoomUsers(data.roomId)
        .then(users => {
            socket.emit(SocketKeys.roomHistory, users)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            session.roomId = data.roomId;
            session.name = data.name;
            socket.join(data.roomId);
        })
    });

    socket.on(SocketKeys.voted, (value: string) => {
        if(!session.roomId.length) {
            return null;
        }
        const newUser = { 
            ...session,
            value, 
            voted: true,
        };
        getRoomUsers(session.roomId)
        .then(users => {
            const user = users.find(user => user.id === socket.id);
            if(!user) {
                users.push(newUser);
                return users;
            }
            return users.map(user => user.id === socket.id ? newUser : user)
        })
        .then(users => updateRoom(session.roomId, users));
        ioServer.to(session.roomId).emit(SocketKeys.receiveVote, newUser);
    })

    socket.on(SocketKeys.slotStatus, function(status: number) {
        if(status === SlotStatus.stopped) {
            ioServer.to(session.roomId).emit(SocketKeys.resetRoomVotes, true);
        }
        ioServer.to(session.roomId).emit(SocketKeys.slotStatus, status);
    });

    socket.on('disconnect', () => {  
        if(!session.roomId.length) {
            return null;
        }
        getRoomUsers(session.roomId)
        .then(users => users.filter(user => user.id !== socket.id))
        .then(users => {
            if(!session.roomId) return;
            if(users.length === 0) {
                return deleteRoom(session.roomId);
            }
            return updateRoom(session.roomId, users);
        });
        ioServer.to(session.roomId).emit(SocketKeys.slotDisconnected, socket.id)
    });
});
  
  