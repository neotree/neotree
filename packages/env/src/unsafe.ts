import "dotenv/config";
import { config } from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';

const paths = ['.env.local'];

if (dev) paths.push('.env.development');

paths.forEach(path => {
    try {
        config({ path, });
    } finally {
        // do nothing
    }
});
