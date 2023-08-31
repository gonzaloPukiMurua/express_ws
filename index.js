import {Server as WebSocketServer} from 'socket.io';
import http from 'http';
import app from './src/app.js';
import sockets from './sockets.js';

const server = http.createServer(app);
const io = new WebSocketServer(server);
app.set('io', io);

server.listen(app.get('port'), app.get('host'),() => {
    console.log(`Server is in port ${app.get('port')}`);
});

sockets(io);