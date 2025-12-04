const AccessLog = require("../models/accessLog.model");

module.exports = async (req, res, next) => {
  res.on("finish", async () => {
    await AccessLog.create({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      ip: req.ip,
    });
  });

  next();
};
