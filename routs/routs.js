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
// app.use('/auth', authController);


// ------------------------ API ROUTES


// Home Page Route
app.get('/', (request, response) => {
    response.send(home)
})

// Grocery Stores Route
app.get('/', (request, response) => {
    response.send(stores)
})

module.exports = router