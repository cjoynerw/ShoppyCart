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
    const allLists = await List.find();
    
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
    const newItem = await Item.create(req.body);

    // Find item list for association
    const foundList = await List.findById(req.body.list);

    // Associate the List and Item
    foundList.items.push(newItem);

    // Save modified lists
    await foundList.save();

    // Redirect to Item show page
    res.redirect(`/items/${newItems._id}`);
  } catch (err) {
    res.send(err);
  }
});

// GET items Show
router.get('/:id', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id).populate('list');
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
    const foundItem = await Item.findById(req.params.id);

    // Next find all lists
    const allLists = await List.find();

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
    const itemsToUpdate = await Item.findByIdAndUpdate(req.params.id, req.body, {new: false});
    if (itemsToUpdate.lists.toString() === req.body.lists) {
      return res.redirect(`/items/${req.params.id}`);
    }
    const previousLists = await List.findById(itemsToUpdate.lists);

    // Remove items from previous lists
    await previousLists.items.remove(req.params.id);

    // Save modified previous lists
    await previousLists.save();

    // Find New Lists
    const newLists = await List.findById(req.body.lists);

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
    const deletedItems = await Item.findByIdAndDelete(req.params.id);

    // Find Items Lists
    const foundLists = await List.findById(deletedItems.lists);

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
