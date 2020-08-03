const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items');
const listsController = require('../controllers/lists');
// const authController = require('./controllers/authController');

// Lists Routes
router.use('/lists', listsController);

// // Items Routes
router.use('/items', itemsController);

// Auth Routes

// router.use('/auth', authController);



// Home Page Route
router.get('/', (req, res) => {
    res.render('home.ejs')
})

// Grocery Stores Route
router.get('/stores', (req, res) => {
    res.render('./views/index.ejs')
})

module.exports = router