import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));

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

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
