class FileOperationError extends Error {
  constructor(message, options = {}) {
    super(message, options);
    this.name = 'FileOperationError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FileOperationError);
    }
  }
}

export default FileOperationError; 