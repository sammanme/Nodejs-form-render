// Import required modules
const { createServer } = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

// Load initial data from the JSON file
let data = [];
const dbFilePath = path.join(__dirname, "database.json");
fs.readFile(dbFilePath, (err, jsonData) => {
    if (!err) {
        data = JSON.parse(jsonData);
    }
});

// Function to handle form submissions
const handleFormSubmission = (formData, res) => {
    // Add the submitted data to the existing data array
    data.push(formData);

    // Write updated data to the JSON file
    fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error writing to JSON file:", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            console.log("Data saved to JSON file successfully!");

            // Send a JSON response indicating success
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Form submitted successfully' }));
        }
    });
};

// Function to serve static files (HTML, CSS, JavaScript)
const serveStaticFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(fileData);
        }
    });
};

const server = createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            // Serve HTML file
            serveStaticFile(res, path.join(__dirname, "index.html"), "text/html");
        } else if (req.url === "/index.css") {
            // Serve CSS file
            serveStaticFile(res, path.join(__dirname, "index.css"), "text/css");
        } else if (req.url === "/script.js") {
            // Serve JavaScript file
            serveStaticFile(res, path.join(__dirname, "script.js"), "text/javascript");
        } else if (req.url === "/data") {
            // Serve JSON data
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            // For other routes, send a 404 Not Found response
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else if (req.method === "POST" && req.url === "/") {
        // Initialize body variable to store the request body
        let body = '';

        // Collect data from the request body
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When all data is received, parse the form data and handle the submission
        req.on('end', () => {
            try {
                // Attempt to parse as JSON
                const formData = JSON.parse(body);
                handleFormSubmission(formData, res);
            } catch (jsonError) {
                // If parsing as JSON fails, attempt to parse as form-urlencoded
                const formData = querystring.parse(body);
                handleFormSubmission(formData, res);
            }
        });
    } else {
        // For other methods or routes, send a 405 Method Not Allowed response
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(3000, "localhost", () => {
    console.log('Server is running at http://localhost:3000');
});
