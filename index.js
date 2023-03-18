import app from './src/app.js';
import './src/db.js';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import { PORT } from './src/config.js';
import sockets from './src/sockets.js';

const server = http.createServer(app);

const httpServer = server.listen(PORT, ()=>{
    console.log(`servidor en puerto ${PORT}`);
});

const io = new WebSocketServer(httpServer, {
    cors:{
        origin: '*'
    }
})
sockets(io);



