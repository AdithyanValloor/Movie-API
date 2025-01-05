const express = require('express')

const path = require('path')

const port = 3000

const MoviesRouter = require('./Router/MoviesRouter')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/index.html'))
})

app.use('/movies', MoviesRouter)

app.listen(port, () => console.log('server started'))