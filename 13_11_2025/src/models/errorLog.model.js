const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  message: String,
  code: Number,
  stack: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ErrorLog", errorLogSchema);
