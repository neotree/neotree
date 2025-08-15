namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        NEOTREE_ENV: string;
        HOSTNAME: string;
        DEBUG: boolean;
        DB_LOGGING: boolean;
        PORT: string;
        POSTGRES_DB_URL: string;
        SESSION_POSTGRES_DB_URL: string;
        MAIL_MAILER: string;
        MAIL_HOST: string;
        MAIL_PORT: string;
        MAIL_USERNAME: string;
        MAIL_PASSWORD: string;
        MAIL_ENCRYPTION: string;
        MAIL_FROM_ADDRESS: string;
        MAIL_FROM_NAME: string;
        NEXT_PUBLIC_APP_NAME: string;
        NEXT_PUBLIC_APP_URL: string;
        NEXTAUTH_SECRET: string;
        JWT_SECRET: string;
        API_KEY: string;
    }
}
