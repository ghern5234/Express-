const router = require('express').Router(); // Import the Express router to handle route defnition
const fs = require('fs') // Import the file system module to read and write files
const uuidv1 = require('uuidv1') // Import the uuidcv1 module to generate unique IDs

// Route to get all notes
router.get('/api/notes', (req, res) => {
    // Read the notes from the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            throw err // If there is an error reading the rile, throw an error
        }
        
        const parsedData = JSON.parse(data) // Parse the JSON data from the file
        res.json(parsedData) // Send the parsed data as a JSON response
    })
})

// Route to delete a note by its ID
router.delete('/api/notes/:id', (req, res) => { 
  // Read the notes from the db.json file
  fs.readFile('./db/db.json', (err, data) => {
    if(err){
        throw err // Throw an error if there is an issue reading the file
    }
    const dataArray = JSON.parse(data) // Parse the JSON data from the file into an array

    // Find the note with the matching ID and remove it
    for(i = 0; i < dataArray.length; i++) {
      // Remove the note from the array  
      if(dataArray[i].id == req.params.id){ 
        // Exit  the loop once the note is found and removed
        dataArray.splice(i, 1)
      }
    }
    // Write the updated notes array back to the db.json file
    fs.writeFile('./db/db.json', JSON.stringify(dataArray), (err)  => {
        if(err){
            throw err // Throw an error if there is an issue writing the file
        }
        res.json("Success!") // Send a success message as a JSON response
    })
})
})


// Route for posting a new note
router.post('/api/notes/', (req, res) => {
      const id = uuidv1() // Generate a unique ID for the new note.
      const { title, text } = req.body // Extract title and text from the request body.
      const newNote = { title, text, id: id } // Create a new note object with the extracted data and generated ID for data consistency. 
      // Also prepares a complete and structured piece of data to be stored in the database.
    
    // Read the notes form the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            throw err // Throw an error if there is an issue reaading the file
        }
        const dataArray = JSON.parse(data) // Parse the JSON data from the file
        dataArray.push(newNote) // Add the new note to the array

        // Write the updated notes array back to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(dataArray), (err)  => {
            if(err){
                throw err // Throw an error if there is an issue writing the file
            }
            res.json("Success!") // Log a success message if there is no error
        })
    })
    
    })

module.exports = router; // Export the router to be used in other parts of the application