import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import FileOperationError from './error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await writeFile(filePath, content, { flag: 'wx' });
    } catch (error) {
        throw new FileOperationError('FS operation failed');
    }
};

await create();