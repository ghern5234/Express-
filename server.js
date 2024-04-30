const express = require('express');
const pageRouter = require('./routes/pages')
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json)
app.use(express.urlencoded({extended: true}))
app.use('/', pageRouter)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})