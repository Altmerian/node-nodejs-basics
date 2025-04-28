import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFilePath = join(__dirname, 'files', 'archive.gz');
const destinationFilePath = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destinationFilePath);

    try {
        await pipeline(readableStream, createGunzip(), writableStream);
        console.log('File decompressed successfully.');
    } catch (error) {
        console.error('Decompression failed:', error);
    }
};

await decompress();