const pageRouter = require('express').Router();
const path = requrie('path');


pageRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

pageRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/noter.html"))
})

module.exports = { pageRouter }