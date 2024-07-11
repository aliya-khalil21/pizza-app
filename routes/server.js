//require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');

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

// Configure session store
const mongoStore = new MongoStore({
  mongoUrl: url,
  collectionName: 'sessions'
});
console.log('Cookie_Secret from env:', process.env.Cookie_Secret);

// Configure sessions
app.use(session({
  
  secret: process.env.Cookie_Secret,

  resave: false,
  saveUninitialized: false,
  store: mongoStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
 
}));

app.use(flash());
app.use(express.json())

const expresslayout = require('express-ejs-layouts');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.use(expresslayout);
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//global middleware
app.use((req,res,next)=>{
  res.locals.session=req.session
  next()
})
require('./web')(app);
