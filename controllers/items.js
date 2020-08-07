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
    res.render('items/new.ejs', {
      title: 'New Item',
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
    console.log("line 85", foundItem)
    res.render('items/edit', {
    title: 'Edit List',
    item: foundItem,
    });
  } catch (err) {
    res.send(err);
  }
});

// router.get("/:id/edit", async (req, res) => {
//   try {
//     const items = await List.findById()
//     console.log("line 85", items)
//     res.render("items/edit", {itmes: items})
//   } catch {
//     res.redirect("/items")
//   }
// })

// PUT Items Update
router.put('/:id/', async (req, res) => {
  console.log("put router")
  try {
    const itemsToUpdate = await Item.findByIdAndUpdate(req.params.id, req.body, {new: false});
    console.log("line 95", {itemsToUpdate})
    // if (itemsToUpdate.lists.toString() === req.body.lists) {
    //   return res.redirect("/lists");
    // }
    const previousLists = await List.find();
    console.log("line", {previousLists})
    await previousLists[0].items.push(itemsToUpdate);
    await previousLists[0].save();
    console.log("line 104", previousLists)
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
    //console.log("found list", foundList)
    foundList[0].item.remove({_id: req.params.id});
    await foundList[0].save();
    res.redirect('/lists');
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});


module.exports = router;
