import express from 'express';
import infoRouter from './routes/infoRouter.js';
import booksRouter from "./routes/booksRouter.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', infoRouter);
app.use('/books', booksRouter);
app.use('/', booksRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})