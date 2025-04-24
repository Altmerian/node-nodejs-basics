import { cp, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDirName = 'files';
const destDirName = 'files_copy';

const sourcePath = join(__dirname, sourceDirName);
const destinationPath = join(__dirname, destDirName);

const copy = async () => {
    try {
        // Check if source directory exists
        const stats = await stat(sourcePath);

        // Perform the copy operation, throwing an error if destination exists
        await cp(sourcePath, destinationPath, { recursive: true, errorOnExist: true, force: false });
        console.log(`Successfully copied ${sourcePath} to ${destinationPath}`);

    } catch (error) {
        if (error.code === 'ENOENT' && error.path === sourcePath) {
            console.error(`Source directory ${sourcePath} does not exist`);
        } else if (error.code === 'ERR_FS_CP_EEXIST') {
            console.error(`Destination directory ${destinationPath} already exists`);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw new Error('FS operation failed');
    }
};

await copy();
