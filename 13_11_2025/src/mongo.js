const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogLogs");

mongoose.connection.on("connected", () => {
  console.log("Połączono z MongoDB (blogLogs)");
});

mongoose.connection.on("error", (err) => {
  console.error("Błąd MongoDB:", err);
});
