const express = require('express');
const router = express.Router();

// Database
const db = require('../models');


// GET Items Index
router.get('/', async (req, res) => {
  try {
    const allItems = await db.items.find();
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
    // First Find the article to be edited
    const foundItem = await db.items.findById(req.params.id);

    // Next find all authors
    const allLists = await db.lists.find();

    // Send foundItem and allAuthors to template
    res.render('items/edit', {
      title: 'Edit List',
      item: foundItem,
      list: allLists,
    });
  } catch (err) {
    res.send(err);
  }
});

// PUT Articles Update
router.put('/:id/', async (req, res) => {
  try {
    // We requesting the un-modified record back after the update so we can check the author below
    const articleToUpdate = await db.Article.findByIdAndUpdate(req.params.id, req.body, {new: false});

    if (articleToUpdate.author.toString() === req.body.author) {
      // We will only enter this block if the Article Author is the same
      // If that's true, we are done and can redirect the user

      // Redirect to article show page
      return res.redirect(`/articles/${req.params.id}`);
    }

    // We execute code below this point if the author has been updated
    // Find previous author
    const previousAuthor = await db.Author.findById(articleToUpdate.author);

    // Remove article from previous author
    await previousAuthor.articles.remove(req.params.id);

    // Save modified previous author
    await previousAuthor.save();

    // Find New Author
    const newAuthor = await db.Author.findById(req.body.author);

    // Associate New Author
    newAuthor.articles.push(articleToUpdate);

    // Save New Author
    await newAuthor.save();

    // Redirect to article show page
    res.redirect(`/articles/${articleToUpdate._id}`);
  } catch (err) {
    res.send(err);
  }
});

// DELETE Articles Destroy
router.delete('/:id', async (req, res) => {
  try {
    // Delete Article from Articles Collection
    const deletedArticle = await db.Article.findByIdAndDelete(req.params.id);

    // Find Article Author
    const foundAuthor = await db.Author.findById(deletedArticle.author);

    // Delete Article from Author Articles
    foundAuthor.articles.remove(req.params.id);

    // Save Modified Author
    await foundAuthor.save();

    // Redirect to Articles Index
    res.redirect('/articles');
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
