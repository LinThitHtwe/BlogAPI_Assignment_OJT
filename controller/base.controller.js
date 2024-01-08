const responseStatus = require("../constants/response.status");
const dbErrorMessages = require("../constants/db.error");
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

const retrieved = (res, name, data = null) => {
  if (!data) {
    throw itemNotFoundError(dbErrorMessages.itemNotFound);
  }
  return success(res, name, data);
};

const updated = (res, name, data = null) => {
  if (!data) {
    throw itemNotFoundError(name);
  }
  return success(res, name, data);
};

module.exports = {
  success,
  ok,
  error,
  created,
  accepted,
  retrieved,
  updated,
};
