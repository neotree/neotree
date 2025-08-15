import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default (phase) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        distDir: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "build",
        transpilePackages: [
            "@workspace/ui",
            "@workspace/env",
            "@workspace/editor-db",
            "@workspace/socket.io",
        ],
        images: {
            domains: [
                "localhost",
                "webeditor.neotree.org",
                "webeditor-dev.neotree.org",
                "zim-webeditor.neotree.org:10243",
                "zim-webeditor.neotree.org",
                "demo-webeditor.neotree.org",
                "zim-dev-webeditor.neotree.org:10243",
                "zim-dev-webeditor.neotree.org",
                "zim-dev-nodeapi.neotree.org",
                "nodeapi.neotree.org",
                "nodeapi-dev.neotree.org",
                "zim-nodeapi.neotree.org",
                "demo-nodeapi.neotree.org",
            ],
        },
        rewrites: () => [
            // map old API endpoints to new ones, will delete when all the devices are up to date!
            { source: "/file/:fileId", destination: "/api/files/:fileId" },
            { source: "/files/:fileId", destination: "/api/files/:fileId" },
            {
                source: "/check-email-registration",
                destination: "/api/check-email-registration",
            },
            { source: "/sign-in", destination: "/api/sign-in" },
            { source: "/sign-up", destination: "/api/sign-up" },
            {
                source: "/get-device-registration",
                destination: "/api/get-device-registration",
            },
            {
                source: "/update-device-registration",
                destination: "/api/update-device-registration",
            },
        ],
        async headers() {
            return [
                {
                    source: "/api/(.*)",
                    headers: [
                        {
                            key: "Access-Control-Allow-Origin",
                            value: "*",
                        },
                        {
                            key: "Access-Control-Allow-Methods",
                            value: "GET, POST, PUT, DELETE, OPTIONS",
                        },
                        {
                            key: "Access-Control-Allow-Headers",
                            value: "Content-Type, Authorization",
                        },
                        {
                            key: "Content-Range",
                            value: "bytes : 0-9/*",
                        },
                    ],
                },
            ];
        },
    };

    return nextConfig;
};
