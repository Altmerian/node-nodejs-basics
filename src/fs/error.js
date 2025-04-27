class FileOperationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FileOperationError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileOperationError);
    }
  }
}

export default FileOperationError; 