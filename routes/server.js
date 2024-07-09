const express = require('express');
const app = express();
const ejs=require('ejs')
const path = require('path');

const expresslayout = require('express-ejs-layouts');
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.use(expresslayout);
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/cart', (req, res) => {
    res.render('customers/cart');
});
app.get('/login', (req, res) => {
    res.render('auth/login');
});

app.get('/register', (req, res) => {
    res.render('auth/register');
});





// Set up the view engine and views directory



// Define routes

// Start the server

