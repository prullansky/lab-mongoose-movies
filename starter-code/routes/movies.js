const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies/new', (req, res) => {
    console.log('Lets create a movie');
    Celebrity.find()
    .then(celebrities => {
        console.log('second step')
        res.render('movies/new', {celebrities});
    })
    .catch(err => console.log(err))   
})

router.get('/movies', (req, res) => {
    Movie.find()
    .then(movies => {
        res.render('movies/index', {movies});
    })
    .catch(err => console.log(err))   
})


router.post('/movies', (req, res) => {

    const {title, genre, plot, cast} = req.body;
    console.log(title, genre, plot, cast);

    Movie.create({
        title, 
        genre, 
        plot,
        cast
    })
    .then (movie => {
        console.log(`${movie.title} was created!`)
        res.redirect('/movies')
    })
    .catch (err => {
        console.log(err)
    })
})

router.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        res.render('movies/edit', {movie}) 
    })
    .catch(err =>{
        console.log(err)
    })
});

router.post('/movies/:id', (req, res) => {

    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(req.params.id,{
        title, 
        genre, 
        plot, 
        cast
    })
    .then(movie => {
        res.redirect('/movies');
    })
    .catch(err => {
        console.log(err);
    })

})

module.exports = router;