let http = require('http');
let fs = require('fs').promises;
let url = require('url');
let path = require('path');
let mime = require('mime-types');

http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    switch (parsedUrl.pathname) {
        case "/":
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("main page");
            break;

        case "/json":
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({
                message: "document json",
                version: "1.0",
                status: "ok"
            }));
            break;

        case "/html":
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(`
                <!DOCTYPE html>
                <html>
                <head><meta charset="utf-8"><title>HTML</title></head>
                <body>
                    <h1>html genereted in node</h1>
                </body>
                </html>
            `);
            break;

        case "/file":
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            const file = await fs.readFile("page.html", "utf-8");
            res.end(file.toString());
            break;

        case "/get_params":
            if(req.method === "GET"){
                try {
                    console.log(parsedUrl);
                    const queryParams = parsedUrl.query;
                    console.log(queryParams);
                    const timeStamp = Date.now();
                    console.log(timeStamp);
                    const filename = `params_${timeStamp}.json`;
                    await fs.writeFile(filename, JSON.stringify(queryParams), { encoding: 'utf8' });
                    const ok = {ok: 'ok'}
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(ok));
                } catch (error) {
                    console.error("Error writing params file:", error);
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ error: 'Failed to save parameters' }));
                }
            }
            break;

        default:
            try {
                const filePath = path.join(__dirname, "assets", parsedUrl.pathname);
                const data = await fs.readFile(filePath);
                const mimeType = mime.lookup(filePath) || 'application/octet-stream';

                res.writeHead(200, { 'Content-Type': `${mimeType}; charset=utf-8` });
                res.end(data);
            }
            catch (err) {
                res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    error: "File not found",
                    path: parsedUrl.pathname,
                    status: 404
                }));
            }
    }
}).listen(8080);
