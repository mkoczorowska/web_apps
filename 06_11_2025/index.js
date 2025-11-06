import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kontakt'
});

db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych MySQL.');
    }
});

const sendHTML = (res, file) => {
  res.sendFile(path.join(__dirname, 'htmlFiles', file));
};

app.get('/', (req, res) => sendHTML(res, 'main.html'));
app.get('/o-nas', (req, res) => sendHTML(res, 'o-nas.html'));
app.get('/oferta', (req, res) => sendHTML(res, 'oferta.html'));
app.get('/kontakt', (req, res) => sendHTML(res, 'kontakt.html'));

app.post('/kontakt', (req, res) => {
  console.log('--- Nowa wiadomość kontaktowa ---');
  console.log(`Imię: ${req.body.imie}`);
  console.log(`Nazwisko: ${req.body.nazwisko}`);
  console.log(`Email: ${req.body.email}`);
  console.log(`Wiadomość: ${req.body.wiadomosc}`);
  console.log('-----------------------------------');

  const sql = 'INSERT INTO messages (imie, nazwisko, email, wiadomosc) VALUES (?, ?, ?, ?)';
  db.query(sql, [req.body.imie, req.body.nazwisko, req.body.email, req.body.wiadomosc], (err, result) => {
      if (err) {
          console.error('Błąd przy zapisie do bazy:', err);
          return res.status(500).send('Błąd serwera.');
      }
      console.log('Wiadomość zapisana do bazy, ID:', result.insertId);
      res.redirect('/');
  });
});

app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('Błąd przy pobieraniu danych:', err);
            return res.status(500).json({ error: 'Błąd serwera.' });
        }
        res.json(results);
    });
});

app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Błąd przy pobieraniu wiadomości:', err);
            return res.status(500).json({ error: 'Błąd serwera.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID.' });
        }
        res.json(results[0]);
    });
});

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
