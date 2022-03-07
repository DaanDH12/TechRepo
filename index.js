const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || PORT

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const path = require('path');
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

app.post ('/inloggen', urlencodedParser, (req, res) => {
  res.send('Gebruikersnaam: ' + req.body.username + '<br>Wachtwoord: ' + req.body.password)
})

app.listen(3000);