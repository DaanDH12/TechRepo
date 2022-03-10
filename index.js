const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const connectDB = require("./config/db")
const path = require('path');
const port = process.env.PORT || 1337
const User = require("./models/User")
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

// bodyparser codes 

app.post ('/inloggen', (req, res) => {
  res.send('Gebruikersnaam: ' + req.body.username + '<br>Wachtwoord: ' + req.body.password)
})

app.post ('/registreren' , async (req, res) => {
  console.log('De gegevens zijn succesvol opgehaald', req.body)
  const newUser = new User (req.body);

  newUser.save((error) => {
    if (error) {
      console.log(error);
      return res.status(500).redirect('/registreren');
    }
    return res.status(200).redirect('/profielaanmaken');
});
});

app.listen(port);