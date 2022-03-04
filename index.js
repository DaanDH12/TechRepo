const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you succesfully logged in:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

app.listen(3000);