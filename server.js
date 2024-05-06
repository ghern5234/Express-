const express = require('express');
const pageRouter = require('./routes/pages');
const app = express(); // 
const noteRoutes = require('./routes/notes') //Imports routes from notes.js
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(noteRoutes)
app.use('/', pageRouter)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
