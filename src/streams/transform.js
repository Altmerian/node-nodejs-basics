import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const reversedChunk = [...String(chunk)].reverse().join('');
        this.push(reversedChunk);
        callback();
    }
}

const transform = async () => {
    const reverseStream = new ReverseTransform();

    console.log('Ready for input. Input will be reversed. Press Ctrl+C to stop.');

    try {
        await pipeline(
            process.stdin,
            reverseStream,
            process.stdout,
            { end: false }
        );
        process.stdout.write('\n');
        process.stdout.end();
    } catch (error) {
        console.error(`Pipeline failed: ${error.message}`);
    }
};

await transform();