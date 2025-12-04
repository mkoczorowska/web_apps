const ErrorLog = require("../models/errorLog.model");

/* eslint-disable no-unused-vars */
module.exports = async (err, req, res, next) => {
  await ErrorLog.create({
    message: err.message,
    code: err.statusCode || 500,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    error: err.message || "Błąd serwera"
  });
};
