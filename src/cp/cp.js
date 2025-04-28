import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = (args) => {
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'] // stdin, stdout, stderr
    });

    // Wire up the bidirectional pipe (parent ↔ child)
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    // Resolve once the child exits so callers can await it
    return new Promise((resolve, reject) => {
        child.once('exit', (code) => resolve(code));
        child.once('error', reject);
    });
};

const inputArgs = process.argv.slice(2);

spawnChildProcess(inputArgs).then((code) => {
    console.log(`Child process exited with code ${code}`);
}).catch((err) => {
    console.error('An error occurred in the child process:', err);
});
