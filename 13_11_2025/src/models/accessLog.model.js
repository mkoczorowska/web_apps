const mongoose = require("mongoose");

const accessLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  statusCode: Number,
  ip: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AccessLog", accessLogSchema);
