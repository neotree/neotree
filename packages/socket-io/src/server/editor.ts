import { Socket } from "socket.io";
import { ioServerHandleEvent } from "@workspace/socket-io/server/utils";
import { initSocketIOServer } from '@workspace/socket-io/server/index';

export function initEditorSocketIO(httpServer: Parameters<typeof initSocketIOServer>[0]) {
    const io = initSocketIOServer(httpServer);

    io.on('connection', function (socket: Socket) {
        console.log('[SOCKET]: Client connected');

        socket.on('data_changed', (...args) => ioServerHandleEvent(io, 'data_changed', ...args));
        socket.on('mode_changed', (...args) => ioServerHandleEvent(io, 'mode_changed', ...args));
        socket.on('update_system', (...args) => ioServerHandleEvent(io, 'update_system', ...args));
        socket.on('file_uploaded', (...args) => ioServerHandleEvent(io, 'file_uploaded', ...args));
    });

    return io;
}
