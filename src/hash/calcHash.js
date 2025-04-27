import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        const readableStream = createReadStream(filePath);
        const hashStream = createHash('sha256');

        await pipeline(readableStream, hashStream);

        const hexHash = hashStream.digest('hex');
        console.log(hexHash);
    } catch (error) {
        console.error(`Error calculating hash: ${error.message}`);
        throw new Error('Hash calculation failed');
    }
};

await calculateHash();