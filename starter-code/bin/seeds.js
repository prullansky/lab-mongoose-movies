const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity')

mongoose.connect('mongodb://localhost/library-project', {
  useNewUrlParser: true
});

const celebrities = [
    {
        name:'Jennifer Lopez',
        occupation: 'Singer',
        catchPhrase: 'I like tacos and burritos.'
    }, 
    {
        name:'Elon Musk',
        occupation: 'Transhuman',
        catchPhrase: 'My son´s name is XNWDSFMWSEFACWSZDF2.'
    },
    {
        name:'Kanye West',
        occupation: 'God',
        catchPhrase: 'From ma ass they come contemporary fARTs.'
    }
];

Celebrity.create(celebrities)
.then( data => {
console.log('Data added succesfully');
mongoose.connection.close();
})
.catch( err => console.log('ERROR'));