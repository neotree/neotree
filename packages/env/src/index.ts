import "dotenv-safe/config";
import { config } from 'dotenv-safe';

const dev = process.env.NODE_ENV !== 'production';

const paths = ['.env.local'];

if (dev) paths.push('.env.development');

paths.forEach(path => {
    try {
        config({ path, allowEmptyValues: true, });
    } finally {
        // do nothing
    }
});
