const sendFail = (res, msg, statusCode = 400) =>
  res.status(statusCode).json({
    status: 'fail',
    message: msg,
  });

const sendSuccess = (res, data, statusCode = 200) =>
  res.status(statusCode).json({
    status: 'success',
    data,
  });

export { sendFail, sendSuccess };
