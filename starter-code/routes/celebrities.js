const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res) => {
    console.log('Im getting the route');
    // get all the celebrities from the database
    Celebrity.find()
    .then(celebrities => {
      // render a celebrity view to display them
      console.log(celebrities);
      res.render('celebrities/index', { celebrities })
    })
    .catch(err => console.log(err))
});

router.get('/celebrities/new', (req, res) => {
        res.render('celebrities/new');
});

router.get('/celebrities/:id', (req, res) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => {
        res.render('celebrities/show', { celebrity }) 
    })
        .catch(err =>{
        console.log(err) 
        })
});

router.get('/celebrities/:id/edit', (req, res) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
        res.render('celebrities/edit', {celebrity}) 
    })
    .catch(err =>{
        console.log(err)
    })
});


router.post('/celebrities', (req,res) =>{
    // const name = req.body.name;
    // const occupation = req.body.occupation;
    // const catchphrase = req.body.catchphrase;

    const {name, occupation, catchPhrase} = req.body;
    console.log(name, occupation, catchPhrase);

    Celebrity.create({
        name, 
        occupation, 
        catchPhrase
    })
    .then (celebrity => {
        console.log(`${celebrity.title} was created!`)
        res.redirect(`/celebrities/${celebrity._id}`)

    })
})

router.post('/celebrities/:id/delete', (req, res) => {
    Celebrity.findByIdAndRemove(req.params.id)
        .then(celebrity => {
        res.render('celebrities/', { celebrity }) 
    })
        .catch(err =>{
        console.log(err) 
        })
})

router.post('/celebrities/:id', (req, res) => {

    const {name, occupation, catchPhrase} = req.body;

    Celebrity.findByIdAndUpdate(req.params.id,{
        name, 
        occupation, 
        catchPhrase
    })
    .then(celebrity => {
        res.redirect('/celebrities');
    })
    .catch(err => {
        console.log(err);
    })

})



module.exports = router;