const express = require('express');
const router = express.Router();

// Database
const Item = require('../models/items');


// GET Items Index
router.get('/', async (req, res) => {
  try {
    const allItems = await Item.find();
    res.render('items/index', {
      items: allItems,
      title: 'Your Items'
    });
  } catch (err) {
    res.send(err);
  }
});

// GET Items New
router.get('/new', async (req, res) => {
  try {
    const allLists = await db.lists.find();
    
    res.render('items/new', {
      title: 'New Item',
      list: allLists,
    });
  } catch (err) {
    res.send(err);
  }
});

// POST Items Create
router.post('/', async (req, res) => {
  console.log(req.body);

  try {
    // Create the item in the items collection
    const newItem = await db.items.create(req.body);

    // Find item list for association
    const foundList = await db.lists.findById(req.body.list);

    // Associate the List and Item
    foundList.items.push(newItem);

    // Save modified lists
    await foundList.save();

    // Redirect to Item show page
    res.redirect(`/items/${newAItems._id}`);
  } catch (err) {
    res.send(err);
  }
});

// GET items Show
router.get('/:id', async (req, res) => {
  try {
    const foundItem = await db.items.findById(req.params.id).populate('list');
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
  // WE NOW MUST SEND ALL Lists TO THE Item EDIT PAGE
  try {
    // First Find the items to be edited
    const foundItem = await db.items.findById(req.params.id);

    // Next find all lists
    const allLists = await db.lists.find();

    // Send foundItem and allLists to template
    res.render('items/edit', {
      title: 'Edit List',
      item: foundItem,
      list: allLists,
    });
  } catch (err) {
    res.send(err);
  }
});

// PUT Items Update
router.put('/:id/', async (req, res) => {
  try {
    const itemsToUpdate = await db.items.findByIdAndUpdate(req.params.id, req.body, {new: false});
    if (itemsToUpdate.lists.toString() === req.body.lists) {
      return res.redirect(`/articles/${req.params.id}`);
    }
    const previousLists = await db.lists.findById(itemsToUpdate.author);

    // Remove items from previous lists
    await previousLists.items.remove(req.params.id);

    // Save modified previous lists
    await previousLists.save();

    // Find New Lists
    const newLists = await db.Author.findById(req.body.author);

    // Associate New Lists
    newLists.items.push(itemsToUpdate);

    // Save New Lists
    await newLists.save();

    // Redirect to item show page
    res.redirect(`/items/${itemsToUpdate._id}`);
  } catch (err) {
    res.send(err);
  }
});

// DELETE Items
router.delete('/:id', async (req, res) => {
  try {
    // Delete Items from Items 
    const deletedItems = await db.items.findByIdAndDelete(req.params.id);

    // Find Items Lists
    const foundLists = await db.lists.findById(deletedItems.lists);

    // Delete Items from Lists Items
    foundLists.items.remove(req.params.id);

    // Save Modified Lists
    await foundLists.save();

    // Redirect to Items Index
    res.redirect('/items');
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
