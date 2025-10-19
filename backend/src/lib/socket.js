import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { ENV } from './env.js';
import { socketAuthMiddleware } from '../middleware/socket.auth.middleware.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// function to determine the online users
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// function to store online users
// const userSocketMap = {};
const userSocketMap = new Map();

io.on('connection', socket => {
    console.log('A user connected', socket.user.firstName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;
    // const sockets = userSocketMap.get(userId ?? new Set());
    // sockets.add(socket.id);
    // userSocketMap.set(userId, sockets);

    // io.emit used to send events to all connected clients
    // io.emit('getOnlineUsers', Object.keys(userSocketMap));
    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

    // listen for events from client side
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.user.firstName);
        // delete userSocketMap[userId];
        // io.emit('getOnlineUsers', Object.keys(userSocketMap));
        const sockets = userSocketMap.get(userId);
        if (sockets) {
            sockets.delete(socket.id);
            if (sockets.size === 0) userSocketMap.delete(user.id);
            io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
        }
    })
});

export { io, app, server };