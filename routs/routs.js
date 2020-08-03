const express = require('express')
const router = express.Router()
const itemsController = require('./controllers/items');
const listsController = require('./controllers/lists');
// const authController = require('./controllers/authController');

// Lists Routes
app.use('/lists', listsController);

// Items Routes
app.use('/items', itemsController);

// Auth Routes

app.use('/auth', authController);

// ------------------------ API ROUTES


// Home Page Route
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Grocery Stores Route
app.get('/', (req, res) => {
    res.render(stores)
})

module.exports = router