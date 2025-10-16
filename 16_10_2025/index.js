const express = require('express')
const path = require("node:path");

const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('main page')
})

app.get('/json', (req, res) => {
    res.json({
        message: "document json",
        version: "1.0",
        status: "ok"
    })
})

app.get('/html', (req, res) => {
    res.send(`
                <!DOCTYPE html>
                <html>
                <head><meta charset="utf-8"><title>HTML</title></head>
                <body>
                    <h1>html genereted in node</h1>
                </body>
                </html>
            `);
})

app.get("/file", async (req, res) => {
    try {
        const file = await fs.readFile("page.html", "utf-8");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(file);
    } catch (err) {
        console.error("Error reading page.html:", err);
        res.status(500).json({ error: "Failed to load file" });
    }
});

app.get("/get_params", async (req, res) => {
    try {
        console.log(req.query);
        const timeStamp = Date.now();
        const filename = `params_${timeStamp}.json`;

        await fs.writeFile(filename, JSON.stringify(req.query), { encoding: "utf8" });
        res.json({ ok: "ok" });
    } catch (error) {
        console.error("Error writing params file:", error);
        res.status(500).json({ error: "Failed to save parameters" });
    }
});

app.use(express.static(path.join(__dirname, "assets")));

app.use((req, res) => {
    res.status(404).json({
        error: "File not found",
        path: req.path,
        status: 404,
    });
});

app.listen(port, () => {
    console.log("App listening at http://localhost:" + port)
})