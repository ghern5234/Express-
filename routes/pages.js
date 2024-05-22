//This page sets up a basic router to handle HTTP GET requests to specific endpoints and serves static HTML files in response.
// The pageRouter module defines routes for serving static HTML files in response to HTTP GET requests. 
// When a request is made to the /notes path, the server responds by sending the 'notes.html' file, which is located in the 'public' directory.


const pageRouter = require("express").Router(); // Imports the 'Router' object from the 'express' library and assigns it to pageRouter to handle route definitions
const path = require("path"); // Imports the 'path' module to handle and transform file paths.

// Route to serve the notes.html file when the /notes path is called.
pageRouter.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html")); // Sends the notes.html file located in the ../public directory.
});


// Catch-all route to handle any other GET requests and serve the index.html file.
pageRouter.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html")); // Send the index.html file for any unsepcified routes.
  });

module.exports = pageRouter; // Export the pageRouter module to be used in other parts of the application.


