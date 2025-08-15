import { Server } from 'socket.io';

export function ioServerHandleEvent(io: Server, eventName: string, ...args: any[]) {
    const cb = args.filter(arg => typeof arg === 'function')[0];
    args = args.filter(arg => typeof arg !== 'function');
    io.emit(eventName, ...args);
    if (cb) cb({ status: 'ok', });
}
