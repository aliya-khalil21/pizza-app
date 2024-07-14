require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Connection failed...', err);
  });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database connected...');
});



// Configure sessions
app.use(session({
  secret: process.env.Cookie_Secret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: url, collectionName: 'sessions' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
 // Passport config
const passportInit = require('../app/config/passport');
passportInit(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Flash middleware
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const expressLayout = require('express-ejs-layouts');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.use(expressLayout);
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');

// Global middleware

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Routes
const initRoutes = require('./web'); // Adjust the path according to your project structure

// Initialize routes
initRoutes(app);

const PORT1 = process.env.PORT || 3000;
app.listen(PORT1, () => {
    console.log(`Server is running on port ${PORT1}`);
});
