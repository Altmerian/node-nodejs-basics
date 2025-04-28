import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import FileOperationError from './error.js';

const read = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const fileToReadPath = join(__dirname, 'files', 'fileToRead.txt');

    try {
        const content = await readFile(fileToReadPath, { encoding: 'utf8' });
        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`File does not exist: ${fileToReadPath}`);
        } else {
            console.error(`Failed to read file: ${err.message}`);
        }
        throw new FileOperationError('FS operation failed', { cause: err });
    }
};

await read();