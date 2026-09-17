import http from 'http';
import { writeFile, readFile } from 'fs/promises';
import {parse} from 'url';

const port = 3000;
const server = http.createServer(async (req, res) => {
    const url = req.url;
    if(url === '/'){
        res.statusCode = 200;
        const html = await readFile('public/index.html');
        res.setHeader('content-type', 'text/html');
        res.write(html);
        res.end();
    }
    if(url === '/css/style.css'){
        res.statusCode = 200;
        const css = await readFile('public/css/style.css');
        res.setHeader('content-type', 'text/css');
        res.write(css)
        res.end();
    }
    if(url === '/kontakt'){
        res.statusCode = 200;
        const html = await readFile('public/contact.html');
        res.setHeader('content-type', 'text/html');
        res.write(html);
        res.end();
    }
    if(url.startsWith('/kontakt?')){
        const adress = 'http://localhost:' + port + url;
        const query = parse(adress, true);
        const json = query.query;
        res.setHeader('content-type', 'application/json');
        const timestamp = Date.now();
        await writeFile(`message_${timestamp}.json`, JSON.stringify(json))

        res.statusCode = 302;
        res.setHeader('Location', '/');

        res.end();
    }

})

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})