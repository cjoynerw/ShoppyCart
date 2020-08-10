const express = require('express');
const router = express.Router();
const List = require('../models/lists');


// GET List Index
router.get('/', async (req, res) => {
  try {
    const myList = await List.find().populate("items")
    res.render('lists/index', {
      list: myList[0],
      title: 'Your Lists'
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;