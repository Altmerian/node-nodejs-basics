import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFilePath = join(__dirname, 'files', 'fileToCompress.txt');
const destinationFilePath = join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destinationFilePath);

    try {
        await pipeline(readableStream, createGzip(), writableStream);
        console.log('File compressed successfully.');
    } catch (error) {
        console.error('Compression failed:', error);
    }
};

await compress();