const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Database
const User = require('../models/auth')
const List = require("../models/lists")

// GET Register New
router.get('/', (req, res) => {
  res.render('auth/register', {
    title: 'Register',
  });
});

// POST Register Create (User)
router.post('/register', async (req, res) => {
  // Validating
  console.log('New User Obj = ', req.body);
  try {
    // Create A New User
    // Redirect To The Login page
    const user = await User.findOne({email: req.body.email});
    console.log("line 24", user)
    // Check If We Got A User Object Back From The Database
    if (user) {
      return res.send('<h1>Account already exists, please login</h1>');
    }

    // Hash Password
    // Generate salt (adds complication to our password hash)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.pwd, salt);
    const newList = await List.create()
    const userData = {
      userlist: newList,
      email: req.body.email,
      password: hash,
    }

    // Creating the new user
    let newUser = await User.create(userData);
    console.log(newUser, newList)
    // Redirect to the lists
    res.redirect('/lists');
  } catch (err) {
    console.log(err)
    res.send(err);
  }
});

// GET Login New
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

// POST Login Create (Session)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log("line 63", user)
    if (!user) {
      return res.render('home', {
        title: 'Login',
        error: 'Invalid Credentials',
      });
    }
    const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
    if (passwordsMatch === false) {
      return res.render('home', {
        title: 'Login',
        error: 'Invalid Credentials',
      });
    }

    
    req.session.currentUser = user._id;
    console.log("line 82", req.session);
    res.redirect('/lists');
  } catch (err) {
    res.send(err);
  }
  
});

// GET Logout Destroy (Session)
router.get('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;