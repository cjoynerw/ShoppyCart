const express = require('express');
const router = express.Router();

// Database
const List = require('../models/lists');
const Item = require('../models/items');



// GET List Index
router.get('/', async (req, res) => {
  // Get All Lists from DB
  try {
    const myList = await List.find().populate("items")
    console.log("line 15", myList)
    res.render('lists/index', {
      list: myList[0],
      title: 'Your Lists'
    });
  } catch (err) {
    res.send(err);
  }
});


// // GET Lists New
// router.get('/new', (req, res) => {
//   res.render('lists/new.ejs', {
//     title: 'Add New List',
//   });
// });

//POST Lists Create
// router.post('/', async (req, res) => {
//   try {
//   const newList = await List.create(req.body);
//     await List.create(req.body.id);
//     res.redirect('/lists') ;
//   } catch (err) {
//     res.send(err);
//   }
// });

//GET Lists Show
// router.get('/:id', async (req, res) => {
//   // Find List By ID
//   try {
//     const foundList = await List.findById(req.params.id).populate('items');
//     res.render('lists/show', {
//       title: 'Lists Details',
//       list: foundList,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// });

// // GET Lists Edit
// router.get('/:id/edit', async (req, res) => {
//   // Find List By ID
//   try {
//     const foundList = await List.findById(req.params.id);
//     res.render('lists/edit', {
//       list: foundList,
//       title: `Update ${foundList.name}`,
//     });
//   } catch (err) {
//     res.send(err);
//   }
// });

// PUT Lists Update
// router.put('/:id', async (req, res) => {
//   try {
//     await List.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     res.redirect(`/lists/${req.params.id}`);
//   } catch (err) {
//     res.send(err);
//   }
// });

// // DELETE Lists Destroy
// router.delete('/:id/', async (req, res) => {
//   // Find the List By ID and Remove
//   try {
//     // Delete the list
//     const deletedList = await List.findByIdAndDelete(req.params.id);
//     // Delete all items with associated with the lists
//     const deletedItemResult = await List.deleteMany({list: req.params.id});
//     res.redirect('/lists');
//   } catch (err) {
//     res.send(err);
//   }
// });


module.exports = router;