const responseStatus = require("../constants/response.status");

const success = (res, message, data) => {
  return res.status(200).json({
    status: responseStatus.success,
    message,
    data,
  });
};

const ok = (res, message, data = null) => {
  return res.status(200).json({
    status: responseStatus.success,
    message,
    data,
  });
};

const error = (res, message, data = null) => {
  return res.status(200).json({
    status: responseStatus.error,
    message,
    data,
  });
};

const created = (res, message, data = null) => {
  return res.status(201).json({
    status: responseStatus.success,
    message,
    data,
  });
};

const accepted = (res, message, data = null) => {
  return res.status(202).json({
    status: responseStatus.success,
    message,
    data,
  });
};

const updated = (res, message, data = null) => {
  // if(!data) {
  //     throw
  // }
  return success(res, message, data);
};
