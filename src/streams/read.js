import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath);

        const readableStream = createReadStream(filePath);

        await pipeline(
            readableStream,
            process.stdout,
            { end: false }
        );

        process.stdout.write('\n');
        process.stdout.end();
    } catch (error) {
        throw new Error('Failed to read file');
    }
};

await read();