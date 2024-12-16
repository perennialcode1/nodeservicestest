const logger = require('../helpers/logger');
const AppError = require('../Models/AppErrorMdl');

const errorHandler = (err, req, res, next) => {
  // If it's an operational error (known error), use its details
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // If it's a programming or other unknown error, don't leak details to the client
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    });
  }
};

module.exports = errorHandler;