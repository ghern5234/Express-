//This page sets up a basic router to handle HTTP GET requests to specific endpoints and serves static HTML files in response.

//Imports the 'Router' object from the 'express' library and assigns it to pageRouter. This allows us to definre routes for the application
const pageRouter = require("express").Router();
//Imports the 'path' module from Node.js, which provides utlities for working with file and directory paths.
const path = require("path");


pageRouter.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
//Route Handling: The code defines two routes, specifying the behavior when these routes are accessed via HTTP GET requests when someone visits '/'
pageRouter.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

module.exports = pageRouter;


