const express = require('express');
const router = express.Router();
const { create } = require("../models/items")


// Database
const Item = require('../models/items');
const List = require('../models/lists');


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

// router.get('/', (req, res) => {
//   Item.find({}, (err, foundItem) => {
//       res.render('items/index.ejs', {
//           items: foundItem
//       })
//   })
// })

// GET Items New
router.get('/new', async (req, res) => {
  try {
    const myList = await List.find();
    res.render('items/new', {
      title: 'New Item',
      list: myList,
    });
  } catch (err) {
    res.send(err);
  }
});

// router.get('/new', (req, res) => {
//   // find all authors
//   List.find({}, (err, foundList) => {
//       // provide the foundAuthors to the view
//       res.render('items/new.ejs', {
//           lists: foundList
//       })
//   })
// })

// POST Items Create
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    // Create the item in the items collection
    const newItem = await Item.create(req.body);
    // Find item list for association
    const foundList = await List.find();
    // Associate the List and Item
    foundList.items.push(newItem);
    // Save modified lists
    await foundList.save();
    // Redirect to Item show page
    res.redirect("/lists");
  } catch (err) {
    res.send(err);
  }
});

// router.post('/', (req, res) => {
//   Item.create(req.body, (err, createdItem) => {
//       if (err) {
//           console.log("error", err)
//       } else {
//           List.findById(req.body.ListId, (err, foundList) => {
//               foundList.items.push(createdItem)
//               foundList.save((err, savedList) => {
//                   res.redirect('/lists')
//               })
//           })
//       }
//   })
// })



// GET items Show
router.get('/:id', async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id);
    res.render('items/show.ejs', {
      title: 'Item Details',
      items: foundItem,
    });
  } catch (err) {
    res.send(err);
  }
});

// router.get('/:id', (req, res) => {
//   List.findOne({ 'items': req.params.id })
//       .populate({
//           path: 'items',
//           match: { _id: req.params.id }
//       }).exec((err, foundList) => {
//           if (err) console.log(err)
//           res.render('items/show.ejs', {
//               list: foundList,
//               item: foundList.items[0]
//           })
//       })
// })



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
