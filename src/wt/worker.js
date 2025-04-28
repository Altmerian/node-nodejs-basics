import { parentPort, workerData } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (result) => {
    parentPort.postMessage(result);
};

// Listen for messages from the main thread
parentPort.on('message', (n) => {
    try {
        const result = nthFibonacci(n);
        sendResult({ status: 'resolved', data: result });
    } catch (error) {
        sendResult({ status: 'error', data: null });
    }
});
