require("./mongo");

const express = require('express');

const kategoriaRouter = require("./routers/kategoria.router");
const wpisRouter = require("./routers/wpis.router");
const komentarzRouter = require("./routers/komentarz.router");

const accessLogger = require("./middlewares/accessLogger");
const errorHandler = require("./middlewares/errorHandler");

const app = express()

app.use(express.json());

app.use(accessLogger);

app.use("/kategorie", kategoriaRouter);
app.use("/wpisy", wpisRouter);
app.use("/komentarze", komentarzRouter);

app.get("/", (req, res) => {
  res.send("Blog backend działa.");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
