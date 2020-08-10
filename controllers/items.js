const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const List = require('../models/lists');


// GET Items Index
router.get('/', async (req, res) => {
  try {
    const allItems = await Item.find();
    res.render('items/index.ejs', {
      items: allItems[0],
      title: 'Your Items'
    });
  } catch (err) {
    res.send(err);
  }
});


// GET Items New
router.get('/new', async (req, res) => {
  try {
    res.render('items/new.ejs', {
      title: 'New Item',
    });
  } catch (err) {
    res.send(err);
  }
});


// POST Items Create
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    const foundList = await List.find();
    foundList[0].items.push(newItem);
    await foundList[0].save();
    res.redirect("/lists");
  } catch (err) {
    res.send(err);
  }
});

// GET items Show
router.get('/:id', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id).populate("lists");
    res.render('items/show', {
      title: 'Item Details',
      items: foundItem,
    });
  } catch (err) {
    res.send(err);
  }
});

// GET items Edit
router.get('/:id/edit', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id)
    res.render('items/edit', {
    title: 'Edit List',
    item: foundItem,
    });
  } catch (err) {
    res.send(err);
  }
});


// PUT Items Update
router.put('/:id/', async (req, res) => {
  try {
    const itemsToUpdate = await Item.findByIdAndUpdate(req.params.id, req.body, {new: false});
    const previousLists = await List.find();
    await previousLists[0].save();
    return res.redirect("/lists");
  } catch (err) {
    res.send(err);
  }
});

// DELETE Items
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    const foundList = await List.find();
    foundList[0].items.remove({_id: req.params.id});
    await foundList[0].save();
    res.redirect('/lists');
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
