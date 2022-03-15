const express = require("express");
const User = require("../models/User");
const router = express.Router()
let session

// router.get zorgt ervoor dat de pagina goed gelinkt wordt
router.get('/', (req, res) => {
    res.render('index');
  });
  
  router.get('/registreren', (req, res) => {
    res.render('registreren');
  });
  
  // de profielpagina is alleen toegankelijk als de gegevens kloppen en een session wordt gestart
  router.get('/profielpagina', (req, res) => {
    session = req.session;
    if (!session.username) {
        res.redirect('/');
    } else {
        User.find({ username: session.username }).then((documents) => {
        let username = documents.map(user => user.username);
        let email = documents.map(user => user.email);
        res.render('profielpagina', {'title': 'Profielpagina | Cheers', username: username, email: email});
        })
    }
  });

  router.get('/bierpagina', (req, res) => {
    res.render('bierpagina');
  });


  module.exports = router