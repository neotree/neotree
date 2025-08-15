import '@workspace/env';
import { createServer } from "node:http";
import next from "next";
import { parse } from 'url'
// import { initEditorSocketIO } from '@workspace/socket-io/server/editor';

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME;
const port = parseInt(process.env.PORT, 10);

const app = next({ 
    dev, 
    hostname, 
    port, 
    quiet: false, 
    turbo: true, 
    turbopack: true,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        handle(req, res, parsedUrl)
    });
    
    createServer(handle);

    // initEditorSocketIO(httpServer);

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
        });
});
