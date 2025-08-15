import { createServer } from 'node:http';
import { Server } from 'socket.io';

export function initSocketIOServer(
    httpServer: ReturnType<typeof createServer>,
) {
    const io = new Server(httpServer);
    return io;
}
