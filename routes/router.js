const express = require("express")
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
        res.render('profielpagina', {'title': 'Profielpagina | Cheers'});
        console.log(req.session)
    }
  });

  module.exports = router