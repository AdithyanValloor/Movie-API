const express = require('express')

const {moviesList} = require('../MoviesList')

const router = express.Router()

router.get('/',(req, res) => {

    res.status(200).send(moviesList)

})

router.get('/:id', (req, res) => {

    try {
        
        const movieId = parseInt(req.params.id)
        const movie = moviesList.find(m => m.id === movieId)
    
        if(!movie){
            res.status(404).json({message:"Movie not found"})
        }else{
            res.status(200).send(movie)
        }

    } catch (error) {
        res.status(400).json({error:error})
    }
})

router.post('/', (req, res) => {
    try {
        if(!req.body){
            res.status(400).json({message:`
                Required fields:    
            `})
        }

        const reqFields = ["title", "genre", "overview", "release_date", "rating", "rating_count" ]
        const missingFields = []

        reqFields.forEach(field => {
            if(!req.body[field]){
                missingFields.push(field)
            }
        })
        
        const {
            title,
            genre,
            overview,
            release_date,
            rating,
            rating_count
        } = req.body

        const newMovie = {
            id:moviesList.length ? moviesList[moviesList.length - 1].id + 1 : 1,
            title:title,
            genre:genre,
            overview:overview,
            release_date:release_date,
            rating:rating,
            rating_count:rating_count
        }
        
        if(missingFields.length > 0){
            res.status(404).json({message: `Required fields : ${missingFields.join(', ')}`})
        }

        moviesList.push(newMovie)
        res.status(200).json({message:"New movie added", newMovie})

    } catch (error) {
        res.status(404).json({message:`Required fields: title, genre, overview, release_date, rating, rating_count`})
    }
})

router.patch('/:id',(req, res) => {
    try {
        
        const movieId = parseInt(req.params.id)
        const movie = moviesList.find(m => m.id === movieId)

        if(!movie){
            res.status(404).json({message:"Movie not found"})
        }

        const reqFields = ["title", "genre", "overview", "release_date", "rating", "rating_count" ]
        const missingFields = []

        reqFields.forEach(field => {
            if(!req.body[field]){
                missingFields.push(field)
            }
        })

        const {
            title,
            genre,
            overview,
            release_date,
            rating,
            rating_count
        } = req.body

        movie.title = title;
        movie.genre = genre;
        movie.overview = overview;
        movie.release_date = release_date;
        movie.rating = rating;
        movie.rating_count = rating_count;

        if(missingFields.length > 0){
            res.status(404).json({message: `Required fields : ${missingFields.join(', ')}`})
        }

        res.status(200).json({message:"movie list updated", moviesList})

    } catch (error) {
        res.status(404).json({error:error})
    }
})

router.delete("/:id", (req, res) => {
    try {
        const movieId = parseInt(req.params.id)
        const movieIndex = moviesList.findIndex(m => m.id === movieId)
        
        if(movieIndex === -1){
            res.status(404).json({message:"Movie not found"})
        }

        moviesList.splice(movieIndex, 1)
        
        res.status(200).json({moviesList})

    } catch (error) {
        res.status(404).json({error:error})
    }
})

module.exports = router
