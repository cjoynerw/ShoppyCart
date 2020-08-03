const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Database
const db = require('../models');

// GET Register New
router.get('/register', (req, res) => {
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
    const user = await db.User.findOne({username: req.body.username});

    // Check If We Got A User Object Back From The Database
    if (user) {
      return res.send('<h1>Account already exists, please login</h1>');
    }

    // Hash Password
    // Generate salt (adds complication to our password hash)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
    }

    // Creating the new user
    await db.User.create(userData);

    // Redirect to the login page
    res.redirect('/auth/login');
  } catch (err) {
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
    const user = await db.User.findOne({username: req.body.username});
    if (!user) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Invalid Credentials',
      });
    }

// Check passwords
const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
    if (passwordsMatch === false) {
      return res.render('auth/login', {
        title: 'Login',
        error: 'Invalid Credentials',
      });
    }

// Create Session
req.session.currentUser = user._id;
    console.log(req.session);
    res.redirect('/');
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