const express = require("express");
const User = require("../models/User");
const router = express.Router()
let session


router.get('/', (req, res) => {
    res.render('index');
  });
  
  router.get('/registreren', (req, res) => {
    res.render('registreren');
  });
  
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


  module.exports = router