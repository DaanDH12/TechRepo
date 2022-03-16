const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bodyparser = require("body-parser")
router.use(bodyparser.urlencoded({
    extended: true
}))
const bcrypt = require("bcrypt")
const saltRounds = 10
let session

// Checken of gegevens uit de database kloppen om in te loggen
router.post('/inloggen', async (req, res) => {
    try {
        const checkuser = await User.findOne({
            username: req.body.username
        });
        if (checkuser) {
            const vergelijkwachtwoord = await bcrypt.compare(req.body.password, checkuser.password);
            if (vergelijkwachtwoord) {
                console.log("Inloggen voltooid!")
                session = req.session
                session.username = req.body.username
                res.redirect("/profielpagina")
            } else {
                console.error("Foute gebruikersnaam of wachtwoord")
                res.redirect("/")
            }
        } else {
            console.error("Foute gebruikersnaam of wachtwoord")
            res.redirect("/")
        }
    } catch (error) {
        console.error(error);
        res.redirect("/")
    }
})

// Maakt een account aan die opslaat in de database
router.post('/registreren', async (req, res) => {
    console.log('De gegevens zijn succesvol opgehaald')
    const wachtwoord = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = new User({
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


// Zorgt ervoor dat de session van een User stopt
router.post('/uitloggen', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Deze verwijdert het account uit de database
router.post('/verwijdergebruiker', (req, res) => {
    session = req.session
    console.log(session.username)
    User.find({ username: session.username }).remove().exec();
    res.redirect('/');
});


// Update de data uit de database van een gebruiker
router.post('/bijwerken', (req, res) => {
    session = req.session;
    User.updateOne({
        username: session.username
    }, {
        username: req.body.username,
        email: req.body.email
    }).exec();
    session.username = req.body.username;
    res.redirect('/profielpagina');
})

module.exports = router