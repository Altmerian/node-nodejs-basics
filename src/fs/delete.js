import { unlink } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import FileOperationError from './error.js';

const remove = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToRemovePath = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await unlink(fileToRemovePath);
        console.log(`Successfully removed file: ${fileToRemovePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`File does not exist: ${fileToRemovePath}`);
        } else {
            console.error(`Unlink operation failed: ${err.message}`);
        }
        throw new FileOperationError('FS operation failed');
    }
};

await remove();