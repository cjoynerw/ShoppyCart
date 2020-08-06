const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items');
const listsController = require('../controllers/lists');
const authController = require('../controllers/authController');

// Lists Routes
router.use('/lists', listsController);

// Items Routes
router.use('/items', itemsController);

// Auth Routes
router.use('/auth', authController);


// Home Page Route
router.get('/', (req, res) => {
    res.render('home')
})

// Grocery Stores Route
router.get('/stores', (req, res) => {
    res.render('stores/show.ejs')
})

//
router.get("/stores/:id", (req, res) => {
    res.render("items/new.ejs", {storeID: req.params.id})
})

// Edit Route
router.get('/items', itemsController);

// Delete Route
router.get('/items', itemsController);


module.exports = router