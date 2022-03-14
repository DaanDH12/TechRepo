const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const connectDB = require("./config/db")
const path = require('path');
const port = process.env.PORT || 1337
const User = require("./models/User")
const bcrypt = require("bcrypt")
const saltRounds = 10
require('dotenv') .config();

connectDB();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));

app.set('view engine', '.hbs');
app.set("views", "./views");




app.get('/', (req, res) => {
  res.render('index');
});

app.get('/registreren', (req, res) => {
  res.render('registreren');
});

app.get('/profielpagina', (req, res) => {
  res.render('profielpagina');
});


// bodyparser codes 

app.post ('/inloggen', async (req, res) => {
  try {
    const checkuser = await User.findOne({ username: req.body.username });
    if (checkuser) {
      const vergelijkwachtwoord = await bcrypt.compare(req.body.password, checkuser.password);
      if (vergelijkwachtwoord) {
        console.log("Inloggen voltooid!")
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

app.post ('/registreren' , async (req, res) => {
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
    return res.status(200).redirect('/profielaanmaken');
});
});

app.listen(port);