import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import FileOperationError from './error.js';

const list = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const filesFolderPath = join(__dirname, 'files');

    try {
        const filenames = await readdir(filesFolderPath);
        console.log(filenames);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Directory does not exist: ${filesFolderPath}`);
        } else {
            console.error(`Failed to read directory: ${err.message}`);
        }
        throw new FileOperationError('FS operation failed', { cause: err });
    }
};

await list();