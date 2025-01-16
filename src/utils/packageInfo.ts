import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getPackageDirectory() {
    // CommonJS
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }

    // ESM
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.url) {
        // @ts-ignore
        return dirname(fileURLToPath(import.meta.url));
    }

    throw new Error('Unable to determine the package directory');
}