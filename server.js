const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

// Google API authorization
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

passport.use(new GoogleStrategy({
  clientID: "515479252272-96th68jc6rn8lh5na1lmp9cjduskq7t3.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

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
