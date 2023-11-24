const sendErrorDev = (err, resp) => {
  resp.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const sendErrorProd = (err, resp) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    resp.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

  // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.log('ERROR', err);

    // 2) Send generic message
    resp.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
}

module.exports = (err, req, resp, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || `error`;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, resp);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, resp);
  }
};