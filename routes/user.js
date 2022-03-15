const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bodyparser = require("body-parser")
router.use(bodyparser.urlencoded({extended:true}))
const bcrypt = require("bcrypt")
const saltRounds = 10
let session


router.post ('/inloggen', async (req, res) => {
    try {
      const checkuser = await User.findOne({ username: req.body.username });
      if (checkuser) {
        const vergelijkwachtwoord = await bcrypt.compare(req.body.password, checkuser.password);
        if (vergelijkwachtwoord) {
          console.log("Inloggen voltooid!")
          session = req.session 
          session.username = req.body.username
          res.redirect("/profielpagina")
        } else {
          console.error("Foute gebruikersnaam of wachtwoord")
        }
      } else {
        console.error("Foute gebruikersnaam of wachtwoord")
      }
    } catch (error) {
      console.error(error);
    }
  })
  
  router.post ('/registreren' , async (req, res) => {
    console.log('De gegevens zijn succesvol opgehaald')
    const wachtwoord = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      password: wachtwoord
    });
  
    newUser.save((error) => {
      if (error) {
        console.log(error);
        return res.status(500).redirect('/registreren');
      }
      return res.status(200).redirect('/');
  });
  });

  router.post('/uitloggen', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/profiel', (req, res) => {
    console.log(req.body.username)
    User.find({ username: req.body.username }).remove().exec();
    res.redirect('/');
});

  module.exports = router