// Setting and Getting our data

const router = require('express').Router();
const fs = require('fs')

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            throw err
        }
        console.log(data)
        res.send(data)
    })
})

router.post('/api/notes', (req, res) => {
// It's coming from the req.body
console.log(req.body)
// fs write to file

    })

module.exports = router