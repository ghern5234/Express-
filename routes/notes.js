const router = require('express').Router();
const fs = require('fs')
const uuidv1 = require('uuidv1')

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            throw err
        }
        console.log(data)
        const parsedData = JSON.parse(data) 
        res.json(parsedData)
    })
})

router.delete('/api/notes/:id', (req, res) => { 
  fs.readFile('./db/db.json', (err, data) => {
    if(err){
        throw err
    }
    const dataArray = JSON.parse(data)

    for(i = 0; i < dataArray.length; i++) {
      if(dataArray[i].id == req.params.id){
        dataArray.splice(i, 1)
      }
    }

    fs.writeFile('./db/db.json', JSON.stringify(dataArray), (err)  => {
        if(err){
            throw err
        }
        res.json("Success!")
    })
})

})

router.post('/api/notes/', (req, res) => {
      const id = uuidv1()
      const { title, text } = req.body
      const newNote = { title, text, id: id }
      console.log(newNote)
      
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            throw err
        }
        const dataArray = JSON.parse(data)
        dataArray.push(newNote)
        fs.writeFile('./db/db.json', JSON.stringify(dataArray), (err)  => {
            if(err){
                throw err
            }
            res.json("Success!")
        })
    })
    
    })

module.exports = router