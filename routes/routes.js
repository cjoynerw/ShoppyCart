const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items');
const listsController = require('../controllers/lists');
// const authController = require('./controllers/authController');

// Lists Routes
router.use('/lists', listsController);

// // Items Routes
router.use('/items', itemsController);

// // Auth Routes

// app.use('/auth', authController);

// ------------------------ API ROUTES


// Home Page Route
router.get('/', (req, res) => {
    res.render('home')
})

// Grocery Stores Route
router.get('/', (req, res) => {
    res.render('stores')
})

module.exports = router