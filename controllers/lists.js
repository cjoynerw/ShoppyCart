const express = require('express');
const router = express.Router();

// Database
const List = require('../models/lists');


// GET List Index
router.get('/', async (req, res) => {
  // Get All Lists from DB
  console.log("i work")
  try {
    const allLists = await List.find();
    res.render('lists/index', {
      list: allLists,
      title: 'Your Lists',
    });
  } catch (err) {
    console.log('i work too')
    res.send(err);
  }
});

// GET Lists New
router.get('/new', (req, res) => {
  res.render('lists/new', {
    title: 'Add New List',
  });
});

// POST Lists Create
router.post('/', async (req, res) => {
  try {
    // const newAList = await db.List.create(req.body);
    await db.lists.create(req.body);
    res.redirect('/lists');
  } catch (err) {
    res.send(err);
  }
});

// GET Lists Show
router.get('/:id', async (req, res) => {
  // Find List By ID
  try {
    const foundList = await db.lists.findById(req.params.id).populate('items');
    res.render('lists/show', {
      title: 'Lists Details',
      list: foundList,
    });
  } catch (err) {
    res.send(err);
  }
});

// GET Lists Edit
router.get('/:id/edit', async (req, res) => {
  // Find List By ID
  try {
    const foundList = await db.lists.findById(req.params.id);
    res.render('lists/edit', {
      list: foundList,
      title: `Update ${foundList.name}`,
    });
  } catch (err) {
    res.send(err);
  }
});

// PUT Lists Update
router.put('/:id', async (req, res) => {
  try {
    await db.lists.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect(`/lists/${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
});

// DELETE Lists Destroy
router.delete('/:id/', async (req, res) => {
  // Find the List By ID and Remove
  try {
    // Delete the list
    const deletedList = await db.lists.findByIdAndDelete(req.params.id);
    // Delete all items with associated with the lists
    const deletedItemResult = await db.lists.deleteMany({list: req.params.id});
    res.redirect('/lists');
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;