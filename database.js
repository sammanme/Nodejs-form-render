const fs = require("fs");
const path = require("path");

// Load existing data from the JSON file
let existingData = [];
const filePath = path.join(__dirname, "database.json");

fs.readFile(filePath, (err, jsonData) => {
    if (!err) {
        existingData = JSON.parse(jsonData);
        appendData(existingData);
    } else {
        console.error("Error reading JSON file:", err);
    }
});

// Function to append new data to the JSON file
const appendData = (existingData) => {
    // Sample data to append to the JSON file
    const newData = [
        { 
            id: existingData.length + 1, // Increment the ID based on existing data length
            first_name: "Alice",
            last_name: "Johnson",
            other_name: "",
            email: "alice@example.com",
            phone_number: "12345678902",
            gender: "female"
        },
        // Add more data as needed
    ];

    // Append data to the JSON file
    fs.appendFile(filePath, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error("Error appending to JSON file:", err);
        } else {
            console.log("Data appended to JSON file successfully!");
        }
    });
};
