import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(__dirname, 'files', 'fileToWrite.txt');

    try {
        const writableStream = createWriteStream(filePath);

        console.log('Ready for input. Press Ctrl+C to stop.');

        await pipeline(process.stdin, writableStream);

        console.log('Finished writing to file.');

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
};

await write();