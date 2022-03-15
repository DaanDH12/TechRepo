const express = require('express')
const { engine } = require('express-handlebars');
const app = express();
const connectDB = require("./config/db")
const path = require('path');
const port = process.env.PORT || 1337
const session = require("express-session")
const router = require("./routes/router")
const user = require("./routes/user")
require('dotenv') .config();



connectDB();


// Naam gelijk zetten van public naar static
app.use('/static', express.static(path.join(__dirname, 'public')));

// Hier wordt aangegeven dat ik sessions kan gebruiken
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}))

// Geeft aan dat ik Handlebars kan gebruiken en lezen
app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}));

app.set('view engine', '.hbs');
app.set("views", "./views");

app.use("/",router)
app.use("/",user)

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port);