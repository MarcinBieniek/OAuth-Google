const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

// Google API authorization
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
passport.use(new GoogleStrategy({
  clientID: "515479252272-96th68jc6rn8lh5na1lmp9cjduskq7t3.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
