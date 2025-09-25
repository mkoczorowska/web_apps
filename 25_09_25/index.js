let http = require('http');
let fs = require('fs').promises;

http.createServer(async (req, res) => {

    switch (req.url) {
        case "/":
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("strona główna");
            break;

        case "/json":
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({
                message: "dokument json",
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
                    <h1>html generowany w nodzie</h1>
                </body>
                </html>
            `);
            break;

        case "/file":
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            const file = await fs.readFile("page.html", "utf-8");
            res.end(file.toString());
            break;

        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("Error: Page not found");
    }
}).listen(8080);
