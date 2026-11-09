
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {

    // Serve HTML page
    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, "html", "index.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }

    // Handle contact form
    if (req.method === "POST" && req.url === "/contact") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const contact = JSON.parse(body);

                if (!contact.name || !contact.email || !contact.message) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        message: "Please fill all fields"
                    }));

                    return;
                }

                console.log("New Contact Message:");
                console.log(contact);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Message received successfully!"
                }));

            } catch (error) {
                res.writeHead(400);
                res.end("Invalid request");
            }
        });

        return;
    }

    // Serve CSS and JavaScript
    const filePath = path.join(__dirname, req.url);

    const allowedFiles = {
        "/css/style.css": "text/css",
        "/js/script.js": "text/javascript"
    };

    if (allowedFiles[req.url]) {

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("File not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": allowedFiles[req.url]
            });

            res.end(data);
        });

        return;
    }

    res.writeHead(404);
    res.end("Page Not Found");

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
