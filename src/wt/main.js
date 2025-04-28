import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workerPromises = [];
    const startNum = 10;

    console.log(`Creating ${numCores} worker threads...`);

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(workerPath);
        const currentNum = startNum + i;

        const promise = new Promise((resolve, reject) => {
            worker.on('message', (result) => {
                resolve(result);
            });
            worker.on('error', (error) => {
                resolve({ status: 'error', data: null });
            });
            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });

        worker.postMessage(currentNum);
        workerPromises.push(promise);
    }

    const settledResults = await Promise.all(workerPromises);

    console.log(settledResults);
};

await performCalculations();