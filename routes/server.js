const express = require('express');
const app = express();
const ejs=require('ejs')
const path = require('path');

const expresslayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.render('home');
});

app.use(expresslayout);
app.set('views', path.join(__dirname, '../resources/views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


// Set up the view engine and views directory



// Define routes

// Start the server

