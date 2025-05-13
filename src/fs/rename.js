import { rename as fsRename, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import FileOperationError from './error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesDir = join(__dirname, 'files');
const sourceFilename = 'wrongFilename.txt';
const destinationFilename = 'properFilename.md';

const sourceFilePath = join(filesDir, sourceFilename);
const destinationFilePath = join(filesDir, destinationFilename);

// Helper async function to check file status
async function _checkFileExists(filePath) {
    try {
        await stat(filePath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        console.error(`Error checking file status for ${filePath}:`, err);
        throw err;
    }
}

const rename = async () => {
    try {
        const sourceExists = await _checkFileExists(sourceFilePath);
        const destinationExists = await _checkFileExists(destinationFilePath);

        if (!sourceExists) {
            const errMsg = `Source file does not exist: ${sourceFilePath}`;
            console.error(errMsg);
            throw new FileOperationError(errMsg);
        }
        if (destinationExists) {
            const errMsg = `Destination file already exists: ${destinationFilePath}`;
            console.error(errMsg);
            throw new FileOperationError(errMsg);
        }

        await fsRename(sourceFilePath, destinationFilePath);
        console.log(`Successfully renamed ${sourceFilename} to ${destinationFilename}`);

    } catch (error) {
        if (!(error instanceof FileOperationError)) {
            console.error('An unexpected error occurred during the rename operation:', error);
        }
        throw new Error('FS operation failed', { cause: error });
    }
};

await rename();