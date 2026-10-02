import express from 'express';
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksFile = path.join(__dirname, '/../data/books.json');

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(booksFile, "utf-8");
        const books = JSON.parse(data);

        res.json(books);
    }
    catch (error) {
        res.status(500).json({
            error: "Nie udało się odczytać książek"
        });
    }
});

router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '/../views/add.html'));
});

router.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(booksFile, 'utf-8');
        const books = JSON.parse(data);

        const newBook = {
            id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            year: Number(req.body.year)
        };

        books.push(newBook);

        await fs.writeFile(
            booksFile,
            JSON.stringify(books, null, 4),
            'utf-8'
        );

        res.sendFile(path.join(__dirname, '/../views/index.html'));
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: 'Nie udało się dodać książki'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await fs.readFile(booksFile, "utf-8");
        const books = JSON.parse(data);

        const id = Number(req.params.id);

        const book = books.find(book => book.id ===id);

        if (!book) {
            return res.status(404).json({
                error: "Nie znaleziono książki"
            });
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({
            error: "Nie udało się odczytać książek"
        });
    }
})
export default router;