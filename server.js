const express = require('express'); // Import the Express framework
const pageRouter = require('./routes/pages'); // Import the page routes module
const app = express(); // Create an instance of an Express application
const noteRoutes = require('./routes/notes'); // Import the note routes module
const PORT = process.env.PORT || 1000; // Set the port number form the environment variable or default to 10000

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({extended: true})); // Middleware to parse URL-encoded data
app.use(express.static('public')); // Middleware to serve static files form the 'public' directory

app.use(noteRoutes); // Use the routes defined in the 'noteRoutes' module, which contans route handlers for various endpoints related to notes. This means any HTTP requests that match the routes defined in 'noteRoutes' will be handled by the corresponding route handlers iin that module
app.use('/', pageRouter); // Use the routes deinfed in the 'pageRouter' module for handling request to the root path('/') and potentially any other paths. (Homepage)


app.listen(PORT, () => { // Start the server and listen on the specified port
  console.log(`Server started on http://localhost:${PORT}`) // Log a message indicating the server has started
})
