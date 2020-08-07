const express = require('express');
const router = express.Router();



// Database
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
   // const myList = await List.find();
    res.render('items/new.ejs', {
      title: 'New Item',
    //  list: myList,
    });
  } catch (err) {
    res.send(err);
  }
});


// POST Items Create
router.post('/', async (req, res) => {
  console.log(req.body);
  console.log("Hi, Im in here")
  try {
    const newItem = await Item.create(req.body);
    const foundList = await List.find();
    foundList[0].items.push(newItem);
    await foundList[0].save();
    console.log("line 51")
    console.log(foundList)
    res.redirect("/items");
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
    const foundItem = await Item.find()
    res.render('items/edit', {
      title: 'Edit List',
      item: foundItem,
    });
  } catch (err) {
    res.send(err);
  }
});

// router.get("/items/edit/:id", function(req, res) {
//   Item.findById(req.params.id, function(err, items) {
//     res.render("items", {
//       items:items
//     })
//   })
// })

// PUT Items Update
router.put('/:id/', async (req, res) => {
  try {
    const itemsToUpdate = await Item.findByIdAndUpdate(req.params.id, req.body, {new: false});
    if (itemsToUpdate.lists.toString() === req.body.lists) {
      return res.redirect("/items/");
    }
    const previousLists = await List.findById(itemsToUpdate.lists);
    await previousLists.items.remove(req.params.id);
    await previousLists.save();
    const newLists = await List.findById(req.body.lists);
    newLists[0].items.push(itemsToUpdate);
    await newLists[0].save();
    res.redirect("lists");
  } catch (err) {
    res.send(err);
  }
});

// DELETE Items
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    const foundList = await List.find();
    console.log("found list", foundList)
    foundList[0].items.pull({_id: req.params.id});
    await foundList[0].save();
    res.redirect('/lists');
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});


module.exports = router;
